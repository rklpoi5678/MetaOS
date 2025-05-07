# Main logic loop for state-action-response

import openai
import os
import json

# Mistral API 설정
client = openai.OpenAI(
    api_key="aCQRZv3eh3dGy1ZtfPgnl0JdY8BKgXhX",
    base_url="https://api.mistral.ai/v1"
)

MODEL_NAME = "mistral-small-latest"

# 기억 불러오기
def load_memory():
    try:
        with open("./metaos_mistral/memory/logs.json", "r", encoding="utf-8") as f:
            return json.load(f)
    except:
        return {}

# 기억 저장하기
def save_memory(memory):
    with open("./metaos_mistral/memory/logs.json", "w", encoding="utf-8") as f:
        json.dump(memory, f, ensure_ascii=False, indent=2)

# 감정 기반 실행 루프
def ask_mistral(user_input, user_state="정적", memory_summary=""):
    prompt = f"""
너는 사용자의 감정 리듬을 인식하여, 다음 실행 행동을 제안하는 존재 기반 에이전트야.

현재 감정 상태: {user_state}
기억 요약: {memory_summary}
사용자 입력: {user_input}

당신은 아래와 같은 형식으로 응답해야 해:

1. reflection: (지금 상태에 대한 인식)
2. action_suggestion: (무엇을 하면 좋을지)
3. emotional_tone: (어떤 말투로 말할지)
4. memory_update: (이 기억을 어떻게 남길지)
    """

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": "You are a meta-emotional reasoning agent."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content

# 테스트 실행
if __name__ == "__main__":
    memory = load_memory()
    user_input = input("지금 너의 상태를 말해줘: ")
    response = ask_mistral(user_input, user_state="파열", memory_summary=memory.get("last_summary", ""))
    print("\n🧠 응답 결과:\n", response)
    memory["last_summary"] = response
    save_memory(memory)
