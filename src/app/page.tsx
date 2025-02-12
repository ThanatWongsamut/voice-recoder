'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { Info, ListChecks, Clock, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InfoCard from './_components/infoCard';
import LanguageSwitcher from './_components/LanguageSwitcher';

const HomePage: React.FC = () => {
  const { t } = useTranslation('translation');
  const router = useRouter();

  const handleStartRecording = () => {
    router.push('/record');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Language Switcher */}
        <div className="flex justify-end mb-8">
          <LanguageSwitcher />
        </div>

        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold text-gray-900">{t('home.title')}</h1>
          <p className="text-xl text-gray-600">{t('home.subtitle')}</p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Overview Card */}
          <InfoCard
            title={t('home.overview.title')}
            icon={Info}
            points={t('home.overview.points', { returnObjects: true })}
            description={t('home.overview.description')}
            iconClassName="h-5 w-5 text-blue-500"
            pointIconClassName="h-5 w-5 text-green-500 mt-1"
          />

          {/* Process Card */}
          <InfoCard
            title={t('home.process.title')}
            icon={ListChecks}
            points={t('home.process.points', { returnObjects: true })}
            iconClassName="h-5 w-5 text-purple-500"
            pointIconClassName="h-5 w-5 text-purple-500 mt-1"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {/* Requirements Card */}
            <InfoCard
              title={t('home.requirements.title')}
              icon={Clock}
              points={t('home.requirements.points', { returnObjects: true })}
              iconClassName="h-5 w-5 text-orange-500"
              pointIconClassName="h-5 w-5 text-orange-500 mt-1"
            />

            {/* Policy Card */}
            <InfoCard
              title={t('home.policy.title')}
              icon={Lock}
              points={t('home.policy.points', { returnObjects: true })}
              iconClassName="h-5 w-5 text-orange-500"
              pointIconClassName="h-5 w-5 text-orange-500 mt-1"
            />
          </div>

          {/* Start Button */}
          <div className="text-center pt-8">
            <Button
              onClick={handleStartRecording}
              className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-lg"
            >
              {t('home.startButton')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
