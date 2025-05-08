import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
   // 지원하는 언어 목록
  locales: ['en', 'ko'],
  defaultLocale: 'ko',
  // URL에 항상 언어 코드를 포함
  localePrefix: 'always',
  localeDetection: true,
});

export const config = {
  //모든 경로에 대해 미들웨어 적용 (api, _next, 정적 파일 제외)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};