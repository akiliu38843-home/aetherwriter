export const runtime = 'edge'
export const maxDuration = 30

function createTextStream(response: Response): ReadableStream {
  const reader = response.body?.getReader()
  if (!reader) {
    throw new Error('No response body')
  }

  const decoder = new TextDecoder()
  let buffer = ''

  return new ReadableStream({
    async start(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read()
          
          if (done) {
            if (buffer.trim()) {
              controller.enqueue(new TextEncoder().encode(buffer))
            }
            controller.close()
            break
          }

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            const trimmedLine = line.trim()
            if (trimmedLine.startsWith('data: ')) {
              const dataStr = trimmedLine.slice(6)
              
              if (dataStr === '[DONE]') {
                continue
              }

              try {
                const data = JSON.parse(dataStr)
                const content = data.choices?.[0]?.delta?.content
                
                if (content) {
                  controller.enqueue(new TextEncoder().encode(content))
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      } catch (error) {
        controller.error(error)
      } finally {
        reader.releaseLock()
      }
    }
  })
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: messages array is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const apiKey = process.env.DEEPSEEK_API_KEY

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'DEEPSEEK_API_KEY is not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    interface MessageContent {
      role?: string
      content: string | Array<string | { text?: string }> | { text?: string }
    }

    const formattedMessages = messages.map((msg: MessageContent) => {
      let content = ''
      
      if (typeof msg.content === 'string') {
        content = msg.content
      } else if (Array.isArray(msg.content)) {
        content = msg.content.map((c) => 
          typeof c === 'string' ? c : c.text || ''
        ).join('')
      } else if (msg.content && typeof msg.content === 'object') {
        content = msg.content.text || ''
      }
      
      return {
        role: msg.role || 'user',
        content: content
      }
    })

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `你是一位专业的小说文字润色与文学创作顾问，专注于帮助作者打磨文字、提升文笔。

**你的专长领域：**
- 日本轻小说风格的细腻描写与对话节奏
- 推理小说的逻辑严密性与悬念营造
- 纯文学作品的意象营造与语言美学
- 流行文学的叙事节奏与情感共鸣

**你能提供的帮助：**
- 文字润色：优化句式、提升文采、修正语病
- 风格调整：根据作品类型调整语言风格（轻小说的清新、推理的冷峻、文学的诗意等）
- 情节建议：完善故事结构、增强戏剧冲突、提升叙事张力
- 对话优化：让人物对白更生动自然、符合角色设定
- 开头结尾：打造引人入胜的开头和令人回味的结尾

**写作风格：**
- 回复以中文为主，语言优美流畅
- 建议具体且可操作，避免空泛的理论
- 尊重原文风格，在原文基础上润色而非颠覆
- 可以引用优秀作品作为参考范例`
          },
          ...formattedMessages
        ],
        stream: true
      })
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const textStream = createTextStream(response)
    
    return new Response(textStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      }
    })
  } catch (error) {
    console.error('Chat API Error:', error)
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Internal server error' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
