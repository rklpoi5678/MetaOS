import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { template } = req.body;

    // 템플릿에 따른 프롬프트 생성
    let prompt = "";
    if (template === "plr") {
      prompt = `PLR 마켓플레이스 프로젝트를 위한 구조를 생성해주세요. 
      핵심 구조, 도구, 그리고 필요한 컴포넌트들을 포함해주세요.`;
    } else if (template === "emotion") {
      prompt = `감정 루프 기반의 프로젝트 구조를 생성해주세요.
      감정 분석, 루프 관리, 그리고 피드백 시스템을 포함해주세요.`;
    } else {
      prompt = `기본 프로젝트 구조를 생성해주세요.
      핵심 기능과 도구들을 포함해주세요.`;
    }

    // OpenAI API 호출
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "당신은 프로젝트 구조 생성 전문가입니다. JSON 형식으로 응답해주세요.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    const response = JSON.parse(completion.choices[0].message.content || "{}");
    
    // 디버깅 로그 추가
    console.log("OpenAI 응답:", response);

    // 응답 형식 검증 및 변환
    const title = response.title || "새 프로젝트";
    const structure = Array.isArray(response.structure)
      ? response.structure.map((node: { type?: string; title?: string; content?: string | null }) => ({
          type: node.type || "folder",
          title: node.title || "새 노드",
          content: node.content || null,
        }))
      : [
          {
            type: "folder",
            title: "00_Core",
            content: null,
          },
          {
            type: "folder",
            title: "01_Structure",
            content: null,
          },
          {
            type: "folder",
            title: "02_Tool",
            content: null,
          },
        ];

    // 디버깅 로그 추가
    console.log("최종 응답:", { title, structure });

    return res.status(200).json({ title, structure });
  } catch (error) {
    console.error("Error generating project structure:", error);
    return res.status(500).json({ error: "Failed to generate project structure" });
  }
} 