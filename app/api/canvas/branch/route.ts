import { generateText } from 'ai'
import { deepseek } from '@ai-sdk/deepseek'
import { BranchItem } from '@/lib/types'

export const runtime = 'edge'
export const maxDuration = 30

interface RequestBody {
  currentPath: string
  lorebookContext?: string
}

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json()

    if (!body.currentPath) {
      return Response.json(
        { error: 'currentPath is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.DEEPSEEK_API_KEY
    if (!apiKey) {
      return Response.json(
        { error: 'DEEPSEEK_API_KEY is not configured' },
        { status: 500 }
      )
    }

    const { text: branchesJson } = await generateText({
      model: deepseek('deepseek-chat'),
      prompt: `基于以下剧情路径，生成3个后续分支：

当前剧情：${body.currentPath}

世界观：${body.lorebookContext || '无'}

生成3个完全不同的分支：1个常规发展、1个戏剧转折、1个人物驱动。

直接输出JSON数组格式：
[{"title": "分支标题", "summary": "剧情概要（50字以上）", "type": "分支类型"}]`,
    })

    let branches: BranchItem[] = []
    try {
      branches = JSON.parse(branchesJson)
      if (!Array.isArray(branches)) {
        branches = []
      }
    } catch (error) {
      console.error('Failed to parse branches:', branchesJson)
      branches = []
    }

    return Response.json({ branches })
  } catch (error) {
    console.error('Branch generation error:', error)
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to generate branches' },
      { status: 500 }
    )
  }
}
