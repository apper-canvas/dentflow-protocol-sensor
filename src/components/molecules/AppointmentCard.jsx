import { format } from "date-fns";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const AppointmentCard = ({ 
  appointment, 
  patient,
  onClick,
  onStatusChange,
  className,
  ...props 
}) => {
const formatTime = (dateTime) => {
    if (!dateTime) return "N/A";
    return format(new Date(dateTime), "h:mm a");
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
    }
    return `${mins}m`;
  };

  const getStatusVariant = (status) => {
    const variants = {
      confirmed: "success",
      pending: "warning", 
      cancelled: "error",
      completed: "primary",
      "no-show": "error"
    };
    return variants[status] || "default";
  };

  const getStatusIcon = (status) => {
    const icons = {
      confirmed: "CheckCircle",
      pending: "Clock",
      cancelled: "XCircle",
      completed: "Check",
      "no-show": "AlertCircle"
    };
    return icons[status] || "Circle";
  };

  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return "?";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Card
    hover
    onClick={() => onClick && onClick(appointment)}
    className={cn("p-4", className)}
    {...props}>
    <div className="flex items-start space-x-4">
        <div className="flex flex-col items-center">
            <div className="text-sm font-medium text-gray-600">
                {formatTime(appointment.dateTime_c || appointment.dateTime)}
            </div>
            <div className="text-xs text-gray-400 mt-1">
                {formatDuration(appointment.duration_c || appointment.duration)}
            </div>
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                    {patient && <div
                        className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {getInitials(
                            patient.firstName_c || patient.firstName,
                            patient.lastName_c || patient.lastName
                        )}
                    </div>}
                    <div>
                        <h4 className="font-medium text-gray-900">
                            {patient ? `${patient.firstName_c || patient.firstName} ${patient.lastName_c || patient.lastName}` : `Patient ID: ${appointment.patientId_c || appointment.patientId}`}
                        </h4>
                        <p className="text-sm text-gray-600">{appointment.type_c || appointment.type}</p>
                    </div>
                </div>
                <Badge variant={getStatusVariant(appointment.status_c || appointment.status)}>
                    <ApperIcon
                        name={getStatusIcon(appointment.status_c || appointment.status)}
                        className="w-3 h-3 mr-1" />
                    {(appointment.status_c || appointment.status).charAt(0).toUpperCase() + (appointment.status_c || appointment.status).slice(1)}
                </Badge>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center">
                    <div className="flex items-center">
                        <ApperIcon name="User" className="w-4 h-4 mr-2 text-gray-400" />
                        {appointment.provider_c || appointment.provider}
                    </div>
                    <div className="flex items-center">
                        <ApperIcon name="MapPin" className="w-4 h-4 mr-2 text-gray-400" />
                        {appointment.room_c || appointment.room}
                    </div>
                    {(appointment.notes_c || appointment.notes) && <div className="flex items-start mt-2">
                        <ApperIcon name="FileText" className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                        <span className="text-xs text-gray-500">{appointment.notes_c || appointment.notes}</span>
                    </div>}
                </div>
            </div>
        </div>
    </div></Card>
  );
};

export default AppointmentCard;