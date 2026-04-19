export interface NarrativeDimensions {
  distance: 'extreme-far' | 'far' | 'near' | 'extreme-near'
  focalization: 'zero' | 'internal' | 'external'
  duration: 'pause' | 'scene' | 'ellipsis'
}

export const DISTANCE_LABELS: Record<NarrativeDimensions['distance'], string> = {
  'extreme-far': '极远 (++)',
  'far': '较远 (+)',
  'near': '较近 (-)',
  'extreme-near': '极近 (--)',
}

export const FOCALIZATION_LABELS: Record<NarrativeDimensions['focalization'], string> = {
  'zero': '零聚焦 (全知)',
  'internal': '内聚焦',
  'external': '外聚焦',
}

export const DURATION_LABELS: Record<NarrativeDimensions['duration'], string> = {
  'pause': '审美停顿',
  'scene': '心理场景',
  'ellipsis': '叙事跨越',
}

export const DEFAULT_DIMENSIONS: NarrativeDimensions = {
  distance: 'near',
  focalization: 'internal',
  duration: 'scene',
}

export const DISTANCE_PROMPTS: Record<NarrativeDimensions['distance'], string> = {
  'extreme-far': '采用叙述化言语。使用概述性动词（如：他坦白了、她拒绝了），拉开叙事距离，营造疏离、冷峻的文本氛围。',
  'far': '采用间接引语。使用引导从句（如：他说他会去），保持中立、客观的陈述视角。',
  'near': '采用自由间接引语。移除所有对话归因（如去掉"他说"），将角色的内心语气词与叙述者声音融合，以达到深度共情的效果。',
  'extreme-near': '采用具名引语。严格使用引号包裹原始语态（直接对话），不加任何主观干预，呈现最戏剧化、最真实的现场感。',
}

export const FOCALIZATION_PROMPTS: Record<NarrativeDimensions['focalization'], string> = {
  'zero': '赋予叙述者全知视角。你可以自由跨越时空，点评未来，或在同一场景中揭示多个不同角色的内心活动。',
  'internal': '执行严格的掩码机制（Masking）。彻底屏蔽掉非聚焦角色的心理状态，迫使叙述者只能通过单一聚焦者的视线、听觉和主观推理来感知他者与环境。绝对禁止上帝视角。',
  'external': '模拟客观的电影镜头。移除所有人物的心理描写与情绪总结，仅保留物理动作捕捉和声音记录。采用极简的行为主义白描手法，增加文本的冷硬感。',
}

export const DURATION_PROMPTS: Record<NarrativeDimensions['duration'], string> = {
  'pause': '将故事时间(ST)设为0，叙事时间(NT)设为n。在当前关键物体或场景处强制让情节推进停滞，插入大量极具质感的静态感官细节描写。',
  'scene': '保持叙事时间(NT)与故事时间(ST)为1:1。将对话的交锋与角色心理的流转进行等比例的实时呈现，用于烘托情节高潮的张力。',
  'ellipsis': '将叙事时间(NT)设为0，故事时间(ST)设为n。大刀阔斧地剔除生活琐碎与过渡性动作，直接切入核心动作与结果，制造强烈的叙事推力与节奏感。',
}

export function buildNarrativeSystemPrompt(dimensions: NarrativeDimensions): string {
  const distancePrompt = DISTANCE_PROMPTS[dimensions.distance]
  const focalizationPrompt = FOCALIZATION_PROMPTS[dimensions.focalization]
  const durationPrompt = DURATION_PROMPTS[dimensions.duration]

  return `你是一位精通热内特（Gérard Genette）叙事学理论的顶级文学大师。请严格按照以下三个维度的特定约束，对用户提供的文本进行重写，彻底消除机器翻译腔，达到纯文学出版标准。

【维度一：叙事距离约束 (Distance)】
${distancePrompt}

【维度二：叙事聚焦约束 (Focalization)】
${focalizationPrompt}

【维度三：叙事时间约束 (Duration)】
${durationPrompt}

请直接输出重写后的文本，不要添加任何解释说明。`
}

export function buildUserPrompt(selectedText: string, dimensions: NarrativeDimensions): string {
  const distanceLabel = DISTANCE_LABELS[dimensions.distance]
  const focalizationLabel = FOCALIZATION_LABELS[dimensions.focalization]
  const durationLabel = DURATION_LABELS[dimensions.duration]

  return `请将以下文本按照叙事距离【${distanceLabel}】、叙事聚焦【${focalizationLabel}】、叙事时间【${durationLabel}】的约束进行重写：

${selectedText}`
}
