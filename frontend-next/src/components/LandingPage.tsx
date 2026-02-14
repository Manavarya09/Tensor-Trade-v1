'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  BarChart3, 
  Phone, 
  Bot,
  CheckCircle2,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Portfolio Management",
      description: "AI-powered portfolio optimization with real-time insights and risk management"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Shariah Compliant",
      description: "Investment options fully compliant with Islamic finance principles"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "AI Calling Agent",
      description: "Schedule automated market updates and personalized insights via calls"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Live Trading",
      description: "Real-time trading with IPO listings and market analysis"
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "Multi-Agent System",
      description: "Self-improving AI agents that learn and adapt from every market move"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "MCP Server",
      description: "Model Context Protocol integration for advanced AI capabilities"
    }
  ];

  const offerings = [
    {
      title: "Dashboard",
      description: "Complete trading platform with portfolio management, live market data, and AI-powered insights",
      features: ["Real-time analytics", "Risk management", "Policy tracking", "IPO listings"],
      cta: "Get Started",
      link: "/auth/login",
      highlight: true
    },
    {
      title: "API Service",
      description: "Enterprise-grade API for market analysis, trading signals, and AI-generated insights",
      features: ["RESTful API", "WebSocket streams", "99.9% uptime", "Full documentation"],
      cta: "View API Docs",
      link: "/api-docs",
      highlight: false
    },
    {
      title: "MCP Server",
      description: "Advanced Model Context Protocol server for seamless AI integration",
      features: ["Plugin architecture", "Custom agents", "Real-time data", "Enterprise support"],
      cta: "Learn More",
      link: "/mcp",
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                TensorTrade
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
              <a href="#offerings" className="text-gray-300 hover:text-white transition">Products</a>
              <a href="#api" className="text-gray-300 hover:text-white transition">API</a>
              <Link href="/auth/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/40 backdrop-blur-md border-t border-white/10">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-gray-300 hover:text-white">Features</a>
              <a href="#offerings" className="block text-gray-300 hover:text-white">Products</a>
              <a href="#api" className="block text-gray-300 hover:text-white">API</a>
              <Link href="/auth/login">
                <Button variant="outline" size="sm" className="w-full mb-2">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI-Powered Trading Platform
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Self-improving multi-agent system that analyzes markets, manages portfolios, 
            and delivers insights like expert analysts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Start Trading Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#offerings">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Explore Products
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">$2.5B+</div>
              <div className="text-gray-400">Assets Managed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12">
            Everything you need for intelligent trading
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} hover className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section id="offerings" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Choose Your Path
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12">
            Dashboard, API, or MCP Server - we've got you covered
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {offerings.map((offering, index) => (
              <Card 
                key={index} 
                hover 
                className={`p-8 ${offering.highlight ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/50' : 'bg-white/5 backdrop-blur-sm border-white/10'}`}
              >
                <h3 className="text-2xl font-bold text-white mb-3">{offering.title}</h3>
                <p className="text-gray-400 mb-6">{offering.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {offering.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-green-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link href={offering.link}>
                  <Button 
                    variant={offering.highlight ? "primary" : "outline"} 
                    className="w-full"
                  >
                    {offering.cta}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of traders using AI to make smarter decisions
          </p>
          <Link href="/auth/signup">
            <Button size="lg">
              Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2026 TensorTrade. All rights reserved.</p>
          <div className="mt-4 space-x-6">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
