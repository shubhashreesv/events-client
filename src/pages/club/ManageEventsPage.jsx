import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Eye,
  Users,
  Calendar,
  MapPin,
  Search,
  Filter,
  Plus,
  BarChart3
} from 'lucide-react';

const ManageEventsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Dummy events data
  const dummyEvents = [
    {
      _id: "1",
      title: "Tech Symposium 2024",
      description: "Annual technology conference",
      date: new Date("2024-03-15T10:00:00.000Z"),
      time: "10:00 AM - 5:00 PM",
      venue: "Main Auditorium",
      eventType: "super",
      tags: ["technology", "ai", "conference"],
      posters: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400"],
      views: 245,
      participantsCount: 156,
      formLink: "https://forms.gle/example1",
      createdBy: "65a1b2c3d4e5f67890123456",
      createdAt: new Date("2024-01-10T00:00:00.000Z")
    },
    {
      _id: "2",
      title: "Web Development Workshop",
      description: "Hands-on workshop on modern web technologies",
      date: new Date("2024-03-20T14:00:00.000Z"),
      time: "2:00 PM - 6:00 PM",
      venue: "Computer Lab 101",
      eventType: "single",
      tags: ["web development", "react", "workshop"],
      posters: ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400"],
      views: 189,
      participantsCount: 45,
      formLink: "https://forms.gle/example2",
      createdBy: "65a1b2c3d4e5f67890123456",
      createdAt: new Date("2024-01-15T00:00:00.000Z")
    },
    {
      _id: "3",
      title: "AI Hackathon 2024",
      description: "24-hour AI and ML hackathon",
      date: new Date("2024-03-25T09:00:00.000Z"),
      time: "9:00 AM (24 hours)",
      venue: "Innovation Center",
      eventType: "super",
      tags: ["ai", "hackathon", "machine learning"],
      posters: ["https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400"],
      views: 312,
      participantsCount: 89,
      formLink: "https://forms.gle/example3",
      createdBy: "65a1b2c3d4e5f67890123456",
      createdAt: new Date("2024-01-20T00:00:00.000Z")
    }
  ];

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, searchQuery, statusFilter, typeFilter]);

  const loadEvents = async () => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setEvents(dummyEvents);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading events:', error);
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      const currentDate = new Date();
      if (statusFilter === 'upcoming') {
        filtered = filtered.filter(event => new Date(event.date) >= currentDate);
      } else if (statusFilter === 'past') {
        filtered = filtered.filter(event => new Date(event.date) < currentDate);
      }
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(event => event.eventType === typeFilter);
    }

    setFilteredEvents(filtered);
  };

  const deleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        // Simulate API call
        setEvents(prev => prev.filter(event => event._id !== eventId));
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const getEventTypeColor = (eventType) => {
    switch (eventType) {
      case 'super': return 'bg-purple-100 text-purple-800';
      case 'sub': return 'bg-orange-100 text-orange-800';
      case 'single': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
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
    return status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
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
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Manage Events</h1>
              <p className="text-xl text-gray-600 mt-2">View and manage all your events</p>
            </div>
            <button
              onClick={() => navigate('/club/create-event')}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Create Event</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{events.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">
                  {events.filter(event => getEventStatus(event.date) === 'upcoming').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Participants</p>
                <p className="text-2xl font-bold text-gray-900">
                  {events.reduce((sum, event) => sum + (event.participantsCount || 0), 0)}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {events.reduce((sum, event) => sum + (event.views || 0), 0)}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Eye className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-w-[140px]"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-w-[140px]"
              >
                <option value="all">All Types</option>
                <option value="single">Single</option>
                <option value="super">Main Event</option>
                <option value="sub">Sub Event</option>
              </select>

              <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 flex items-center font-medium">
                <Filter className="w-5 h-5 mr-2" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No events found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'Try adjusting your search criteria'
                  : "You haven't created any events yet"
                }
              </p>
              {events.length === 0 && (
                <button
                  onClick={() => navigate('/club/create-event')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  Create Your First Event
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Event</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date & Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Venue</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Participants</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Views</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredEvents.map((event) => (
                    <tr key={event._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          {event.posters && event.posters.length > 0 && (
                            <img
                              src={event.posters[0]}
                              alt={event.title}
                              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 truncate">{event.title}</p>
                            <p className="text-sm text-gray-500 truncate">{event.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">{event.time}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-900">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          {event.venue}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex text-xs px-2 py-1 rounded-full font-medium ${getEventTypeColor(event.eventType)}`}>
                          {getEventTypeDisplay(event.eventType)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(getEventStatus(event.date))}`}>
                          {getEventStatus(event.date)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-900">
                          <Users className="w-4 h-4 mr-2 text-gray-400" />
                          {event.participantsCount || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-900">
                          <Eye className="w-4 h-4 mr-2 text-gray-400" />
                          {event.views || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => navigate(`/club/edit-event/${event._id}`)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Event"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => navigate(`/club/analytics/${event._id}`)}
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="View Analytics"
                          >
                            <BarChart3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteEvent(event._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageEventsPage;