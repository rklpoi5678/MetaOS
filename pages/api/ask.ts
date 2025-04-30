import { supabase } from "@/lib/supabaseClient"

// api/ask.ts
export default async function handler(req, res) {
    const { question } = req.body
  
    // 1. 캐시 확인
    const { data , error } = await supabase
    .from("llm_cache")
    .select("answer")
    .eq("question",question)
    .single()

    if (error) {
        console.error('캐시 조회 오류:', error)
        return res.status(500).json({ error: '캐시 조회 오류' })
    }

    if (data?.answer) {
        return res.status(200).json({ source: 'cache', answer: data.answer })
    }
    // 2. Ollama LLM 요청
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      body: JSON.stringify({
        prompt: question,
        model: "mistral"
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  
    const { response: answer } = await response.json()
  
    // 3. 응답 저장
    await supabase.from("llm_cache").insert([{ question, answer }])
  
    // 4. 응답 리턴
    res.status(200).json({ source: 'llm', answer })
  }
  