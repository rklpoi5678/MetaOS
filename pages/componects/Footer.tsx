"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* 상단 섹션 - 네비게이션 */}
        <div className="flex flex-wrap justify-between items-center">
          {/* 회사 로고 */}
          <div>
            <h1 className="text-xl font-bold">MetaOS</h1>
          </div>

          {/* 네비게이션 */}
          <nav className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">
              About
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Blog
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contact
            </a>
          </nav>
        </div>

        {/* 소셜 미디어 아이콘 */}
        <div className="mt-4 flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">🔵 Twitter</a>
          <a href="#" className="text-gray-400 hover:text-white">🔗 LinkedIn</a>
          <a href="#" className="text-gray-400 hover:text-white">📘 Facebook</a>
        </div>

        {/* 저작권 및 추가 링크 */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
          <p>© 2025 MetaOS. All rights reserved.</p>
          <p>
            <a href="#" className="hover:text-white">Privacy Policy</a> |{" "}
            <a href="#" className="hover:text-white">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
