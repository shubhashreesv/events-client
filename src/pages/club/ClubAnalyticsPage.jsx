import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BarChart3,
  Users,
  Eye,
  Calendar,
  Download,
  Filter,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const ClubAnalyticsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [timeRange, setTimeRange] = useState('30days');
  const [analytics, setAnalytics] = useState(null);

  // Dummy events for filter
  const dummyEvents = [
    { _id: 'all', title: 'All Events' },
    { _id: '1', title: 'Tech Symposium 2024' },
    { _id: '2', title: 'Web Development Workshop' },
    { _id: '3', title: 'AI Hackathon 2024' }
  ];

  // Dummy analytics data
  const dummyAnalytics = {
    overview: {
      totalEvents: 12,
      totalParticipants: 892,
      totalViews: 2456,
      averageParticipation: 74.3,
      participationGrowth: 15.2
    },
    eventPerformance: [
      {
        eventId: '1',
        title: 'Tech Symposium 2024',
        participants: 156,
        views: 245,
        conversionRate: 63.7,
        trend: 'up'
      },
      {
        eventId: '2',
        title: 'Web Development Workshop',
        participants: 45,
        views: 189,
        conversionRate: 23.8,
        trend: 'down'
      },
      {
        eventId: '3',
        title: 'AI Hackathon 2024',
        participants: 89,
        views: 312,
        conversionRate: 28.5,
        trend: 'up'
      }
    ],
    participationTrend: [
      { month: 'Jan', participants: 120, events: 2 },
      { month: 'Feb', participants: 245, events: 3 },
      { month: 'Mar', participants: 189, events: 2 },
      { month: 'Apr', participants: 312, events: 4 },
      { month: 'May', participants: 276, events: 3 }
    ],
    formResponses: [
      { question: 'Year of Study', data: { 'I Year': 25, 'II Year': 40, 'III Year': 20, 'IV Year': 15 } },
      { question: 'Department', data: { 'CSE': 45, 'IT': 25, 'ECE': 15, 'EEE': 10, 'Others': 5 } },
      { question: 'Interest Level', data: { 'Very Interested': 60, 'Interested': 25, 'Neutral': 10, 'Not Interested': 5 } }
    ]
  };

  useEffect(() => {
    loadAnalytics();
  }, [selectedEvent, timeRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      // Simulate API call with filters
      setTimeout(() => {
        setAnalytics(dummyAnalytics);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error loading analytics:', error);
      setLoading(false);
    }
  };

  const exportData = (format) => {
    console.log(`Exporting data in ${format} format`);
    // In real app, this would generate and download a file
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <button
        onClick={() => navigate('/club/dashboard')}
        className="fixed top-6 left-6 z-50 p-3 bg-white/90 hover:bg-white text-gray-700 hover:text-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
        title="Back to Dashboard"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Event Analytics</h1>
            <p className="text-xl text-gray-600 mt-2">Insights from form responses and participation</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {dummyEvents.map(event => (
                <option key={event._id} value={event._id}>{event.title}</option>
              ))}
            </select>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="1year">Last year</option>
            </select>
            <button
              onClick={() => exportData('csv')}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.totalEvents}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Participants</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.totalParticipants}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.totalViews}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Participation</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.averageParticipation}%</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Growth</p>
                <div className="flex items-center space-x-1">
                  <p className="text-2xl font-bold text-gray-900">{analytics.overview.participationGrowth}%</p>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Performance */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Event Performance</h3>
              
              <div className="space-y-4">
                {analytics.eventPerformance.map((event) => (
                  <div key={event.eventId} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{event.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          event.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {event.trend === 'up' ? <TrendingUp className="w-4 h-4 inline" /> : <TrendingDown className="w-4 h-4 inline" />}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Participants</p>
                        <p className="font-semibold text-gray-900">{event.participants}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Views</p>
                        <p className="font-semibold text-gray-900">{event.views}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Conversion</p>
                        <p className="font-semibold text-gray-900">{event.conversionRate}%</p>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${event.conversionRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Response Analytics */}
          <div className="space-y-6">
            {/* Participation Trend */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Participation Trend</h3>
              <div className="space-y-3">
                {analytics.participationTrend.map((month, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{month.month}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium">{month.participants} participants</span>
                      <span className="text-xs text-gray-500">{month.events} events</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Breakdown */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Response Breakdown</h3>
              <div className="space-y-4">
                {analytics.formResponses.map((response, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">{response.question}</h4>
                    <div className="space-y-2">
                      {Object.entries(response.data).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">{key}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${value}%` }}
                              ></div>
                            </div>
                            <span className="font-medium w-8">{value}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Department Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Department Distribution</h3>
            <div className="space-y-3">
              {[
                { department: 'CSE', percentage: 45, color: 'bg-blue-500' },
                { department: 'IT', percentage: 25, color: 'bg-green-500' },
                { department: 'ECE', percentage: 15, color: 'bg-purple-500' },
                { department: 'EEE', percentage: 10, color: 'bg-orange-500' },
                { department: 'Others', percentage: 5, color: 'bg-gray-500' }
              ].map((dept, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{dept.department}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${dept.color}`}
                        style={{ width: `${dept.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-8">{dept.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Year-wise Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Year-wise Participation</h3>
            <div className="space-y-3">
              {[
                { year: 'I Year', percentage: 25, count: 223 },
                { year: 'II Year', percentage: 40, count: 357 },
                { year: 'III Year', percentage: 20, count: 178 },
                { year: 'IV Year', percentage: 15, count: 134 }
              ].map((year, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{year.year}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full"
                        style={{ width: `${year.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">
                      {year.percentage}% ({year.count})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubAnalyticsPage;