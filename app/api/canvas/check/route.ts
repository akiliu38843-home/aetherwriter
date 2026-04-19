import { generateText } from 'ai'
import { deepseek } from '@ai-sdk/deepseek'
import { LogicIssue, StoryBeatNode } from '@/lib/types'

export const runtime = 'edge'
export const maxDuration = 60

interface RequestBody {
  plotTree: Array<{ id: string; data: { title?: string; content?: string } }>
  lorebookContext?: string
}

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json()

    if (!body.plotTree || !Array.isArray(body.plotTree)) {
      return Response.json(
        { error: 'plotTree (array of nodes) is required' },
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

    const nodesInfo = body.plotTree.map((node) => 
      `节点ID: ${node.id}
       标题: ${node.data?.title || '无标题'}
       内容: ${node.data?.content || '无内容'}
       ---`
    ).join('\n')

    const { text: issuesJson } = await generateText({
      model: deepseek('deepseek-chat'),
      prompt: `你是一个严苛的文学编辑。请审查以下小说大纲，寻找逻辑漏洞：

${nodesInfo}

世界观设定: ${body.lorebookContext || '无'}

请严格审查以下问题：
1. 时间线矛盾（时间跳跃混乱）
2. 因果倒置
3. 人物OOC（与已知性格冲突）
4. 未收回的伏笔
5. 逻辑断裂

直接输出JSON数组格式，无问题返回空数组[]，有问题返回以下格式：
[{"nodeId": "节点ID", "warning": "问题描述", "suggestion": "修复建议"}]`,
    })

    let issues: LogicIssue[] = []
    try {
      issues = JSON.parse(issuesJson)
    } catch {
      console.error('Failed to parse issues:', issuesJson)
      issues = []
    }

    return Response.json({ issues })
  } catch (error) {
    console.error('Logic check error:', error)
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to check logic' },
      { status: 500 }
    )
  }
}
