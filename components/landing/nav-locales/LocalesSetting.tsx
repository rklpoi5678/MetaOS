'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LocalesSetting() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('common');

  const handleLanguageChange = (newLocale: string) => {
    // 현재 경로에서 언어 코드를 제거하고 새로운 언어 코드로 대체
    const newPath = pathname?.replace(`/${locale}`, `/${newLocale}`);
    if (newPath) {
      router.push(newPath);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Globe className="h-4 w-4 text-black" />
          <span className="sr-only">{t('language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleLanguageChange('ko')}
          className={locale === 'ko' ? 'bg-accent' : ''}
        >
          {t('languages.ko')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange('en')}
          className={locale === 'en' ? 'bg-accent' : ''}
        >
          {t('languages.en')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 