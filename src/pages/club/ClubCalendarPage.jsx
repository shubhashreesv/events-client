import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
  Clock,
  Plus,
  Filter,
  Eye,
  Edit,
  ExternalLink
} from 'lucide-react';

const ClubCalendarPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState('month');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Dummy events data matching the schema
  const dummyEvents = [
    {
      _id: "1",
      title: "Tech Symposium 2024",
      description: "Annual technology conference featuring the latest innovations in AI, Web Development, and Robotics",
      date: new Date("2024-03-15T10:00:00.000Z"),
      time: "10:00 AM - 5:00 PM",
      venue: "Main Auditorium",
      eventType: "super",
      tags: ["technology", "ai", "conference", "innovation"],
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
      description: "Hands-on workshop on modern web technologies including React, Node.js, and MongoDB",
      date: new Date("2024-03-20T14:00:00.000Z"),
      time: "2:00 PM - 6:00 PM",
      venue: "Computer Lab 101",
      eventType: "single",
      tags: ["web development", "react", "workshop", "javascript"],
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
      description: "24-hour AI and ML hackathon with industry mentors and exciting prizes",
      date: new Date("2024-03-25T09:00:00.000Z"),
      time: "9:00 AM (24 hours)",
      venue: "Innovation Center",
      eventType: "super",
      tags: ["ai", "hackathon", "machine learning", "coding"],
      posters: ["https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400"],
      views: 312,
      participantsCount: 89,
      formLink: "https://forms.gle/example3",
      createdBy: "65a1b2c3d4e5f67890123456",
      createdAt: new Date("2024-01-20T00:00:00.000Z")
    },
    {
      _id: "4",
      title: "Robotics Workshop",
      description: "Learn robotics fundamentals with hands-on experience building and programming robots",
      date: new Date("2024-04-05T11:00:00.000Z"),
      time: "11:00 AM - 4:00 PM",
      venue: "Electronics Lab",
      eventType: "single",
      tags: ["robotics", "workshop", "hardware", "programming"],
      posters: ["https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400"],
      views: 134,
      participantsCount: 32,
      formLink: "https://forms.gle/example4",
      createdBy: "65a1b2c3d4e5f67890123456",
      createdAt: new Date("2024-02-01T00:00:00.000Z")
    },
    {
      _id: "5",
      title: "Tech Symposium - Opening Ceremony",
      description: "Opening ceremony for the Tech Symposium with keynote speakers",
      date: new Date("2024-03-15T09:00:00.000Z"),
      time: "9:00 AM - 10:00 AM",
      venue: "Main Auditorium",
      eventType: "sub",
      parentEvent: "1",
      tags: ["opening", "keynote", "ceremony"],
      posters: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400"],
      views: 178,
      participantsCount: 156,
      formLink: "https://forms.gle/example1",
      createdBy: "65a1b2c3d4e5f67890123456",
      createdAt: new Date("2024-01-12T00:00:00.000Z")
    }
  ];

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, eventTypeFilter]);

  const loadEvents = async () => {
    setLoading(true);
    try {
      // Simulate API call - in real app, this would be an API call to get club events
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

    if (eventTypeFilter !== 'all') {
      filtered = filtered.filter(event => event.eventType === eventTypeFilter);
    }

    setFilteredEvents(filtered);
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + direction);
    } else {
      newDate.setDate(newDate.getDate() + (direction * 7));
    }
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
        isToday: false
      });
    }

    // Current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(year, month, i);
      days.push({
        date: dayDate,
        isCurrentMonth: true,
        isToday: dayDate.toDateString() === today.toDateString()
      });
    }

    // Next month days
    const totalCells = 42; // 6 weeks
    const nextMonthDays = totalCells - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        isToday: false
      });
    }

    return days;
  };

  const getEventsForDate = (date) => {
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const getEventTypeColor = (eventType) => {
    switch (eventType) {
      case 'super': return 'bg-purple-500';
      case 'sub': return 'bg-orange-500';
      case 'single': return 'bg-blue-500';
      default: return 'bg-gray-500';
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

  const handleEventClick = (eventId) => {
    navigate(`/club/events/${eventId}`);
  };

  const handleEditEvent = (eventId, e) => {
    e.stopPropagation();
    navigate(`/club/edit-event/${eventId}`);
  };

  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const upcomingEvents = filteredEvents
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading calendar...</p>
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
            <h1 className="text-4xl font-bold text-gray-900">Event Calendar</h1>
            <p className="text-xl text-gray-600 mt-2">Track your event timeline and schedule</p>
          </div>
          <button
            onClick={() => navigate('/club/create-event')}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>New Event</span>
          </button>
        </div>

        {/* Calendar Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-900">{monthName}</h2>
              <div className="flex space-x-1">
                <button
                  onClick={() => navigateDate(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={() => navigateDate(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={eventTypeFilter}
                onChange={(e) => setEventTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Event Types</option>
                <option value="single">Single Events</option>
                <option value="super">Main Events</option>
                <option value="sub">Sub Events</option>
              </select>

              <div className="flex space-x-2">
                <button
                  onClick={() => setView('month')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    view === 'month' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setView('week')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    view === 'week' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Week
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {weekdays.map(day => (
                  <div key={day} className="text-center text-sm font-semibold text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  const dayEvents = getEventsForDate(day.date);
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedDate(day.date)}
                      className={`
                        min-h-32 p-2 border rounded-lg cursor-pointer transition-all duration-200
                        ${day.isCurrentMonth 
                          ? 'bg-white hover:bg-gray-50 border-gray-200' 
                          : 'bg-gray-50 text-gray-400 border-gray-100'
                        }
                        ${day.isToday ? 'border-blue-500 border-2' : ''}
                        ${selectedDate?.toDateString() === day.date.toDateString() 
                          ? 'ring-2 ring-blue-500 bg-blue-50' 
                          : ''
                        }
                      `}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className={`
                          text-sm font-medium
                          ${day.isToday ? 'bg-blue-600 text-white px-2 py-1 rounded-full' : ''}
                        `}>
                          {day.date.getDate()}
                        </span>
                        {dayEvents.length > 0 && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                            {dayEvents.length}
                          </span>
                        )}
                      </div>

                      {/* Events for the day */}
                      <div className="space-y-1">
                        {dayEvents.slice(0, 3).map(event => (
                          <div
                            key={event._id}
                            className={`
                              text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity text-white
                              ${getEventTypeColor(event.eventType)}
                            `}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEventClick(event._id);
                            }}
                          >
                            <div className="flex items-center">
                              <span className="truncate">{event.title}</span>
                            </div>
                          </div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-xs text-gray-500 text-center">
                            +{dayEvents.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Date Events */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
                {selectedDate ? selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric'
                }) : 'Select a Date'}
              </h3>

              {selectedDate ? (
                <div className="space-y-4">
                  {getEventsForDate(selectedDate).length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No events scheduled</p>
                  ) : (
                    getEventsForDate(selectedDate).map(event => (
                      <div
                        key={event._id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleEventClick(event._id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 truncate">{event.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full text-white ${getEventTypeColor(event.eventType)}`}>
                            {getEventTypeDisplay(event.eventType)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-2" />
                            {event.time}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-2" />
                            {event.venue}
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-2" />
                              {event.participantsCount} participants
                            </div>
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {event.views}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                          <button
                            onClick={(e) => handleEditEvent(event._id, e)}
                            className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </button>
                          {event.formLink && (
                            <a
                              href={event.formLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center text-sm text-green-600 hover:text-green-700"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Form
                            </a>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">Click on a date to view events</p>
              )}
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                {upcomingEvents.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No upcoming events</p>
                ) : (
                  upcomingEvents.map(event => (
                    <div
                      key={event._id}
                      className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleEventClick(event._id)}
                    >
                      <div className={`w-3 h-12 rounded-full ${getEventTypeColor(event.eventType)}`}></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate text-sm">{event.title}</h4>
                        <p className="text-xs text-gray-500">
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric'
                          })} • {event.time}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Event Type Legend */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Event Types</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-500 rounded mr-3"></div>
                  <span className="text-sm text-gray-700">Main Events (Super)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                  <span className="text-sm text-gray-700">Single Events</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-orange-500 rounded mr-3"></div>
                  <span className="text-sm text-gray-700">Sub Events</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubCalendarPage;