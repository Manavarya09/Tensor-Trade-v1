'use client';

import { useState, useEffect } from 'react';
import { PhoneIcon, PlusIcon, CalendarIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';

interface CallSchedule {
  id: string;
  phone: string;
  schedule: string;
  contentType: 'market_update' | 'portfolio_review' | 'custom';
  language: 'en' | 'ar';
  active: boolean;
  nextCall: string;
  lastCall?: string;
  totalCalls: number;
}

export default function VoiceAgentPage() {
  const [schedules, setSchedules] = useState<CallSchedule[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      // Mock data
      const mockSchedules: CallSchedule[] = [
        {
          id: '1',
          phone: '+971501234567',
          schedule: 'Every Tuesday at 09:00 Dubai time',
          contentType: 'market_update',
          language: 'en',
          active: true,
          nextCall: '2026-02-18T09:00:00+04:00',
          lastCall: '2026-02-11T09:00:00+04:00',
          totalCalls: 12,
        },
      ];

      setSchedules(mockSchedules);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
      setLoading(false);
    }
  };

  const toggleSchedule = async (id: string) => {
    setSchedules(prev =>
      prev.map(s => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const deleteSchedule = async (id: string) => {
    if (!confirm('Are you sure you want to delete this schedule?')) return;
    setSchedules(prev => prev.filter(s => s.id !== id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading schedules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Voice Agent</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Schedule AI-powered voice calls for market updates and portfolio reviews
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <PlusIcon className="w-4 h-4" />
          Schedule Call
        </button>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <PhoneIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">Two-Way Calls</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Have natural conversations with AI. Ask questions and get real-time answers.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <CalendarIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">Flexible Scheduling</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Natural language scheduling: "Every Tuesday at 9 AM" or "Daily before market open"
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <ClockIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">Call History</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Review transcripts and insights from all previous calls
          </p>
        </div>
      </div>

      {/* Active Schedules */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Active Schedules</h2>
        {schedules.filter(s => s.active).length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">
            No active schedules. Create one to get started.
          </p>
        ) : (
          <div className="space-y-4">
            {schedules.filter(s => s.active).map(schedule => (
              <ScheduleCard
                key={schedule.id}
                schedule={schedule}
                onToggle={toggleSchedule}
                onDelete={deleteSchedule}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Schedule Modal */}
      {showCreateModal && (
        <CreateScheduleModal
          onClose={() => setShowCreateModal(false)}
          onSave={(schedule) => {
            setSchedules(prev => [...prev, { ...schedule, id: Date.now().toString(), totalCalls: 0 }]);
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
}

function ScheduleCard({
  schedule,
  onToggle,
  onDelete,
}: {
  schedule: CallSchedule;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <PhoneIcon className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-900 dark:text-white">{schedule.phone}</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{schedule.schedule}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Content:</span>
              <span className="ml-2 text-gray-900 dark:text-white capitalize">{schedule.contentType.replace('_', ' ')}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Language:</span>
              <span className="ml-2 text-gray-900 dark:text-white uppercase">{schedule.language}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Next Call:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {new Date(schedule.nextCall).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Total Calls:</span>
              <span className="ml-2 text-gray-900 dark:text-white">{schedule.totalCalls}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggle(schedule.id)}
            className={`p-2 rounded-lg ${
              schedule.active
                ? 'bg-green-100 dark:bg-green-900 text-green-600'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600'
            }`}
          >
            {schedule.active ? <CheckCircleIcon className="w-5 h-5" /> : <XCircleIcon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => onDelete(schedule.id)}
            className="p-2 bg-red-100 dark:bg-red-900 text-red-600 rounded-lg hover:bg-red-200 dark:hover:bg-red-800"
          >
            <XCircleIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function CreateScheduleModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (schedule: Omit<CallSchedule, 'id' | 'totalCalls'>) => void;
}) {
  const [formData, setFormData] = useState({
    phone: '',
    schedule: '',
    contentType: 'market_update' as CallSchedule['contentType'],
    language: 'en' as CallSchedule['language'],
    active: true,
    nextCall: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Schedule Voice Call</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="+971501234567"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Schedule (Natural Language)
              </label>
              <input
                type="text"
                value={formData.schedule}
                onChange={(e) => setFormData(prev => ({ ...prev, schedule: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="e.g., Every Tuesday at 9 AM Dubai time"
                required
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Examples: "Daily at 8 AM", "Every Monday and Friday at 5 PM", "Weekdays at 9:30 AM"
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content Type
              </label>
              <select
                value={formData.contentType}
                onChange={(e) => setFormData(prev => ({ ...prev, contentType: e.target.value as CallSchedule['contentType'] }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="market_update">Market Update</option>
                <option value="portfolio_review">Portfolio Review</option>
                <option value="custom">Custom Content</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Language
              </label>
              <select
                value={formData.language}
                onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value as CallSchedule['language'] }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Activate schedule immediately
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Schedule Call
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
