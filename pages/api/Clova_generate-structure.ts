import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { template } = req.body;
    const apiKey = process.env.CLOVA_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'CLOVA API 키가 설정되지 않았습니다.' });
    }

    const response = await fetch("https://clovastudio.stream.ntruss.com/v1/openai", {
      method: "POST",
      headers: {
        "X-NCP-APIGW-API-KEY": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "hypercognition-ko-003",
        messages: [
          { role: "system", content: "너는 프로젝트 구조를 만들어주는 조력자야. 항상 JSON으로 응답해." },
          { role: "user", content: `${template} 마켓플레이스를 만들고 싶어.` }
        ],
        temperature: 0.6,
        topP: 0.9,
        maxTokens: 1024
      })
    });

    const result = await response.json();
    return res.status(200).json(result);
  } catch (error) {
    console.error('API 호출 오류:', error);
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
} 