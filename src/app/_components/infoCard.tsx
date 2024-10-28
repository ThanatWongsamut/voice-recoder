import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  title: string;
  icon: LucideIcon;
  points: string[];
  description?: string;
  iconClassName?: string;
  pointIconClassName?: string;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  icon: Icon,
  points,
  description,
  iconClassName = 'h-5 w-5 text-blue-500',
  pointIconClassName = 'h-5 w-5 text-blue-500 mt-1 flex-shrink-0',
  className = '',
}) => (
  <Card className={className}>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Icon className={iconClassName} />
        {title}
      </CardTitle>
      {description && <CardDescription className="text-base">{description}</CardDescription>}
    </CardHeader>
    <CardContent>
      <ul className="space-y-3">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <ArrowRight className={pointIconClassName} />
            <span className="text-gray-700">{point}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default InfoCard;
