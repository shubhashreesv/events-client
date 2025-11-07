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
  Phone
} from 'lucide-react';

const ClubDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [clubInfo, setClubInfo] = useState(null);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalParticipants: 0,
    totalViews: 0
  });
  const [loading, setLoading] = useState(true);

  // Dummy club data
  const dummyClub = {
    _id: "65a1b2c3d4e5f67890123456",
    name: "Computer Society of India - KEC",
    description: "Leading computer science club organizing tech events, workshops, and hackathons for the college community.",
    logoUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200",
    gallery: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400"
    ],
    contactInfo: [
      {
        name: "Dr. Rajesh Kumar",
        role: "Faculty Advisor",
        email: "rajesh.kumar@kec.edu",
        phone: "+91-9876543210",
        position: "Professor, CSE Department"
      },
      {
        name: "Priya Sharma",
        role: "Student President",
        email: "priya.sharma@kec.edu",
        phone: "+91-9876543211",
        position: "Final Year CSE"
      }
    ],
    owner: "65a1b2c3d4e5f67890123459",
    createdAt: new Date("2023-01-15T00:00:00.000Z"),
    updatedAt: new Date("2024-01-20T00:00:00.000Z")
  };

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
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setClubInfo(dummyClub);
        setEvents(dummyEvents);
        
        const currentDate = new Date();
        const upcomingEvents = dummyEvents.filter(event => new Date(event.date) >= currentDate);
        
        setStats({
          totalEvents: dummyEvents.length,
          upcomingEvents: upcomingEvents.length,
          totalParticipants: dummyEvents.reduce((sum, event) => sum + (event.participantsCount || 0), 0),
          totalViews: dummyEvents.reduce((sum, event) => sum + (event.views || 0), 0)
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setLoading(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Club Dashboard</h1>
              <p className="text-xl text-gray-600 mt-2">Manage your events and track performance</p>
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

        {/* Club Info Card */}
        {clubInfo && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
            <div className="flex items-start space-x-6">
              {clubInfo.logoUrl && (
                <img
                  src={clubInfo.logoUrl}
                  alt={clubInfo.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      <Building className="w-6 h-6 mr-2 text-blue-600" />
                      {clubInfo.name}
                    </h2>
                    <p className="text-gray-600 mt-2">{clubInfo.description}</p>
                  </div>
                  <button
                    onClick={() => navigate('/club/profile')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Edit Profile
                  </button>
                </div>
                
                {/* Contact Info */}
                {clubInfo.contactInfo && clubInfo.contactInfo.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {clubInfo.contactInfo.map((contact, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <p className="font-semibold text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-600">{contact.role}</p>
                        <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                          <Mail className="w-4 h-4" />
                          <span>{contact.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Phone className="w-4 h-4" />
                          <span>{contact.phone}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalEvents}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                <p className="text-3xl font-bold text-gray-900">{stats.upcomingEvents}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Participants</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalParticipants}</p>
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
                <p className="text-3xl font-bold text-gray-900">{stats.totalViews}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Eye className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Events */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Recent Events</h3>
                <button
                  onClick={() => navigate('/club/manage-events')}
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {events.slice(0, 5).map((event) => (
                  <div
                    key={event._id}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
                    onClick={() => navigate(`/club/edit-event/${event._id}`)}
                  >
                    <div className="flex items-start space-x-4">
                      {event.posters && event.posters.length > 0 && (
                        <img
                          src={event.posters[0]}
                          alt={event.title}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900 truncate">{event.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${getEventTypeColor(event.eventType)}`}>
                            {getEventTypeDisplay(event.eventType)}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{event.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{event.venue}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{event.participantsCount} participants</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/club/edit-event/${event._id}`);
                        }}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Event"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {events.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No events created yet</p>
                    <button
                      onClick={() => navigate('/club/create-event')}
                      className="mt-3 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Create your first event
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions & Analytics */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/club/create-event')}
                  className="w-full flex items-center space-x-3 p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-200"
                >
                  <Plus className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Create New Event</p>
                    <p className="text-sm text-gray-600">Set up a new event</p>
                  </div>
                </button>
                <button
                  onClick={() => navigate('/club/manage-events')}
                  className="w-full flex items-center space-x-3 p-3 text-left bg-green-50 hover:bg-green-100 rounded-xl transition-colors border border-green-200"
                >
                  <Edit className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Manage Events</p>
                    <p className="text-sm text-gray-600">View and edit all events</p>
                  </div>
                </button>
                <button
                  onClick={() => navigate('/club/analytics')}
                  className="w-full flex items-center space-x-3 p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors border border-purple-200"
                >
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-semibold text-gray-900">View Analytics</p>
                    <p className="text-sm text-gray-600">Event performance insights</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Event Tags Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Tag className="w-5 h-5 mr-2 text-blue-600" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(events.flatMap(event => event.tags || []))).slice(0, 8).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDashboard;