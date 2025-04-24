// pages/api/generate-structure.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: '허용되지 않는 메소드입니다.' });
    return;
  }

  if (!req.body.prompt) {
    res.status(400).json({ error: 'prompt가 필요합니다.' });
    return;
  }

  try {
    const mistralRes = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST", 
      headers: {
        "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [
          {
            role: "system",
            content:`너는 사용자가 시작하려는 프로젝트를 분석해서 다음 항목으로 요약해주는 조력자야. 아래 형식을 반드시 지켜야 해.

              형식:
              {
                "core": "이 프로젝트의 핵심 철학 또는 방향성",
                "structure": ["추천할 수 있는 구조 2~3개"],
                "tool": ["사용할 도구, 기술 또는 플랫폼"]
              }

              주의: JSON 외에는 아무 말도. 설명도 하지 마.`
          },
          {
            role: "user", 
            content: req.body.prompt
          }
        ],
        temperature: 0.7
      })
    });

    if (!mistralRes.ok) {
      throw new Error(`Mistral API 오류: ${mistralRes.status}`);
    }

    const result = await mistralRes.json();
    res.status(200).json(result);

  } catch (error) {
    console.error("🔥 API 오류:", error);
    res.status(500).json({ 
      error: "서버 오류가 발생했습니다.",
      details: error instanceof Error ? error.message : "알 수 없는 오류"
    });
  }
}
