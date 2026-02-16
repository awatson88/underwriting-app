"use client";

import React, { useState } from 'react';
import { Shield, TrendingUp, FileText, BarChart3, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PolicyInputForm from '@/components/PolicyInputForm';
import PropertyCard from '@/components/PropertyCard';
import InflationCharts from '@/components/InflationCharts';
import CoverageAnalysisCard from '@/components/CoverageAnalysisCard';
import PersonalizedMessage from '@/components/PersonalizedMessage';
import { PolicyData, HomeDetails, CoverageAnalysis } from '@/lib/types';
import { analyzeCoverage, generatePersonalizedMessage } from '@/lib/coverageAnalysis';

export default function Home() {
  const [step, setStep] = useState<'input' | 'results'>('input');
  const [policy, setPolicy] = useState<PolicyData | null>(null);
  const [home, setHome] = useState<HomeDetails | null>(null);
  const [analysis, setAnalysis] = useState<CoverageAnalysis | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (policyData: PolicyData, homeData: HomeDetails) => {
    setPolicy(policyData);
    setHome(homeData);
    
    const coverageAnalysis = analyzeCoverage(policyData, homeData);
    setAnalysis(coverageAnalysis);
    
    const personalizedMessage = generatePersonalizedMessage(
      policyData.policyholderName,
      policyData,
      coverageAnalysis
    );
    setMessage(personalizedMessage);
    
    setStep('results');
  };

  const handleBack = () => {
    setStep('input');
  };

  const policyYear = policy ? new Date(policy.policyStartDate).getFullYear() : 2019;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CoverageIQ</h1>
                <p className="text-xs text-gray-500">Continuous Underwriting Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Demo Mode</span>
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === 'input' ? (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Is Your Home Properly Protected?
              </h2>
              <p className="text-lg text-gray-600">
                Construction costs have surged since the pandemic. Our AI-powered analysis 
                compares your current coverage against real-time Chicago Metro construction costs 
                to identify potential coverage gaps.
              </p>
            </div>

            {/* Stats Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">+48%</div>
                <div className="text-sm text-gray-600">Avg. Materials Increase</div>
                <div className="text-xs text-gray-400">Since 2019</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">+45%</div>
                <div className="text-sm text-gray-600">Avg. Labor Cost Increase</div>
                <div className="text-xs text-gray-400">Since 2019</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-bold text-red-600 mb-1">60%</div>
                <div className="text-sm text-gray-600">Homes Underinsured</div>
                <div className="text-xs text-gray-400">National Average</div>
              </div>
            </div>

            {/* Policy Input Form */}
            <PolicyInputForm onSubmit={handleSubmit} />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Back Button */}
            <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Policy Input
            </Button>

            {/* Results Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Coverage Analysis
                </TabsTrigger>
                <TabsTrigger value="property" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Property Details
                </TabsTrigger>
                <TabsTrigger value="inflation" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Cost Trends
                </TabsTrigger>
                <TabsTrigger value="message" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Outreach
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                {analysis && (
                  <CoverageAnalysisCard analysis={analysis} policyYear={policyYear} />
                )}
              </TabsContent>

              <TabsContent value="property">
                {policy && home && (
                  <PropertyCard policy={policy} home={home} />
                )}
              </TabsContent>

              <TabsContent value="inflation">
                <InflationCharts policyYear={policyYear} />
              </TabsContent>

              <TabsContent value="message">
                {policy && (
                  <PersonalizedMessage 
                    message={message} 
                    policyholderName={policy.policyholderName} 
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-600">
                CoverageIQ Continuous Underwriting Platform
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Data sources: Bureau of Labor Statistics, Chicago Metro Construction Index
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
