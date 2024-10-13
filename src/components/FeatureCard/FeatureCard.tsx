import React, { ReactNode } from 'react';
import { IFeatureCard } from './FeatureCard.types';

export function FeatureCard({
  title,
  description,
  icon,
}: IFeatureCard): ReactNode {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
