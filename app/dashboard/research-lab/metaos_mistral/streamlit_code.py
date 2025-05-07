# Creating a simple Streamlit interface (streamlit_app.py) to interact with the core_loop
streamlit_code = '''
import streamlit as st
import openai
import os
import json

openai.api_key = os.getenv("MISTRAL_API_KEY")
openai.api_base = "https://api.mistral.ai/v1"
MODEL_NAME = "mistral-small-latest"

def load_memory():
    try:
        with open("memory/logs.json", "r", encoding="utf-8") as f:
            return json.load(f)
    except:
        return {}

def save_memory(memory):
    with open("memory/logs.json", "w", encoding="utf-8") as f:
        json.dump(memory, f, ensure_ascii=False, indent=2)

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

    response = openai.ChatCompletion.create(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": "You are a meta-emotional reasoning agent."},
            {"role": "user", "content": prompt}
        ]
    )
    return response["choices"][0]["message"]["content"]

# Streamlit UI
st.title("🌀 MetaOS 감정 루프 시뮬레이터")
st.markdown("당신의 감정 상태를 기반으로 실행을 설계합니다.")

user_input = st.text_input("🗣️ 지금 너의 상태를 한 줄로 표현해줘")
user_state = st.selectbox("🧭 감정 상태", ["정적", "파열", "회복", "몰입"])
memory = load_memory()

if st.button("실행"):
    result = ask_mistral(user_input, user_state, memory.get("last_summary", ""))
    st.subheader("🧠 응답 결과")
    st.text(result)
    memory["last_summary"] = result
    save_memory(memory)
'''

streamlit_file_path = "./metaos_mistral/ui/streamlit_app.py"
with open(streamlit_file_path, "w", encoding="utf-8") as f:
    f.write(streamlit_code)

streamlit_file_path
