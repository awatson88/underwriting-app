"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileText, Home, Building } from 'lucide-react';
import { PolicyData, HomeDetails } from '@/lib/types';

interface PolicyInputFormProps {
  onSubmit: (policy: PolicyData, home: HomeDetails) => void;
}

const defaultPolicy: PolicyData = {
  policyNumber: 'SF-2019-847291',
  policyholderName: 'Andrew Watson',
  address: '1847 N Winchester Ave',
  city: 'Chicago',
  state: 'IL',
  zipCode: '60622',
  policyStartDate: '2019-11-15',
  currentCoverage: 650000,
  annualPremium: 2400,
  deductible: 2500,
};

const defaultHome: HomeDetails = {
  squareFootage: 2800,
  yearBuilt: 1920,
  stories: 2,
  bedrooms: 4,
  bathrooms: 2.5,
  garageType: 'detached',
  garageCars: 2,
  roofType: 'asphalt_shingle',
  roofAge: 12,
  exteriorType: 'brick',
  heatingType: 'forced_air',
  coolingType: 'central_ac',
  hasBasement: true,
  basementFinished: true,
  hasPool: false,
  kitchenQuality: 'upgraded',
  bathroomQuality: 'standard',
};

export default function PolicyInputForm({ onSubmit }: PolicyInputFormProps) {
  const [policy, setPolicy] = useState<PolicyData>(defaultPolicy);
  const [home, setHome] = useState<HomeDetails>(defaultHome);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // In a real app, we'd parse the PDF here
      // For demo, we'll use the default values
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(policy, home);
  };

  const updatePolicy = (field: keyof PolicyData, value: string | number) => {
    setPolicy((prev) => ({ ...prev, [field]: value }));
  };

  const updateHome = (field: keyof HomeDetails, value: string | number | boolean) => {
    setHome((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Policy
          </TabsTrigger>
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Manual Entry
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Your Policy Document
              </CardTitle>
              <CardDescription>
                Upload your homeowner&apos;s insurance policy PDF and we&apos;ll extract the details automatically.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="policy-upload"
                />
                <label htmlFor="policy-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-700">
                    {uploadedFile ? uploadedFile.name : 'Drop your policy PDF here'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">or click to browse</p>
                </label>
              </div>
              {uploadedFile && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg flex items-center gap-3">
                  <FileText className="h-5 w-5 text-green-600" />
                  <span className="text-green-700">Policy uploaded successfully! Using extracted data.</span>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual" className="mt-4 space-y-6">
          {/* Policy Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Policy Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="policyNumber">Policy Number</Label>
                <Input
                  id="policyNumber"
                  value={policy.policyNumber}
                  onChange={(e) => updatePolicy('policyNumber', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="policyholderName">Policyholder Name</Label>
                <Input
                  id="policyholderName"
                  value={policy.policyholderName}
                  onChange={(e) => updatePolicy('policyholderName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="policyStartDate">Policy Start Date</Label>
                <Input
                  id="policyStartDate"
                  type="date"
                  value={policy.policyStartDate}
                  onChange={(e) => updatePolicy('policyStartDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentCoverage">Current Dwelling Coverage ($)</Label>
                <Input
                  id="currentCoverage"
                  type="number"
                  value={policy.currentCoverage}
                  onChange={(e) => updatePolicy('currentCoverage', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="annualPremium">Annual Premium ($)</Label>
                <Input
                  id="annualPremium"
                  type="number"
                  value={policy.annualPremium}
                  onChange={(e) => updatePolicy('annualPremium', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deductible">Deductible ($)</Label>
                <Input
                  id="deductible"
                  type="number"
                  value={policy.deductible}
                  onChange={(e) => updatePolicy('deductible', parseInt(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Property Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Property Address
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2 lg:col-span-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  value={policy.address}
                  onChange={(e) => updatePolicy('address', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={policy.city}
                  onChange={(e) => updatePolicy('city', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={policy.state}
                  onChange={(e) => updatePolicy('state', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={policy.zipCode}
                  onChange={(e) => updatePolicy('zipCode', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Home Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Home Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="squareFootage">Square Footage</Label>
                <Input
                  id="squareFootage"
                  type="number"
                  value={home.squareFootage}
                  onChange={(e) => updateHome('squareFootage', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearBuilt">Year Built</Label>
                <Input
                  id="yearBuilt"
                  type="number"
                  value={home.yearBuilt}
                  onChange={(e) => updateHome('yearBuilt', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stories">Stories</Label>
                <Input
                  id="stories"
                  type="number"
                  value={home.stories}
                  onChange={(e) => updateHome('stories', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={home.bedrooms}
                  onChange={(e) => updateHome('bedrooms', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  step="0.5"
                  value={home.bathrooms}
                  onChange={(e) => updateHome('bathrooms', parseFloat(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roofType">Roof Type</Label>
                <Select value={home.roofType} onValueChange={(v) => updateHome('roofType', v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asphalt_shingle">Asphalt Shingle</SelectItem>
                    <SelectItem value="metal">Metal</SelectItem>
                    <SelectItem value="tile">Tile</SelectItem>
                    <SelectItem value="slate">Slate</SelectItem>
                    <SelectItem value="flat">Flat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="roofAge">Roof Age (years)</Label>
                <Input
                  id="roofAge"
                  type="number"
                  value={home.roofAge}
                  onChange={(e) => updateHome('roofAge', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exteriorType">Exterior Type</Label>
                <Select value={home.exteriorType} onValueChange={(v) => updateHome('exteriorType', v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brick">Brick</SelectItem>
                    <SelectItem value="vinyl">Vinyl Siding</SelectItem>
                    <SelectItem value="wood">Wood</SelectItem>
                    <SelectItem value="stucco">Stucco</SelectItem>
                    <SelectItem value="fiber_cement">Fiber Cement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="garageType">Garage Type</Label>
                <Select value={home.garageType} onValueChange={(v) => updateHome('garageType', v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="attached">Attached</SelectItem>
                    <SelectItem value="detached">Detached</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="garageCars">Garage Cars</Label>
                <Input
                  id="garageCars"
                  type="number"
                  value={home.garageCars}
                  onChange={(e) => updateHome('garageCars', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kitchenQuality">Kitchen Quality</Label>
                <Select value={home.kitchenQuality} onValueChange={(v) => updateHome('kitchenQuality', v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="upgraded">Upgraded</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathroomQuality">Bathroom Quality</Label>
                <Select value={home.bathroomQuality} onValueChange={(v) => updateHome('bathroomQuality', v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="upgraded">Upgraded</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="heatingType">Heating Type</Label>
                <Select value={home.heatingType} onValueChange={(v) => updateHome('heatingType', v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="forced_air">Forced Air</SelectItem>
                    <SelectItem value="radiant">Radiant</SelectItem>
                    <SelectItem value="heat_pump">Heat Pump</SelectItem>
                    <SelectItem value="boiler">Boiler</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="coolingType">Cooling Type</Label>
                <Select value={home.coolingType} onValueChange={(v) => updateHome('coolingType', v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="central_ac">Central AC</SelectItem>
                    <SelectItem value="window_units">Window Units</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 flex items-center gap-4 pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={home.hasBasement}
                    onChange={(e) => updateHome('hasBasement', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm">Has Basement</span>
                </label>
              </div>
              <div className="space-y-2 flex items-center gap-4 pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={home.basementFinished}
                    onChange={(e) => updateHome('basementFinished', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                    disabled={!home.hasBasement}
                  />
                  <span className="text-sm">Basement Finished</span>
                </label>
              </div>
              <div className="space-y-2 flex items-center gap-4 pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={home.hasPool}
                    onChange={(e) => updateHome('hasPool', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm">Has Pool</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button type="submit" size="lg" className="px-8">
          Analyze Coverage
        </Button>
      </div>
    </form>
  );
}
