import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.MISTRAL_API_KEY,
  baseURL: 'https://api.mistral.ai/v1',
});

export async function POST(req: Request) {
  try {
    const { userInput, userState, memorySummary } = await req.json();

    const prompt = `
너는 사용자의 감정 리듬을 인식하여, 다음 실행 행동을 제안하는 존재 기반 에이전트야.

현재 감정 상태: ${userState}
기억 요약: ${memorySummary}
사용자 입력: ${userInput}

당신은 아래와 같은 형식으로 응답해야 해:

1. reflection: (지금 상태에 대한 인식)
2. action_suggestion: (무엇을 하면 좋을지)
3. emotional_tone: (어떤 말투로 말할지)
4. memory_update: (이 기억을 어떻게 남길지)
    `;

    const response = await openai.chat.completions.create({
      model: 'mistral-small-latest',
      messages: [
        { role: 'system', content: 'You are a meta-emotional reasoning agent.' },
        { role: 'user', content: prompt }
      ],
    });

    return NextResponse.json({
      result: response.choices[0].message.content
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 