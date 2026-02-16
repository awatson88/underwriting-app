"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  CheckCircle, 
  DollarSign, 
  TrendingUp,
  ShieldAlert,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { CoverageAnalysis } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface CoverageAnalysisCardProps {
  analysis: CoverageAnalysis;
  policyYear: number;
}

export default function CoverageAnalysisCard({ analysis, policyYear }: CoverageAnalysisCardProps) {
  const coverageRatio = (analysis.originalCoverage / analysis.rebuildCostCurrent) * 100;
  
  return (
    <div className="space-y-6">
      {/* Main Status Card */}
      <Card className={analysis.isUnderinsured 
        ? "border-2 border-red-300 bg-gradient-to-br from-red-50 to-orange-50" 
        : "border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50"
      }>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {analysis.isUnderinsured ? (
                <ShieldAlert className="h-10 w-10 text-red-600" />
              ) : (
                <ShieldCheck className="h-10 w-10 text-green-600" />
              )}
              <div>
                <CardTitle className={analysis.isUnderinsured ? "text-red-800" : "text-green-800"}>
                  {analysis.isUnderinsured ? "Coverage Gap Detected" : "Adequate Coverage"}
                </CardTitle>
                <CardDescription className={analysis.isUnderinsured ? "text-red-600" : "text-green-600"}>
                  Based on current Chicago Metro construction costs
                </CardDescription>
              </div>
            </div>
            {analysis.isUnderinsured && (
              <div className="text-right">
                <p className="text-sm text-red-600">Underinsured by</p>
                <p className="text-2xl font-bold text-red-700">{analysis.underinsuredPercent.toFixed(0)}%</p>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Coverage Progress Bar */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Current Coverage vs. Rebuild Cost</span>
                <span className="font-medium">{coverageRatio.toFixed(0)}%</span>
              </div>
              <Progress 
                value={Math.min(coverageRatio, 100)} 
                className={`h-4 ${analysis.isUnderinsured ? '[&>div]:bg-red-500' : '[&>div]:bg-green-500'}`}
              />
              <div className="flex justify-between text-xs mt-1 text-gray-500">
                <span>0%</span>
                <span>100% (Full Coverage)</span>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm">Your Coverage ({policyYear})</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {formatCurrency(analysis.originalCoverage)}
                </p>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">Current Rebuild Cost</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {formatCurrency(analysis.rebuildCostCurrent)}
                </p>
              </div>
              
              <div className={`p-4 rounded-lg shadow-sm ${analysis.isUnderinsured ? 'bg-red-100' : 'bg-green-100'}`}>
                <div className="flex items-center gap-2 mb-1">
                  {analysis.isUnderinsured ? (
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                  <span className={`text-sm ${analysis.isUnderinsured ? 'text-red-600' : 'text-green-600'}`}>
                    {analysis.isUnderinsured ? 'Coverage Gap' : 'Surplus'}
                  </span>
                </div>
                <p className={`text-2xl font-bold ${analysis.isUnderinsured ? 'text-red-700' : 'text-green-700'}`}>
                  {analysis.isUnderinsured ? '' : '+'}{formatCurrency(Math.abs(analysis.coverageGap))}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inflation Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Cost Increase Breakdown
          </CardTitle>
          <CardDescription>
            How construction costs have changed since {policyYear}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                +{analysis.materialInflation.toFixed(0)}%
              </div>
              <div className="text-sm text-orange-700 font-medium">Materials Inflation</div>
              <div className="text-xs text-orange-600 mt-1">
                Lumber, brick, roofing, electrical
              </div>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                +{analysis.laborInflation.toFixed(0)}%
              </div>
              <div className="text-sm text-blue-700 font-medium">Labor Cost Increase</div>
              <div className="text-xs text-blue-600 mt-1">
                Electricians, plumbers, contractors
              </div>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                +{analysis.totalInflation.toFixed(0)}%
              </div>
              <div className="text-sm text-purple-700 font-medium">Total Cost Increase</div>
              <div className="text-xs text-purple-600 mt-1">
                Weighted average (40% materials, 60% labor)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendation */}
      {analysis.isUnderinsured && (
        <Card className="border-2 border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <ShieldCheck className="h-5 w-5" />
              Our Recommendation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <p className="text-gray-700 mb-4">
                  To fully protect your home and ensure you can rebuild without out-of-pocket expenses, 
                  we recommend increasing your dwelling coverage to:
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Current Coverage</p>
                    <p className="text-xl font-semibold text-gray-600">
                      {formatCurrency(analysis.originalCoverage)}
                    </p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-blue-500" />
                  <div className="text-center">
                    <p className="text-sm text-blue-600">Recommended Coverage</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {formatCurrency(analysis.recommendedCoverage)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Increase Needed</p>
                <p className="text-3xl font-bold text-blue-600">
                  {formatCurrency(analysis.recommendedCoverage - analysis.originalCoverage)}
                </p>
                <p className="text-xs text-gray-500 mt-1">Includes 10% buffer</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
