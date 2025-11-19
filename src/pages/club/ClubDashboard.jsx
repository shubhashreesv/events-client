import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Users,
  Eye,
  Plus,
  Edit,
  BarChart3,
  Clock,
  MapPin,
  Tag,
  ArrowRight,
  Building,
  Mail,
  Phone,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import axios from 'axios';

const ClubDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [clubInfo, setClubInfo] = useState(null);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    pastEvents: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const token = user?.token;
      
      // Get user's club
      const clubRes = await axios.get('http://localhost:5000/api/clubs/my/clubs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (clubRes.data.length === 0) {
        alert('You need to create a club first!');
        navigate('/club/create-club');
        return;
      }

      const userClub = clubRes.data[0];
      setClubInfo(userClub);

      // Get club events
      const eventsRes = await axios.get(`http://localhost:5000/api/events/club/${userClub._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const clubEvents = eventsRes.data.events || [];
      setEvents(clubEvents);
      
      // Calculate stats - removed participants and views
      const currentDate = new Date();
      const upcomingEvents = clubEvents.filter(event => new Date(event.date) >= currentDate);
      const pastEvents = clubEvents.filter(event => new Date(event.date) < currentDate);
      
      setStats({
        totalEvents: clubEvents.length,
        upcomingEvents: upcomingEvents.length,
        pastEvents: pastEvents.length
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      alert(error.response?.data?.message || 'Failed to load dashboard data. Please try again.');
      setLoading(false);
    }
  };

  const getEventTypeColor = (eventType) => {
    switch (eventType) {
      case 'super': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'sub': return 'bg-gradient-to-r from-orange-500 to-red-500 text-white';
      case 'single': return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-700 text-white';
    }
  };

  const getEventTypeDisplay = (eventType) => {
    switch (eventType) {
      case 'super': return 'Main Event';
      case 'sub': return 'Sub Event';
      case 'single': return 'Single Event';
      default: return eventType;
    }
  };

  const getEventStatus = (eventDate) => {
    const currentDate = new Date();
    return new Date(eventDate) >= currentDate ? 'upcoming' : 'past';
  };

  const getStatusColor = (status) => {
    return status === 'upcoming' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-gray-100 text-gray-800 border border-gray-200';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Club Dashboard
              </h1>
              <p className="text-xl text-gray-600 mt-2">Manage your events and track performance</p>
            </div>
            <button
              onClick={() => navigate('/club/create-event')}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg shadow-blue-500/25"
            >
              <Plus className="w-5 h-5" />
              <span>Create Event</span>
            </button>
          </div>
        </div>

        {/* Club Info Card */}
        {clubInfo && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-gray-200/50 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start space-x-6">
              {clubInfo.logoUrl ? (
                <div className="relative">
                  <img
                    src={clubInfo.logoUrl}
                    alt={clubInfo.name}
                    className="w-20 h-20 rounded-2xl object-cover shadow-lg border border-gray-200"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Building className="w-8 h-8 text-white" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
                      {clubInfo.name}
                    </h2>
                    <p className="text-gray-600 mt-2 leading-relaxed">{clubInfo.description}</p>
                  </div>
                  <button
                    onClick={() => navigate('/club/profile')}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-all duration-200"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>
                
                {/* Contact Info */}
                {clubInfo.contactInfo && clubInfo.contactInfo.length > 0 && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {clubInfo.contactInfo.map((contact, index) => (
                      <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200/50 hover:border-blue-200 transition-all duration-200">
                        <p className="font-semibold text-gray-900">{contact.name}</p>
                        <p className="text-sm text-blue-600 font-medium">{contact.role}</p>
                        <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{contact.email}</span>
                        </div>
                        {contact.phone && (
                          <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                            <Phone className="w-4 h-4" />
                            <span>{contact.phone}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid - Removed participants and views */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalEvents}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">All time</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl group-hover:scale-110 transition-transform duration-200">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                <p className="text-3xl font-bold text-gray-900">{stats.upcomingEvents}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-orange-600 font-medium">Scheduled</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-xl group-hover:scale-110 transition-transform duration-200">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Past Events</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pastEvents}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 font-medium">Completed</span>
                </div>
              </div>
              <div className="p-3 bg-gray-100 rounded-xl group-hover:scale-110 transition-transform duration-200">
                <Calendar className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Events Grid - Card Layout */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Recent Events</h3>
                </div>
                <button
                  onClick={() => navigate('/club/events/manage')}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-all duration-200 group"
                >
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.slice(0, 4).map((event) => (
                  <div
                    key={event._id}
                    className="bg-white rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => navigate('/club/events/manage')}
                  >
                    {/* Event Image */}
                    <div className="relative h-32 overflow-hidden">
                      {event.posters && event.posters.length > 0 ? (
                        <img
                          src={event.posters[0]}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <Calendar className="w-8 h-8 text-blue-600" />
                        </div>
                      )}
                      
                      {/* Status Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`inline-flex text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(getEventStatus(event.date))}`}>
                          {getEventStatus(event.date)}
                        </span>
                      </div>
                      
                      {/* Event Type Badge */}
                      <div className="absolute top-3 right-3">
                        <span className={`inline-flex text-xs px-2 py-1 rounded-full font-medium ${getEventTypeColor(event.eventType)}`}>
                          {getEventTypeDisplay(event.eventType)}
                        </span>
                      </div>
                    </div>

                    {/* Event Content */}
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                        {event.description}
                      </p>

                      {/* Date and Time */}
                      <div className="flex items-center text-xs text-gray-700 mb-2">
                        <Calendar className="w-3 h-3 mr-1 text-gray-400 flex-shrink-0" />
                        <span className="font-medium">{formatDate(event.date)}</span>
                        {event.time && (
                          <span className="ml-1 text-gray-500">• {formatTime(event.time)}</span>
                        )}
                      </div>

                      {/* Venue */}
                      <div className="flex items-center text-xs text-gray-700 mb-3">
                        <MapPin className="w-3 h-3 mr-1 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{event.venue}</span>
                      </div>

                      {/* Tags */}
                      {event.tags && event.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {event.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                            >
                              <Tag className="w-2 h-2 mr-1" />
                              {tag}
                            </span>
                          ))}
                          {event.tags.length > 2 && (
                            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                              +{event.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {events.length === 0 && (
                  <div className="col-span-2 text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl border-2 border-dashed border-gray-300">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">No events yet</h4>
                    <p className="text-gray-600 mb-4">Start by creating your first event</p>
                    <button
                      onClick={() => navigate('/club/create-event')}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg shadow-blue-500/25"
                    >
                      Create First Event
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions & Analytics */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200/50">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/club/create-event')}
                  className="w-full flex items-center space-x-3 p-4 text-left bg-gradient-to-r from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200/50 rounded-xl transition-all duration-200 border border-blue-200/50 hover:border-blue-300 group"
                >
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:scale-110 transition-transform">
                    <Plus className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Create New Event</p>
                    <p className="text-sm text-gray-600">Set up a new event</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button
                  onClick={() => navigate(`/club/events/edit/${event._id}`)}
                  className="w-full flex items-center space-x-3 p-4 text-left bg-gradient-to-r from-green-50 to-green-100/50 hover:from-green-100 hover:to-green-200/50 rounded-xl transition-all duration-200 border border-green-200/50 hover:border-green-300 group"
                >
                  <div className="p-2 bg-green-100 rounded-lg group-hover:scale-110 transition-transform">
                    <Edit className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Manage Events</p>
                    <p className="text-sm text-gray-600">View and edit all events</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button
                  onClick={() => navigate('/club/profile')}
                  className="w-full flex items-center space-x-3 p-4 text-left bg-gradient-to-r from-purple-50 to-purple-100/50 hover:from-purple-100 hover:to-purple-200/50 rounded-xl transition-all duration-200 border border-purple-200/50 hover:border-purple-300 group"
                >
                  <div className="p-2 bg-purple-100 rounded-lg group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Club Profile</p>
                    <p className="text-sm text-gray-600">Update club information</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>

            {/* Event Tags Summary */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200/50">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Tag className="w-5 h-5 mr-2 text-blue-600" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(events.flatMap(event => event.tags || []))).slice(0, 8).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-sm hover:from-gray-200 hover:to-gray-300 transition-all duration-200 cursor-default border border-gray-300/50 hover:border-gray-400/50"
                  >
                    #{tag}
                  </span>
                ))}
                {events.flatMap(event => event.tags || []).length === 0 && (
                  <div className="text-center w-full py-4">
                    <Tag className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No tags yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Upcoming Events Summary */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200/50">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-green-600" />
                Next Event
              </h3>
              {events.filter(event => new Date(event.date) >= new Date()).length > 0 ? (
                <div className="space-y-2">
                  {events
                    .filter(event => new Date(event.date) >= new Date())
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .slice(0, 1)
                    .map(event => (
                      <div key={event._id} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200/50 hover:border-green-300 transition-all duration-200 group">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">{event.title}</h4>
                          <div className={`text-xs px-2 py-1 rounded-full font-medium ${getEventTypeColor(event.eventType)}`}>
                            {getEventTypeDisplay(event.eventType)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {formatDate(event.date)} • {formatTime(event.time)}
                        </p>
                        <p className="text-sm text-gray-500 truncate mb-3">{event.venue}</p>
                        <button
                          onClick={() => navigate(`/club/edit-event/${event._id}`)}
                          className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all duration-200 font-medium group"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-green-50/30 rounded-xl border-2 border-dashed border-gray-300">
                  <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">No upcoming events</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDashboard;