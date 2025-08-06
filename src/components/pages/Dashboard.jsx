import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/organisms/Header";
import DashboardStats from "@/components/organisms/DashboardStats";
import AppointmentList from "@/components/organisms/AppointmentList";
import TreatmentHistory from "@/components/organisms/TreatmentHistory";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState("today");

const handleAddPatient = () => {
    navigate('/patients/new');
  };

  const handleScheduleAppointment = () => {
    navigate('/appointments');
  };
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  return (
    <div className="min-h-screen">
      <Header
        title="Dashboard"
        subtitle={`Welcome back! Here's what's happening ${getCurrentDate()}`}
actions={
          <div className="flex space-x-3">
<Button variant="outline" icon="Calendar" onClick={handleScheduleAppointment}>
              Schedule
            </Button>
            <Button variant="primary" icon="UserPlus" onClick={handleAddPatient}>
              Add Patient
            </Button>
          </div>
        }
      />
      
      <div className="p-6 space-y-8">
        {/* Statistics Cards */}
        <section>
          <DashboardStats />
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Appointments */}
          <section>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
                  <p className="text-sm text-gray-600">Appointments for today</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  icon="Calendar"
                >
                  View All
                </Button>
              </div>
              
              <AppointmentList 
                dateFilter="today"
                limit={5}
              />
            </Card>
          </section>
          
          {/* Recent Treatments */}
          <section>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Recent Treatments</h2>
                  <p className="text-sm text-gray-600">Latest procedures completed</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  icon="Stethoscope"
                >
                  View All
                </Button>
              </div>
              
              <TreatmentHistory limit={5} />
            </Card>
          </section>
        </div>
        
        {/* Quick Actions */}
        <section>
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                onClick={handleAddPatient}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-blue-100 rounded-lg flex items-center justify-center">
                    <Button variant="ghost" size="sm" icon="UserPlus" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">New Patient</h3>
                    <p className="text-sm text-gray-600">Add patient record</p>
                  </div>
                </div>
              </div>
              
<div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer" onClick={handleScheduleAppointment}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-success/20 to-green-100 rounded-lg flex items-center justify-center">
                    <Button variant="ghost" size="sm" icon="Calendar" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Schedule Appointment</h3>
                    <p className="text-sm text-gray-600">Book new appointment</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-warning/20 to-yellow-100 rounded-lg flex items-center justify-center">
                    <Button variant="ghost" size="sm" icon="FileText" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Treatment Notes</h3>
                    <p className="text-sm text-gray-600">Add treatment record</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;