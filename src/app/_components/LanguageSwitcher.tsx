'use client';

import React from 'react';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';

interface LanguageOption {
  code: string;
  label: string;
}

interface LanguageSwitcherProps {
  className?: string;
  buttonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon';
  languages?: LanguageOption[];
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  buttonVariant = 'outline',
  buttonSize = 'default',
  languages = [
    { code: 'en', label: 'English' },
    { code: 'th', label: 'ภาษาไทย' },
  ],
}) => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  const getCurrentLanguageLabel = () => {
    const currentLanguage = languages.find((lang) => lang.code === i18n.language);
    return currentLanguage?.label || languages[0].label;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={buttonVariant}
          size={buttonSize}
          className={`flex items-center gap-2 ${className}`}
        >
          <Languages className="h-4 w-4" />
          {getCurrentLanguageLabel()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`cursor-pointer ${i18n.language === language.code ? 'font-bold' : ''}`}
          >
            {language.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
