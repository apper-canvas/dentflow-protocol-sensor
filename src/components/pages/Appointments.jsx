import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import Header from "@/components/organisms/Header";
import AppointmentList from "@/components/organisms/AppointmentList";
import AppointmentScheduleModal from "@/components/molecules/AppointmentScheduleModal";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const Appointments = () => {
const [viewMode, setViewMode] = useState("list");
  const [dateFilter, setDateFilter] = useState("today");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

const handleScheduleAppointment = () => {
    setShowScheduleModal(true);
  };

  const handleAppointmentCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleCloseModal = () => {
    setShowScheduleModal(false);
  };

  const viewModes = [
    { value: "list", label: "List View", icon: "List" },
    { value: "calendar", label: "Calendar View", icon: "Calendar" }
  ];

  const dateFilters = [
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "all", label: "All Appointments" }
  ];

  return (
    <div className="min-h-screen">
      <Header
        title="Appointments"
        subtitle="Schedule and manage patient appointments"
        actions={
          <Button 
            variant="primary" 
            icon="Plus"
            onClick={handleScheduleAppointment}
          >
            Schedule Appointment
          </Button>
        }
      />
      
      <div className="p-6 space-y-6">
        {/* Filter and View Controls */}
        <Card className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Select 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-40"
              >
                {dateFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              {viewModes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => setViewMode(mode.value)}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    viewMode === mode.value
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ApperIcon name={mode.icon} className="w-4 h-4 mr-2" />
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
        </Card>
        
        {/* Appointments Content */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {dateFilter === "today" ? "Today's Appointments" : 
                 dateFilter === "week" ? "This Week's Appointments" :
                 dateFilter === "month" ? "This Month's Appointments" : "All Appointments"}
              </h2>
              <p className="text-sm text-gray-600">
                {dateFilter === "today" ? "View and manage today's scheduled appointments" :
                 "View and manage scheduled appointments"}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
<Button variant="outline" size="sm" icon="Filter" onClick={() => {
                toast.info("Opening appointment filter options");
              }}>
                Filter
              </Button>
<Button variant="outline" size="sm" icon="Download" onClick={() => {
                toast.success("Appointment schedule exported successfully");
              }}>
                Export
              </Button>
            </div>
          </div>
          
<AppointmentList 
            dateFilter={dateFilter === "all" ? undefined : dateFilter}
            key={refreshTrigger}
          />
        </Card>
      </div>

      <AppointmentScheduleModal
        isOpen={showScheduleModal}
        onClose={handleCloseModal}
        onAppointmentCreated={handleAppointmentCreated}
      />
    </div>
  );
};

export default Appointments;