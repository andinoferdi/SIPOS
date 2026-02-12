'use client';

import { useState } from 'react';
import {
  BILLING_PERIODS,
  BILLING_PLANS,
} from '@/features/marketing/components/sections/pricing/data';
import { cn } from '@/lib/utils';
import { PricingCard } from '@/features/marketing/components/sections/pricing/card';

type BillingPeriodKey = (typeof BILLING_PERIODS)[number]['key'];

export default function PricingSection() {
  const [activeBillingPeriodKey, setActiveBillingPeriodKey] =
    useState<BillingPeriodKey>('monthly');

  return (
    <section className="py-14 md:py-30 bg-[var(--token-gray-50)] dark:bg-[var(--color-dark-primary)] dark:bg-linear-180 dark:from-[var(--token-white-3)] dark:from-[45.56%] dark:to-[var(--token-white-0)]">
      <div className="wrapper">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="mb-3 font-bold text-center text-[var(--token-gray-800)] text-3xl dark:text-[var(--token-white-90)] md:text-title-lg">
            Start Your Content Creation Journey with AI
          </h2>
          <p className="max-w-xl mx-auto leading-6 text-[var(--token-gray-500)] dark:text-[var(--token-gray-400)]">
            Collaborate with AI to generate content that resonates with your
            audience, drives and delivers meaningful results across all
            platforms.
          </p>
        </div>

        <div>

          <div className="flex justify-center relative z-30 mt-12">
            <div className="relative flex p-1 bg-[var(--token-white)] dark:bg-[var(--color-gray-800)] rounded-full shadow-theme-xs">
              {BILLING_PERIODS.map((period) => (
                <button
                  key={period.key}
                  onClick={() => setActiveBillingPeriodKey(period.key)}
                  className={cn(
                    'relative flex items-center gap-2 px-6 py-2 text-sm font-medium transition-colors duration-200' +
                      ' rounded-full' +
                      ' text-[var(--token-gray-700)] dark:text-[var(--token-gray-400)]',
                    {
                      'bg-[var(--token-gray-800)] dark:bg-[var(--token-white-5)] text-[var(--token-white)] dark:text-[var(--token-white)]':
                        period.key === activeBillingPeriodKey,
                      'pr-2': period.saving,
                    }
                  )}
                >
                  {period.label}

                  {period.saving && (
                    <span className="bg-[var(--token-orange-400)] text-[var(--token-white)] text-xs px-2 py-0.5 rounded-full">
                      Save {period.saving}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 z-30 relative space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-6xl lg:mx-auto lg:grid-cols-3 xl:grid-cols-4">
            {BILLING_PLANS.map((plan, index) => (
              <PricingCard
                key={index}
                plan={plan}
                billingPeriod={activeBillingPeriodKey}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
