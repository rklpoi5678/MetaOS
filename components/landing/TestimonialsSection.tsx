'use client';

import { motion } from 'framer-motion';

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            사용자 후기
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            MetaOS를 사용하는 팀들의 이야기를 들어보세요.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "김철수",
              role: "프로젝트 매니저",
              company: "TechCorp",
              content: "MetaOS로 프로젝트 관리가 훨씬 효율적이 되었습니다. AI의 도움으로 시간을 많이 절약할 수 있었습니다.",
              image: "👨‍💼"
            },
            {
              name: "이영희",
              role: "개발자",
              company: "DevTeam",
              content: "자동화된 워크플로우가 정말 큰 도움이 됩니다. 반복적인 작업이 크게 줄었습니다.",
              image: "👩‍💻"
            },
            {
              name: "(주)구구 컴퍼니",
              role: "IT 서비스",
              company: "구구",
              content: "MetaOS 도입 후 업무 처리 시간이 60% 단축되었습니다. AI가 프로젝트 구조를 자동으로 설계해주니 정말 편리합니다.",
              image: "🖥️"
            },
            {
              name: "디자인웨이브로",
              role: "제조업",
              company: "디자인웨이브로",
              content: "AI 기반 자동화로 인적 오류가 90% 감소했습니다. 특히 실시간 분석 기능이 프로젝트 관리에 큰 도움이 됩니다.",
              image: "🔭"
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">{testimonial.image}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
              <p className="text-gray-600">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 

