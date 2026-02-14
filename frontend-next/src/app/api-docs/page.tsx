'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Code2, Book, Zap, Shield, TrendingUp, ArrowLeft } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function APIDocsPage() {
  const [activeEndpoint, setActiveEndpoint] = useState('market-data');

  const endpoints = [
    {
      id: 'market-data',
      name: 'Market Data',
      method: 'GET',
      path: '/api/v1/market/quote',
      description: 'Get real-time market quotes for stocks',
      params: [
        { name: 'symbol', type: 'string', required: true, description: 'Stock ticker symbol (e.g., AAPL)' },
        { name: 'interval', type: 'string', required: false, description: '1m, 5m, 15m, 1h, 1d' },
      ],
      response: `{
  "symbol": "AAPL",
  "price": 175.43,
  "change": 2.3,
  "volume": "54.2M",
  "timestamp": "2026-02-14T14:30:00Z"
}`
    },
    {
      id: 'portfolio',
      name: 'Portfolio Analysis',
      method: 'POST',
      path: '/api/v1/portfolio/analyze',
      description: 'AI-powered portfolio analysis and recommendations',
      params: [
        { name: 'holdings', type: 'array', required: true, description: 'Array of stock holdings' },
        { name: 'includeShariah', type: 'boolean', required: false, description: 'Filter by Shariah compliance' },
      ],
      response: `{
  "totalValue": 125430.50,
  "riskScore": 6.5,
  "recommendations": [...],
  "compliance": "100% Halal"
}`
    },
    {
      id: 'trading-signals',
      name: 'Trading Signals',
      method: 'GET',
      path: '/api/v1/signals/ai',
      description: 'Get AI-generated trading signals',
      params: [
        { name: 'symbols', type: 'array', required: true, description: 'List of symbols to analyze' },
        { name: 'timeframe', type: 'string', required: false, description: 'Analysis timeframe' },
      ],
      response: `{
  "signals": [
    {
      "symbol": "NVDA",
      "action": "BUY",
      "confidence": 87,
      "reasoning": "Strong momentum..."
    }
  ]
}`
    },
    {
      id: 'shariah',
      name: 'Shariah Screening',
      method: 'GET',
      path: '/api/v1/shariah/compliance',
      description: 'Check Shariah compliance for stocks',
      params: [
        { name: 'symbol', type: 'string', required: true, description: 'Stock symbol' },
      ],
      response: `{
  "symbol": "AAPL",
  "compliant": true,
  "debtRatio": 15,
  "halalRevenue": 100,
  "rating": "Excellent"
}`
    },
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Real-Time Data',
      description: 'Live market data with WebSocket support for instant updates'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime SLA'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'AI-Powered',
      description: 'Advanced machine learning models for market analysis'
    },
    {
      icon: <Book className="w-6 h-6" />,
      title: 'Well Documented',
      description: 'Comprehensive docs, SDKs, and code examples'
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$49/mo',
      requests: '10,000 requests/month',
      features: ['Basic market data', 'Email support', 'API documentation', 'Rate limit: 10 req/sec']
    },
    {
      name: 'Professional',
      price: '$199/mo',
      requests: '100,000 requests/month',
      features: ['All market data', 'Priority support', 'WebSocket access', 'Rate limit: 50 req/sec'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      requests: 'Unlimited requests',
      features: ['Custom solutions', '24/7 support', 'Dedicated servers', 'Custom rate limits']
    },
  ];

  const currentEndpoint = endpoints.find(e => e.id === activeEndpoint);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                TensorTrade API
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Get API Key</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              API Documentation
            </h1>
            <p className="text-xl text-gray-300">
              Powerful APIs for intelligent trading and market analysis
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-white/5 backdrop-blur-sm border-white/10 text-center">
                <div className="text-blue-400 mb-3 flex justify-center">{feature.icon}</div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>

          {/* API Explorer */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {/* Endpoints List */}
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Endpoints</h3>
              <div className="space-y-2">
                {endpoints.map((endpoint) => (
                  <button
                    key={endpoint.id}
                    onClick={() => setActiveEndpoint(endpoint.id)}
                    className={`w-full text-left p-3 rounded-lg transition ${
                      activeEndpoint === endpoint.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{endpoint.name}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        endpoint.method === 'GET' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {endpoint.method}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Endpoint Details */}
            <Card className="lg:col-span-2 p-6 bg-white/5 backdrop-blur-sm border-white/10">
              {currentEndpoint && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{currentEndpoint.name}</h3>
                    <span className={`px-3 py-1 rounded font-medium ${
                      currentEndpoint.method === 'GET' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {currentEndpoint.method}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{currentEndpoint.description}</p>

                  <div className="bg-black/40 rounded-lg p-4 mb-6">
                    <code className="text-blue-400 text-sm">{currentEndpoint.path}</code>
                  </div>

                  <h4 className="text-lg font-semibold text-white mb-3">Parameters</h4>
                  <div className="space-y-2 mb-6">
                    {currentEndpoint.params.map((param, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <code className="text-blue-400">{param.name}</code>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400 text-xs">{param.type}</span>
                            {param.required && (
                              <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-xs">
                                Required
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">{param.description}</p>
                      </div>
                    ))}
                  </div>

                  <h4 className="text-lg font-semibold text-white mb-3">Example Response</h4>
                  <div className="bg-black/40 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                      <code>{currentEndpoint.response}</code>
                    </pre>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Pricing */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white text-center mb-8">API Pricing</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {pricingPlans.map((plan, index) => (
                <Card
                  key={index}
                  className={`p-6 ${
                    plan.popular
                      ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/50'
                      : 'bg-white/5 backdrop-blur-sm border-white/10'
                  }`}
                >
                  {plan.popular && (
                    <div className="text-center mb-3">
                      <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-1">{plan.price}</div>
                  <div className="text-gray-400 text-sm mb-6">{plan.requests}</div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300 text-sm">
                        <Code2 className="w-4 h-4 text-green-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? 'primary' : 'outline'}>
                    Get Started
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Start */}
          <Card className="p-8 bg-white/5 backdrop-blur-sm border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Quick Start</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-2">1. Get your API key</h4>
                <p className="text-gray-400 text-sm">Sign up for an account to receive your unique API key</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">2. Make your first request</h4>
                <div className="bg-black/40 rounded-lg p-4 mt-2">
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    <code>{`curl -X GET "https://api.tensortrade.com/v1/market/quote?symbol=AAPL" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</code>
                  </pre>
                </div>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">3. Explore the docs</h4>
                <p className="text-gray-400 text-sm">Check out our comprehensive guides and SDKs</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
