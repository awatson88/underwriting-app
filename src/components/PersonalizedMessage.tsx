"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Copy, 
  Check, 
  Send,
  FileText,
  MessageSquare
} from 'lucide-react';

interface PersonalizedMessageProps {
  message: string;
  policyholderName: string;
}

export default function PersonalizedMessage({ message, policyholderName }: PersonalizedMessageProps) {
  const [copied, setCopied] = useState(false);
  const firstName = policyholderName.split(' ')[0];

  const handleCopy = () => {
    // Convert markdown-style formatting to plain text for clipboard
    const plainText = message
      .replace(/\*\*/g, '')
      .replace(/📊|📋|🏠/g, '')
      .trim();
    
    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Convert message to HTML for display
  const formatMessage = (text: string) => {
    return text
      .split('\n')
      .map((line, i) => {
        // Headers
        if (line.startsWith('📊') || line.startsWith('📋') || line.startsWith('🏠')) {
          return (
            <p key={i} className="font-semibold text-lg mt-4 mb-2 text-blue-800">
              {line}
            </p>
          );
        }
        // Bold text
        if (line.includes('**')) {
          const parts = line.split(/\*\*([^*]+)\*\*/g);
          return (
            <p key={i} className="my-1">
              {parts.map((part, j) => 
                j % 2 === 1 ? <strong key={j}>{part}</strong> : part
              )}
            </p>
          );
        }
        // Bullet points
        if (line.startsWith('•') || line.startsWith('-')) {
          return (
            <p key={i} className="ml-4 my-1">
              {line}
            </p>
          );
        }
        // Horizontal rule
        if (line.startsWith('---')) {
          return <hr key={i} className="my-4 border-gray-300" />;
        }
        // Empty lines
        if (line.trim() === '') {
          return <br key={i} />;
        }
        // Regular text
        return <p key={i} className="my-1">{line}</p>;
      });
  };

  return (
    <Card className="border-2 border-indigo-200">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Mail className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <CardTitle className="text-indigo-800">Personalized Outreach Message</CardTitle>
              <CardDescription className="text-indigo-600">
                Customized for {policyholderName}
              </CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
            <Button size="sm" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
              <Send className="h-4 w-4" />
              Send Email
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-inner max-h-[600px] overflow-y-auto">
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
            {formatMessage(message)}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Generate PDF Report
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Schedule Call with {firstName}
          </Button>
        </div>
        
        {/* Message Stats */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex gap-6 text-sm text-gray-500">
          <span>Word count: {message.split(/\s+/).length}</span>
          <span>Reading time: ~{Math.ceil(message.split(/\s+/).length / 200)} min</span>
          <span>Personalization level: High</span>
        </div>
      </CardContent>
    </Card>
  );
}
