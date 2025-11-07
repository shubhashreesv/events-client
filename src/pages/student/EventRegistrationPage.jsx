import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ExternalLink,
  CalendarPlus,
  Tag,
  Image as ImageIcon,
  ArrowLeft,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

function EventRegistrationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activePoster, setActivePoster] = useState(0);

  // Dummy event data
  const dummyEvents = [
    {
      _id: "1",
      title: "Tech Symposium 2024",
      description: "Annual technology conference featuring the latest trends in AI, Machine Learning, Web Development, and Cybersecurity. Join us for insightful talks, hands-on workshops, and networking opportunities with industry experts.",
      date: "2024-03-15T10:00:00.000Z",
      time: "10:00 AM - 5:00 PM",
      venue: "Main Auditorium",
      eventType: "super",
      tags: ["technology", "ai", "conference", "workshop"],
      posters: [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
      ],
      views: 245,
      participantsCount: 156,
      formLink: "https://forms.gle/example1"
    },
    {
      _id: "2",
      title: "Web Development Workshop",
      description: "Hands-on workshop covering modern web development technologies including React, Node.js, and MongoDB. Perfect for beginners and intermediate developers looking to enhance their skills.",
      date: "2024-03-20T14:00:00.000Z",
      time: "2:00 PM - 6:00 PM",
      venue: "Computer Lab 101",
      eventType: "single",
      tags: ["web development", "react", "coding", "workshop"],
      posters: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800"
      ],
      views: 189,
      participantsCount: 45,
      formLink: "https://forms.gle/example2"
    },
    {
      _id: "3",
      title: "AI Hackathon 2024",
      description: "24-hour hackathon focused on artificial intelligence and machine learning solutions. Compete with teams to solve real-world problems using AI technologies. Prizes for top 3 teams!",
      date: "2024-03-25T09:00:00.000Z",
      time: "9:00 AM (24 hours)",
      venue: "Innovation Center",
      eventType: "super",
      tags: ["ai", "hackathon", "machine learning", "competition"],
      posters: [
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
        "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=800"
      ],
      views: 312,
      participantsCount: 89,
      formLink: "https://forms.gle/example3"
    },
    {
      _id: "4",
      title: "Robotics Workshop",
      description: "Learn the fundamentals of robotics and automation. Build your own robot and participate in exciting challenges. No prior experience required!",
      date: "2024-04-05T11:00:00.000Z",
      time: "11:00 AM - 4:00 PM",
      venue: "Electronics Lab",
      eventType: "single",
      tags: ["robotics", "automation", "engineering", "workshop"],
      posters: [
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800"
      ],
      views: 134,
      participantsCount: 32,
      formLink: "https://forms.gle/example4"
    },
    {
      _id: "5",
      title: "Data Science Seminar",
      description: "Expert-led seminar on data science trends, tools, and career opportunities. Learn about data analysis, visualization, and machine learning applications.",
      date: "2024-04-12T15:00:00.000Z",
      time: "3:00 PM - 6:00 PM",
      venue: "Seminar Hall A",
      eventType: "single",
      tags: ["data science", "analytics", "career", "seminar"],
      posters: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
      ],
      views: 178,
      participantsCount: 67,
      formLink: "https://forms.gle/example5"
    }
  ];

  useEffect(() => {
    // Check if event was passed via navigation state
    if (location.state?.event) {
      setSelectedEvent(location.state.event);
    } else {
      // Auto-select first event by default
      setSelectedEvent(dummyEvents[0]);
    }
  }, [location]);

  const handleNextEvent = () => {
    const currentIndex = dummyEvents.findIndex(event => event._id === selectedEvent._id);
    const nextIndex = (currentIndex + 1) % dummyEvents.length;
    setSelectedEvent(dummyEvents[nextIndex]);
    setActivePoster(0);
  };

  const handlePrevEvent = () => {
    const currentIndex = dummyEvents.findIndex(event => event._id === selectedEvent._id);
    const prevIndex = (currentIndex - 1 + dummyEvents.length) % dummyEvents.length;
    setSelectedEvent(dummyEvents[prevIndex]);
    setActivePoster(0);
  };

  const nextPoster = () => {
    if (selectedEvent.posters && selectedEvent.posters.length > 1) {
      setActivePoster((prev) => (prev + 1) % selectedEvent.posters.length);
    }
  };

  const prevPoster = () => {
    if (selectedEvent.posters && selectedEvent.posters.length > 1) {
      setActivePoster((prev) => (prev - 1 + selectedEvent.posters.length) % selectedEvent.posters.length);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <button
        onClick={() => navigate('/student/dashboard')}
        className="fixed top-6 left-6 z-50 p-3 bg-white/90 hover:bg-white text-gray-700 hover:text-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
        title="Back to Dashboard"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Event Navigation */}
      {selectedEvent && (
        <div className="fixed top-6 right-6 z-50 flex items-center space-x-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-4 py-2">
            <span className="text-sm font-medium text-gray-700">
              Event {dummyEvents.findIndex(event => event._id === selectedEvent._id) + 1} of {dummyEvents.length}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevEvent}
              className="p-3 bg-white/90 hover:bg-white text-gray-700 hover:text-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
              title="Previous Event"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextEvent}
              className="p-3 bg-white/90 hover:bg-white text-gray-700 hover:text-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
              title="Next Event"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Event Registration</h1>
          <p className="text-xl text-gray-600">Register for exciting college events</p>
        </div>

        {selectedEvent ? (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Event Details */}
            <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Poster Gallery */}
              <div className="relative">
                {selectedEvent.posters?.length > 0 ? (
                  <>
                    <img
                      src={selectedEvent.posters[activePoster]}
                      alt={selectedEvent.title}
                      className="w-full h-96 object-cover"
                    />
                    
                    {/* Poster Navigation */}
                    {selectedEvent.posters.length > 1 && (
                      <>
                        <button
                          onClick={prevPoster}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all duration-200"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextPoster}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all duration-200"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white/80 px-3 py-2 rounded-full shadow-md">
                          {selectedEvent.posters.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActivePoster(idx)}
                              className={`w-3 h-3 rounded-full transition-all ${
                                idx === activePoster
                                  ? "bg-blue-600 scale-125"
                                  : "bg-gray-300 hover:bg-gray-400"
                              }`}
                            ></button>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium capitalize">
                        {selectedEvent.eventType} Event
                      </span>
                      <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full font-medium">
                        👁 {selectedEvent.views || 0} views
                      </span>
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-gray-900 leading-tight">
                      {selectedEvent.title}
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {selectedEvent.description}
                    </p>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {[
                    { icon: Calendar, label: "Event Date", val: new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
                    { icon: Clock, label: "Time", val: selectedEvent.time || "To be announced" },
                    { icon: MapPin, label: "Venue", val: selectedEvent.venue },
                    { icon: Users, label: "Participants", val: `${selectedEvent.participantsCount || 0} registered` },
                  ].map((row) => {
                    const Icon = row.icon;
                    return (
                      <div
                        key={row.label}
                        className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl border border-gray-200"
                      >
                        <div className="flex-shrink-0">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">{row.label}</p>
                          <p className="text-base font-semibold text-gray-900">
                            {row.val}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Tags */}
                {selectedEvent.tags?.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Tag className="w-5 h-5 mr-2 text-blue-600" /> 
                      Event Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors cursor-default"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Registration Panel */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-24 h-fit">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Register Now
                </h2>
                <p className="text-gray-600">
                  Secure your spot for this exciting event
                </p>
              </div>

              {selectedEvent.formLink ? (
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      Registration Form
                    </p>
                    <p className="text-xs text-gray-500">
                      Fill out the form to complete your registration
                    </p>
                  </div>
                  
                  <iframe
                    src={selectedEvent.formLink}
                    className="w-full h-96 rounded-xl border-2 border-gray-200"
                    title="Registration Form"
                  ></iframe>
                  
                  <div className="space-y-3">
                    <a
                      href={selectedEvent.formLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg text-center"
                    >
                      Open Form in New Tab
                    </a>
                    <button
                      onClick={() => navigate('/student/dashboard')}
                      className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold transition-all duration-200 text-center"
                    >
                      Back to Events
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Registration Coming Soon
                  </h3>
                  <p className="text-gray-600 mb-4">
                    The registration form will be available soon. Please check back later.
                  </p>
                  <button
                    onClick={() => navigate('/student/dashboard')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200"
                  >
                    Browse Other Events
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No Event Selected
            </h3>
            <p className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
              Please select an event from the dashboard to view details and register.
            </p>
            <button
              onClick={() => navigate('/student/dashboard')}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventRegistrationPage;