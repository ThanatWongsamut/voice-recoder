'use client';

import React from 'react';
import { Languages, Info, ListChecks, Clock, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import InfoCard from './_components/infoCard';
import { useTranslation } from '@/translation';

const HomePage: React.FC = () => {
  const { t, setLanguage } = useTranslation('home');

  const handleStartRecording = () => {
    // Add navigation to record page
    // e.g., router.push('/record')
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Language Switcher */}
        <div className="flex justify-end mb-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Languages className="h-4 w-4" />
                {t.selectLanguage}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('th')}>ภาษาไทย</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold text-gray-900">{t.title}</h1>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Overview Card */}
          <InfoCard
            title={t.overview.title}
            icon={Info}
            points={t.overview.points}
            description={t.overview.description}
            iconClassName="h-5 w-5 text-blue-500"
            pointIconClassName="h-5 w-5 text-green-500 mt-1"
          />

          {/* Process Card */}
          <InfoCard
            title={t.process.title}
            icon={ListChecks}
            points={t.process.points}
            iconClassName="h-5 w-5 text-purple-500"
            pointIconClassName="h-5 w-5 text-purple-500 mt-1"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {/* Requirements Card */}
            <InfoCard
              title={t.requirements.title}
              icon={Clock}
              points={t.requirements.points}
              iconClassName="h-5 w-5 text-orange-500"
              pointIconClassName="h-5 w-5 text-orange-500 mt-1"
            />

            {/* Policy Card */}
            <InfoCard
              title={t.policy.title}
              icon={Lock}
              points={t.policy.points}
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
              {t.startButton}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
