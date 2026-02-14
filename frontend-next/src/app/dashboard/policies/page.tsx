'use client';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function PoliciesPage() {
  const policies = [
    {
      id: 1,
      name: 'Conservative Growth',
      type: 'Risk Management',
      status: 'active',
      rules: [
        'Max 30% allocation in any single stock',
        'Stop loss at -5% per position',
        'Take profit at +15% per position',
        'Maximum portfolio volatility: 12%'
      ],
      performance: '+8.5%',
      lastModified: '2026-02-10'
    },
    {
      id: 2,
      name: 'Shariah Compliance Only',
      type: 'Investment Filter',
      status: 'active',
      rules: [
        'Only Shariah-compliant stocks',
        'No alcohol, gambling, or interest-based businesses',
        'Debt-to-equity ratio < 33%',
        'Quarterly compliance review'
      ],
      performance: '+12.3%',
      lastModified: '2026-02-08'
    },
    {
      id: 3,
      name: 'Tech Sector Focus',
      type: 'Sector Allocation',
      status: 'inactive',
      rules: [
        'Minimum 60% in technology sector',
        'Diversify across AI, cloud, and semiconductors',
        'Rebalance monthly',
        'Monitor P/E ratios weekly'
      ],
      performance: '+18.7%',
      lastModified: '2026-01-25'
    },
  ];

  const aiRecommendations = [
    {
      title: 'Increase Diversification',
      description: 'Your portfolio concentration in tech stocks is above the optimal threshold.',
      impact: 'MEDIUM RISK',
      action: 'Reduce tech allocation by 10%'
    },
    {
      title: 'Rebalance Alert',
      description: 'NVDA has grown to 25% of portfolio, exceeding your 20% limit.',
      impact: 'HIGH RISK',
      action: 'Sell 5% to maintain compliance'
    },
    {
      title: 'New Opportunity',
      description: 'Healthcare sector showing strong fundamentals and Shariah compliance.',
      impact: 'GROWTH POTENTIAL',
      action: 'Consider 10% allocation'
    },
  ];

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-4 border-black p-6">
          <div>
            <h2 className="text-2xl font-bold uppercase">Portfolio Policies</h2>
            <p className="text-sm mt-1">MANAGE YOUR TRADING RULES AND COMPLIANCE</p>
          </div>
          <Button>NEW POLICY</Button>
        </div>

        {/* AI Recommendations */}
        <Card className="p-6 border-8 border-black">
          <h3 className="text-xl font-bold uppercase mb-6 border-b-4 border-black pb-3">AI Policy Advisor</h3>
          
          <div className="space-y-4">
            {aiRecommendations.map((rec, index) => (
              <div key={index} className="border-4 border-black p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold uppercase">{rec.title}</h4>
                    <p className="text-sm mt-1">{rec.description}</p>
                  </div>
                  <span className="px-3 py-1 border-2 border-black font-bold text-xs bg-black text-white whitespace-nowrap">
                    {rec.impact}
                  </span>
                </div>
                <div className="border-t-2 border-black pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold">ACTION: {rec.action}</span>
                    <Button size="sm">APPLY</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Policies */}
        <div>
          <h3 className="text-xl font-bold uppercase mb-4">Active Policies</h3>
          <div className="space-y-4">
            {policies.map((policy) => (
              <Card key={policy.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold uppercase">{policy.name}</h4>
                      <span className={`px-3 py-1 font-bold text-xs border-2 border-black ${policy.status === 'active' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                        {policy.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm font-bold">{policy.type.toUpperCase()}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{policy.performance}</div>
                    <div className="text-xs">PERFORMANCE</div>
                  </div>
                </div>

                <div className="border-t-4 border-black pt-4">
                  <h5 className="font-bold uppercase text-sm mb-3">Rules</h5>
                  <ul className="space-y-2">
                    {policy.rules.map((rule, index) => (
                      <li key={index} className="text-sm border-l-4 border-black pl-3">{rule}</li>
                    ))}
                  </ul>
                </div>

                <div className="border-t-4 border-black pt-4 mt-4 flex items-center justify-between">
                  <span className="text-xs font-bold">LAST MODIFIED: {policy.lastModified}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">EDIT</Button>
                    <Button size="sm" variant="outline">DELETE</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Compliance Status */}
        <Card className="p-6">
          <h3 className="text-xl font-bold uppercase mb-6 border-b-4 border-black pb-3">Compliance Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-4 border-black p-4">
              <div className="text-3xl font-bold">12</div>
              <div className="text-sm font-bold uppercase mt-1">Compliant</div>
            </div>
            <div className="border-4 border-black p-4">
              <div className="text-3xl font-bold">1</div>
              <div className="text-sm font-bold uppercase mt-1">Needs Attention</div>
            </div>
            <div className="border-4 border-black p-4">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm font-bold uppercase mt-1">Overall Score</div>
            </div>
          </div>
        </Card>
      </div>
  );
}
