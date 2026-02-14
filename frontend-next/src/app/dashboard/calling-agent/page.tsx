'use client';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useState } from 'react';

export default function CallingAgentPage() {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      name: 'Weekly Market Update',
      frequency: 'Every Tuesday',
      time: '09:00 AM',
      timezone: 'EST',
      topics: ['Market summary', 'Portfolio performance', 'Top movers'],
      active: true,
      nextCall: '2026-02-18 09:00',
      lastCall: '2026-02-11 09:00'
    },
    {
      id: 2,
      name: 'Daily Brief',
      frequency: 'Every Weekday',
      time: '06:30 AM',
      timezone: 'EST',
      topics: ['Pre-market analysis', 'Economic calendar', 'Your watchlist'],
      active: true,
      nextCall: '2026-02-15 06:30',
      lastCall: '2026-02-14 06:30'
    },
    {
      id: 3,
      name: 'Monthly Review',
      frequency: '1st of every month',
      time: '10:00 AM',
      timezone: 'EST',
      topics: ['Monthly performance', 'Portfolio rebalancing', 'Tax optimization'],
      active: false,
      nextCall: '2026-03-01 10:00',
      lastCall: '2026-02-01 10:00'
    },
  ]);

  const callHistory = [
    {
      date: '2026-02-14',
      time: '06:30 AM',
      duration: '4m 32s',
      type: 'Daily Brief',
      topics: 'Pre-market analysis, Tech sector surge',
      sentiment: 'Bullish'
    },
    {
      date: '2026-02-11',
      time: '09:00 AM',
      duration: '8m 15s',
      type: 'Weekly Market Update',
      topics: 'Portfolio +3.2%, NVDA breakout',
      sentiment: 'Positive'
    },
    {
      date: '2026-02-13',
      time: '06:30 AM',
      duration: '3m 48s',
      type: 'Daily Brief',
      topics: 'Market consolidation, Economic data',
      sentiment: 'Neutral'
    },
  ];

  const aiCapabilities = [
    {
      title: 'Natural Conversation',
      description: 'Two-way dialogue with context awareness and memory of previous calls'
    },
    {
      title: 'Real-Time Analysis',
      description: 'Live market data analysis and instant answers to your questions'
    },
    {
      title: 'Smart Scheduling',
      description: 'Flexible scheduling with timezone support and conflict detection'
    },
    {
      title: 'Alert Integration',
      description: 'Urgent notifications for significant market events or portfolio changes'
    },
  ];

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-4 border-black p-6">
          <div>
            <h2 className="text-2xl font-bold uppercase">AI Calling Agent</h2>
            <p className="text-sm mt-1">SCHEDULE AUTOMATED MARKET UPDATES VIA VOICE CALLS</p>
          </div>
          <Button>NEW SCHEDULE</Button>
        </div>

        {/* AI Capabilities */}
        <Card className="p-6 border-8 border-black">
          <h3 className="text-xl font-bold uppercase mb-6 border-b-4 border-black pb-3">Two-Way Calling Agent</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {aiCapabilities.map((capability, index) => (
              <div key={index} className="border-4 border-black p-4">
                <h4 className="font-bold uppercase mb-2">{capability.title}</h4>
                <p className="text-sm">{capability.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Scheduled Calls */}
        <div>
          <h3 className="text-xl font-bold uppercase mb-4">Your Call Schedules</h3>
          <div className="space-y-4">
            {schedules.map((schedule) => (
              <Card key={schedule.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold uppercase">{schedule.name}</h4>
                      <span className={`px-3 py-1 font-bold text-xs border-2 border-black ${
                        schedule.active ? 'bg-black text-white' : 'bg-white text-black'
                      }`}>
                        {schedule.active ? 'ACTIVE' : 'PAUSED'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                      <div>
                        <span className="font-bold">FREQUENCY:</span> {schedule.frequency}
                      </div>
                      <div>
                        <span className="font-bold">TIME:</span> {schedule.time} {schedule.timezone}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t-4 border-black pt-4 mt-4">
                  <h5 className="font-bold uppercase text-sm mb-2">TOPICS COVERED</h5>
                  <div className="flex flex-wrap gap-2">
                    {schedule.topics.map((topic, index) => (
                      <span key={index} className="px-3 py-1 border-2 border-black text-xs font-bold">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t-4 border-black pt-4 mt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-bold uppercase text-xs mb-1">NEXT CALL</div>
                      <div>{schedule.nextCall}</div>
                    </div>
                    <div>
                      <div className="font-bold uppercase text-xs mb-1">LAST CALL</div>
                      <div>{schedule.lastCall}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1">
                    {schedule.active ? 'PAUSE' : 'ACTIVATE'}
                  </Button>
                  <Button size="sm" variant="outline">EDIT</Button>
                  <Button size="sm" variant="outline">DELETE</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call History */}
        <Card className="p-6">
          <h3 className="text-xl font-bold uppercase mb-6 border-b-4 border-black pb-3">Call History</h3>
          <div className="space-y-4">
            {callHistory.map((call, index) => (
              <div key={index} className="border-4 border-black p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-bold uppercase">{call.type}</div>
                    <div className="text-sm mt-1">{call.date} at {call.time}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{call.duration}</div>
                    <div className="text-xs">DURATION</div>
                  </div>
                </div>
                <div className="border-t-2 border-black pt-3">
                  <div className="text-sm mb-2"><span className="font-bold">TOPICS:</span> {call.topics}</div>
                  <div className="text-sm">
                    <span className="font-bold">SENTIMENT:</span> 
                    <span className="px-2 py-1 ml-2 border-2 border-black font-bold text-xs bg-black text-white">
                      {call.sentiment.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border-4 border-black hover:bg-black hover:text-white cursor-pointer">
            <h4 className="font-bold uppercase mb-2">REQUEST IMMEDIATE CALL</h4>
            <p className="text-sm">Get instant market update</p>
          </Card>
          <Card className="p-6 border-4 border-black hover:bg-black hover:text-white cursor-pointer">
            <h4 className="font-bold uppercase mb-2">MANAGE PREFERENCES</h4>
            <p className="text-sm">Customize call settings</p>
          </Card>
          <Card className="p-6 border-4 border-black hover:bg-black hover:text-white cursor-pointer">
            <h4 className="font-bold uppercase mb-2">VIEW ALL RECORDINGS</h4>
            <p className="text-sm">Access call archive</p>
          </Card>
        </div>
      </div>
  );
}
