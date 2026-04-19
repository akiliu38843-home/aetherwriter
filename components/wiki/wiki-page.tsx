"use client"

import { BookOpen, Sparkles, Users, Clock, GitBranch, AlertTriangle, MousePointer, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function WikiPage() {
  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="max-w-4xl mx-auto px-8 py-8 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">AetherWriter 使用指南</h1>
          <p className="text-muted-foreground">
            基于热内特叙事学的专业小说润色工具
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="size-5" />
              编辑器 - 叙事维度微操
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              在编辑器中选中文字后，可使用右侧面板的叙事维度进行精准润色。
            </p>
            <p>
              叙事维度微操基于法国文学理论家<strong>热内特（Gérard Genette）</strong>的叙事学框架。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="size-5" />
              维度一：叙事距离（Distance）
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              叙事距离决定了叙述者与故事之间的距离，影响文本的客观性与情感温度。
            </p>
            
            <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
              <div className="font-medium flex items-center gap-2 mb-1">
                <span className="text-purple-600">++</span> 极远距离
              </div>
              <p className="text-sm mb-2">
                使用概述性动词，拉开叙事距离，营造疏离、冷峻的文本氛围。
              </p>
              <div className="text-xs text-muted-foreground">
                <strong>案例：</strong>
                <em>他拒绝了。她的回答很干脆，没有任何犹豫。</em>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <div className="font-medium flex items-center gap-2 mb-1">
                <span className="text-blue-600">+</span> 较远距离
              </div>
              <p className="text-sm mb-2">
                使用间接引语，保持中立、客观的陈述视角。
              </p>
              <div className="text-xs text-muted-foreground">
                <strong>案例：</strong>
                <em>他说他会去，但语气中透露出几分不情愿。</em>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
              <div className="font-medium flex items-center gap-2 mb-1">
                <span className="text-green-600">-</span> 较近距离
              </div>
              <p className="text-sm mb-2">
                自由间接引语，融合角色内心与叙述者声音，达到深度共情效果。
              </p>
              <div className="text-xs text-muted-foreground">
                <strong>案例：</strong>
                <em>算了，不去就不去吧，反正也没什么意思。</em>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
              <div className="font-medium flex items-center gap-2 mb-1">
                <span className="text-orange-600">--</span> 极近距离
              </div>
              <p className="text-sm mb-2">
                直接引语，呈现最戏剧化、最真实的现场感。
              </p>
              <div className="text-xs text-muted-foreground">
                <strong>案例：</strong>
                <em>"我真的不想去。"她叹了口气，"但是..."</em>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="size-5" />
              维度二：叙事聚焦（Focalization）
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              叙事聚焦决定了叙述的视角，直接影响读者对故事的感知方式。
            </p>
            
            <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
              <div className="font-medium mb-1">
                零聚焦（全知视角）
              </div>
              <p className="text-sm mb-2">
                叙述者拥有全知视角，可以自由跨越时空，揭示多个角色的内心活动。
              </p>
              <div className="text-xs text-muted-foreground">
                <strong>特点：</strong>
                <em>上帝视角，读者了解所有角色的想法和动机</em>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <div className="font-medium mb-1">
                内聚焦
              </div>
              <p className="text-sm mb-2">
                严格限制在单一角色的视线、听觉和主观推理中。
              </p>
              <div className="text-xs text-muted-foreground">
                <strong>特点：</strong>
                <em>深度沉浸感，读者只能通过主角的眼睛看世界</em>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
              <div className="font-medium mb-1">
                外聚焦
              </div>
              <p className="text-sm mb-2">
                仅保留物理动作捕捉和声音记录，移除所有心理描写。
              </p>
              <div className="text-xs text-muted-foreground">
                <strong>特点：</strong>
                <em>冷硬白描风格，增加神秘感和悬念</em>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-5" />
              维度三：叙事时间（Duration）
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              叙事时间控制故事时间与叙述时间的比率，直接影响叙事节奏。
            </p>
            
            <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
              <div className="font-medium flex items-center gap-2 mb-1">
                <span>⏸️</span> 审美停顿
              </div>
              <p className="text-sm mb-2">
                故事时间停滞，插入大量静态感官细节描写。
              </p>
              <div className="text-xs text-muted-foreground">
                <strong>效果：</strong>
                <em>营造氛围，强调关键时刻的细节</em>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <div className="font-medium flex items-center gap-2 mb-1">
                <span>▶️</span> 心理场景
              </div>
              <p className="text-sm mb-2">
                故事时间与叙事时间1:1，实时呈现对话与心理流转。
              </p>
              <div className="text-xs text-muted-foreground">
                <strong>效果：</strong>
                <em>烘托高潮张力，让情节徐徐展开</em>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
              <div className="font-medium flex items-center gap-2 mb-1">
                <span>⏭️</span> 叙事跨越
              </div>
              <p className="text-sm mb-2">
                大刀阔斧剔除过渡性内容，直接切入核心动作与结果。
              </p>
              <div className="text-xs text-muted-foreground">
                <strong>效果：</strong>
                <em>快节奏，强推力，适合推进剧情</em>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-5" />
              组合使用案例
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              不同维度组合可以产生独特的叙事效果。以下是一些经典组合：
            </p>
            
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border">
              <div className="font-medium mb-2">
                🎭 推理小说风格
              </div>
              <div className="text-sm">
                <strong>较近距离</strong> + <strong>外聚焦</strong> + <strong>叙事跨越</strong>
              </div>
              <p className="text-xs text-muted-foreground">
                冷静客观的叙述者视角，快速推进情节，保持悬念。
              </p>
            </div>

            <div className="p-3 rounded-lg bg-gradient-to-r from-pink-50 to-purple-50 border">
              <div className="font-medium mb-2">
                📖 纯文学风格
              </div>
              <div className="text-sm">
                <strong>极近距离</strong> + <strong>内聚焦</strong> + <strong>审美停顿</strong>
              </div>
              <p className="text-xs text-muted-foreground">
                深度沉浸角色内心，细腻描写感官细节，营造诗意氛围。
              </p>
            </div>

            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border">
              <div className="font-medium mb-2">
                💫 轻小说风格
              </div>
              <div className="text-sm">
                <strong>较近距离</strong> + <strong>内聚焦</strong> + <strong>心理场景</strong>
              </div>
              <p className="text-xs text-muted-foreground">
                自然流畅的情感表达，贴近角色的内心独白。
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="size-5" />
              大纲画布 - 智能分支推演与逻辑审查
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              大纲画布用于可视化故事结构，智能分支推演和逻辑审查。
            </p>
            
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <MousePointer className="size-4" />
                节点操作
              </h3>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>拖拽移动节点位置</li>
                <li>点击节点编辑标题和内容</li>
                <li>拖拽节点边缘的紫色连接点创建连线</li>
                <li>紫色箭头表示剧情承接关系</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Sparkles className="size-4" />
                AI 脑暴分支
              </h3>
              <p className="text-sm mb-2">
                点击节点的<strong>AI脑暴</strong>按钮，AI 会基于当前节点生成3个完全不同的分支：
              </p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2 bg-purple-50 rounded border border-purple-200">
                  <div className="font-medium">🎭 常规发展</div>
                  <div className="text-muted-foreground">自然流畅的情节推进</div>
                </div>
                <div className="p-2 bg-red-50 rounded border border-red-200">
                  <div className="font-medium">⚡ 戏剧转折</div>
                  <div className="text-muted-foreground">意外冲突/反转</div>
                </div>
                <div className="p-2 bg-green-50 rounded border border-green-200">
                  <div className="font-medium">💭 人物驱动</div>
                  <div className="text-muted-foreground">角色动机驱动</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="size-4" />
                逻辑体检
              </h3>
              <p className="text-sm mb-2">
                点击右上角<strong>逻辑体检</strong>按钮，AI 会审查大纲中的逻辑漏洞：
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>时间线矛盾（时间跳跃混乱）</li>
                <li>因果倒置</li>
                <li>人物OOC（与性格冲突）</li>
                <li>未收回的伏笔</li>
                <li>重复情节</li>
              </ul>
              <p className="text-sm mt-2">
                有问题的节点会显示<strong className="text-red-600">红色边框</strong>和警示图标。
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <ArrowRight className="size-4" />
                节点连线
              </h3>
              <p className="text-sm mb-2">
                紫色箭头连线表示剧情承接关系：
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>手动拖拽节点边缘的紫色连接点创建连线</li>
                <li>自动生成的分支会创建动画连线</li>
                <li>删除节点时连线自动移除</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>快速开始</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>在<strong>编辑器</strong>中选中文字，使用右侧面板的叙事维度润色</li>
              <li>在<strong>大纲画布</strong>中规划故事结构</li>
              <li>点击节点<strong>AI脑暴</strong>生成分支剧情</li>
              <li>使用<strong>逻辑体检</strong>检查大纲漏洞</li>
              <li>拖拽创建节点<strong>连线</strong>表示剧情关系</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
