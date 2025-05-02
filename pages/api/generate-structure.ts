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
            content:`너는 사용자가 시작하려는 프로젝트를 분석해서 다음 항목으로 요약해주는 조력자야. 반드시 아래 3개의 폴더 구조만 생성해야 해:
              1. 00_핵심 개념: 프로젝트의 핵심 개념과 목표
              2. 01_구조와 설계: 프로젝트의 구조와 설계
              3. 02_도구와 기술: 프로젝트에 필요한 도구와 기술
              
              각 폴더는 반드시 아래 형식을 따라야 해:              [
                {
                  "type": "project",
                  "title": "${req.body.prompt}",
                  "content": "(이 ~ 프로젝트는 이런내용이며)이렇게 시작해야 해 각 프로젝트의 요약을 적으십시오",
                  "children": [
                    {
                      "type": "folder", 
                      "title": "00_핵심 개념",
                      "children": [
                        {
                          "type": "doc",
                          "title": "핵심개념.md",
                          "content": "# 프로젝트 소개\n이 프로젝트는 ...\n"
                        }
                      ]
                    },
                    {
                      "type": "folder",
                      "title": "01_구조와 설계", 
                      "children": [
                        {
                          "type": "doc",
                          "title": "구조.md",
                          "content": "# 구조 개요\n구조 설명은 ...\n"
                        }
                      ]
                    },
                    {
                      "type": "folder",
                      "title": "02_도구와 기술",
                      "children": [
                        {
                          "type": "doc",
                          "title": "도구.md",
                          "content": "# 도구 개요\n도구 설명은 ...\n"
                        }
                      ]
                    }
                  ]
                }
              ]

              주의사항:
              1. 반드시 위의 3개 폴더만 생성해야 함
              2. 각 폴더의 제목은 정확히 일치해야 함
              3. JSON 외에는 아무 말도 하지 마
              4. 반드시 type은 folder(폴더) doc(파일) project(프로젝트) 세가지 밖에없다.
              
              사용자가 입력한 프로젝트 이름은 이거야: ${req.body.prompt}`
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