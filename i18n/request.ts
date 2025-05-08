import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {

  // locale이 없으면 ko로 설정
  const resolvedLocale = locale || 'ko';
  
  return {
    messages: (await import(`../locales/${resolvedLocale}.json`)).default,
    locale: resolvedLocale,
    timeZone: 'Asia/Seoul'
  };
}); 