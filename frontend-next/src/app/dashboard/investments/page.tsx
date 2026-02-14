'use client';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useState } from 'react';

export default function InvestmentsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const shariahStocks = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 175.43,
      change: 2.3,
      shariahCompliant: true,
      debtRatio: 15,
      halalRevenue: 100,
      rating: 'Excellent',
      sector: 'Technology'
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      price: 378.91,
      change: 1.8,
      shariahCompliant: true,
      debtRatio: 22,
      halalRevenue: 98,
      rating: 'Good',
      sector: 'Technology'
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 248.50,
      change: 3.2,
      shariahCompliant: true,
      debtRatio: 8,
      halalRevenue: 100,
      rating: 'Excellent',
      sector: 'Automotive'
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corp.',
      price: 875.28,
      change: 5.1,
      shariahCompliant: true,
      debtRatio: 12,
      halalRevenue: 100,
      rating: 'Excellent',
      sector: 'Technology'
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 141.80,
      change: -0.5,
      shariahCompliant: false,
      debtRatio: 8,
      halalRevenue: 85,
      rating: 'Non-Compliant',
      sector: 'Technology'
    },
  ];

  const investmentOptions = [
    {
      name: 'Halal Growth Portfolio',
      description: 'Diversified portfolio of high-growth Shariah-compliant stocks',
      minInvestment: '$5,000',
      expectedReturn: '12-18% annually',
      riskLevel: 'Medium',
      holdings: 25,
      compliance: '100%'
    },
    {
      name: 'Islamic Tech Fund',
      description: 'Focus on technology companies meeting strict Shariah guidelines',
      minInvestment: '$10,000',
      expectedReturn: '15-22% annually',
      riskLevel: 'Medium-High',
      holdings: 15,
      compliance: '100%'
    },
    {
      name: 'Ethical Income Generator',
      description: 'Dividend-focused Shariah-compliant investments',
      minInvestment: '$3,000',
      expectedReturn: '8-12% annually',
      riskLevel: 'Low-Medium',
      holdings: 30,
      compliance: '100%'
    },
  ];

  const shariahPrinciples = [
    {
      title: 'No Interest',
      description: 'Companies must not engage in interest-based lending or borrowing'
    },
    {
      title: 'No Gambling',
      description: 'No investment in gambling, betting, or speculative businesses'
    },
    {
      title: 'No Prohibited Goods',
      description: 'Excludes alcohol, pork, tobacco, weapons, and adult entertainment'
    },
    {
      title: 'Debt Ratio Limit',
      description: 'Total debt must be less than 33% of market capitalization'
    },
    {
      title: 'Pure Income',
      description: 'Interest income must be less than 5% of total revenue'
    },
    {
      title: 'Ethical Business',
      description: 'Companies must conduct business ethically and transparently'
    },
  ];

  const filteredStocks = activeFilter === 'all' 
    ? shariahStocks 
    : shariahStocks.filter(stock => stock.shariahCompliant);

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="border-4 border-black p-6">
          <h2 className="text-2xl font-bold uppercase">Shariah-Compliant Investments</h2>
          <p className="text-sm mt-1">ETHICALLY INVEST ACCORDING TO ISLAMIC FINANCE PRINCIPLES</p>
        </div>

        {/* Shariah Principles */}
        <Card className="p-6 border-8 border-black">
          <h3 className="text-xl font-bold uppercase mb-6 border-b-4 border-black pb-3">Islamic Investment Principles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shariahPrinciples.map((principle, index) => (
              <div key={index} className="border-4 border-black p-4">
                <h4 className="font-bold uppercase mb-2">{principle.title}</h4>
                <p className="text-sm">{principle.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Curated Portfolios */}
        <div>
          <h3 className="text-xl font-bold uppercase mb-4">Curated Halal Portfolios</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {investmentOptions.map((option, index) => (
              <Card key={index} className="p-6">
                <div className="space-y-4">
                  <div className="border-b-4 border-black pb-3">
                    <h4 className="text-lg font-bold uppercase">{option.name}</h4>
                    <p className="text-sm mt-2">{option.description}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b-2 border-black py-2">
                      <span className="font-bold">MIN INVESTMENT</span>
                      <span>{option.minInvestment}</span>
                    </div>
                    <div className="flex justify-between border-b-2 border-black py-2">
                      <span className="font-bold">EXPECTED RETURN</span>
                      <span className="font-bold">{option.expectedReturn}</span>
                    </div>
                    <div className="flex justify-between border-b-2 border-black py-2">
                      <span className="font-bold">RISK LEVEL</span>
                      <span>{option.riskLevel}</span>
                    </div>
                    <div className="flex justify-between border-b-2 border-black py-2">
                      <span className="font-bold">HOLDINGS</span>
                      <span>{option.holdings}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-bold">COMPLIANCE</span>
                      <span className="font-bold">{option.compliance}</span>
                    </div>
                  </div>

                  <Button className="w-full">INVEST NOW</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stock Screener */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6 border-b-4 border-black pb-4">
            <h3 className="text-xl font-bold uppercase">Shariah Stock Screener</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 font-bold text-xs uppercase border-4 border-black ${
                  activeFilter === 'all' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'
                }`}
              >
                ALL
              </button>
              <button
                onClick={() => setActiveFilter('halal')}
                className={`px-4 py-2 font-bold text-xs uppercase border-4 border-black ${
                  activeFilter === 'halal' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'
                }`}
              >
                HALAL ONLY
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-4 border-black">
                  <th className="text-left font-bold uppercase text-xs py-3 px-4">Symbol</th>
                  <th className="text-left font-bold uppercase text-xs py-3 px-4">Name</th>
                  <th className="text-right font-bold uppercase text-xs py-3 px-4">Price</th>
                  <th className="text-right font-bold uppercase text-xs py-3 px-4">Change</th>
                  <th className="text-right font-bold uppercase text-xs py-3 px-4">Debt Ratio</th>
                  <th className="text-right font-bold uppercase text-xs py-3 px-4">Halal Revenue</th>
                  <th className="text-center font-bold uppercase text-xs py-3 px-4">Rating</th>
                  <th className="text-center font-bold uppercase text-xs py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStocks.map((stock, index) => (
                  <tr key={index} className="border-b-2 border-black hover:bg-black hover:text-white">
                    <td className="py-4 px-4 font-bold">{stock.symbol}</td>
                    <td className="py-4 px-4">{stock.name}</td>
                    <td className="py-4 px-4 text-right font-bold">${stock.price.toFixed(2)}</td>
                    <td className="py-4 px-4 text-right font-bold">
                      {stock.change > 0 ? '+' : ''}{stock.change}%
                    </td>
                    <td className="py-4 px-4 text-right">{stock.debtRatio}%</td>
                    <td className="py-4 px-4 text-right">{stock.halalRevenue}%</td>
                    <td className="py-4 px-4 text-center font-bold">{stock.rating}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-3 py-1 font-bold text-xs border-2 border-black ${
                        stock.shariahCompliant ? 'bg-black text-white' : 'bg-white text-black'
                      }`}>
                        {stock.shariahCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
  );
}
