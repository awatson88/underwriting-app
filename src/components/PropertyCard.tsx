"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MapPin, 
  Home, 
  Calendar, 
  Ruler, 
  BedDouble, 
  Bath, 
  Car, 
  Flame,
  Snowflake,
  Building
} from 'lucide-react';
import { PolicyData, HomeDetails } from '@/lib/types';

interface PropertyCardProps {
  policy: PolicyData;
  home: HomeDetails;
}

export default function PropertyCard({ policy, home }: PropertyCardProps) {
  const fullAddress = `${policy.address}, ${policy.city}, ${policy.state} ${policy.zipCode}`;
  
  // Generate a Google Maps Static API-style placeholder URL
  // In production, you'd use actual Google Maps Static API or similar
  const mapImageUrl = `https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${encodeURIComponent(fullAddress)}&key=YOUR_API_KEY`;
  
  // For demo, we'll use a placeholder image
  const placeholderImage = "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop";
  
  const formatRoofType = (type: string) => {
    return type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };
  
  const formatExterior = (type: string) => {
    return type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative h-64 bg-gray-200">
        {/* Property Image */}
        <img
          src={placeholderImage}
          alt={`Property at ${policy.address}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="h-5 w-5" />
            <span className="font-semibold text-lg">{policy.address}</span>
          </div>
          <span className="text-sm text-gray-200">
            {policy.city}, {policy.state} {policy.zipCode}
          </span>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5 text-blue-600" />
          Property Details
        </CardTitle>
        <CardDescription>
          Policy #{policy.policyNumber} • Policyholder: {policy.policyholderName}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Ruler className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Square Feet</p>
              <p className="font-semibold">{home.squareFootage.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Year Built</p>
              <p className="font-semibold">{home.yearBuilt}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Building className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Stories</p>
              <p className="font-semibold">{home.stories}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <BedDouble className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Bedrooms</p>
              <p className="font-semibold">{home.bedrooms}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Bath className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Bathrooms</p>
              <p className="font-semibold">{home.bathrooms}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Car className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Garage</p>
              <p className="font-semibold">
                {home.garageType === 'none' ? 'None' : `${home.garageCars}-car ${home.garageType}`}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="font-medium mb-3 text-gray-700">Construction Details</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between p-2 bg-orange-50 rounded">
              <span className="text-gray-600">Roof Type:</span>
              <span className="font-medium">{formatRoofType(home.roofType)}</span>
            </div>
            <div className="flex justify-between p-2 bg-orange-50 rounded">
              <span className="text-gray-600">Roof Age:</span>
              <span className="font-medium">{home.roofAge} years</span>
            </div>
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span className="text-gray-600">Exterior:</span>
              <span className="font-medium">{formatExterior(home.exteriorType)}</span>
            </div>
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span className="text-gray-600">Basement:</span>
              <span className="font-medium">
                {home.hasBasement ? (home.basementFinished ? 'Finished' : 'Unfinished') : 'None'}
              </span>
            </div>
            <div className="flex justify-between p-2 bg-red-50 rounded">
              <span className="text-gray-600 flex items-center gap-1">
                <Flame className="h-3 w-3" /> Heating:
              </span>
              <span className="font-medium">{formatRoofType(home.heatingType)}</span>
            </div>
            <div className="flex justify-between p-2 bg-cyan-50 rounded">
              <span className="text-gray-600 flex items-center gap-1">
                <Snowflake className="h-3 w-3" /> Cooling:
              </span>
              <span className="font-medium">{formatRoofType(home.coolingType)}</span>
            </div>
            <div className="flex justify-between p-2 bg-purple-50 rounded">
              <span className="text-gray-600">Kitchen:</span>
              <span className="font-medium capitalize">{home.kitchenQuality}</span>
            </div>
            <div className="flex justify-between p-2 bg-purple-50 rounded">
              <span className="text-gray-600">Bathrooms:</span>
              <span className="font-medium capitalize">{home.bathroomQuality}</span>
            </div>
          </div>
        </div>
        
        {home.hasPool && (
          <div className="mt-3 p-2 bg-cyan-100 rounded-lg text-center text-cyan-800 font-medium">
            🏊 Property includes swimming pool
          </div>
        )}
      </CardContent>
    </Card>
  );
}
