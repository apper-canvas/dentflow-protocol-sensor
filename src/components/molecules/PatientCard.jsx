import { format } from "date-fns";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const PatientCard = ({ 
  patient, 
  onClick,
  className,
  ...props 
}) => {
const getInitials = (firstName, lastName) => {
    const first = firstName || '';
    const last = lastName || '';
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "MMM d, yyyy");
  };

  const getAge = (dateOfBirth) => {
    if (!dateOfBirth) return "N/A";
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

const hasUpcomingAppointment = (patient.nextAppointment_c || patient.nextAppointment) && new Date(patient.nextAppointment_c || patient.nextAppointment) > new Date();

  return (
    <Card
    hover
    onClick={() => onClick && onClick(patient)}
    className={cn("p-6 cursor-pointer", className)}
    {...props}>
    <div className="flex items-start space-x-4">
        <div
            className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
            {getInitials(
                patient.firstName_c || patient.firstName,
                patient.lastName_c || patient.lastName
            )}
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {patient.firstName_c || patient.firstName} {patient.lastName_c || patient.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">Age {getAge(patient.dateOfBirth_c || patient.dateOfBirth)}• ID: {patient.Id}
                    </p>
                </div>
                {hasUpcomingAppointment && <Badge variant="success">
                    <ApperIcon name="Calendar" className="w-3 h-3 mr-1" />Upcoming
                                  </Badge>}
            </div>
            <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                    {patient.phone_c || patient.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <ApperIcon name="Mail" className="w-4 h-4 mr-2 text-gray-400" />
                    {patient.email_c || patient.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <ApperIcon name="Shield" className="w-4 h-4 mr-2 text-gray-400" />
                    {patient.insuranceProvider_c || patient.insuranceProvider}
                </div>
            </div>
        </div>
        {(patient.allergies_c || patient.allergies) && (Array.isArray(patient.allergies_c || patient.allergies) ? (patient.allergies_c || patient.allergies).length > 0 : (patient.allergies_c || patient.allergies).trim() !== "") && <div className="mt-3">
            <div className="flex items-center text-sm text-warning">
                <ApperIcon name="AlertTriangle" className="w-4 h-4 mr-1" />
                <span className="font-medium">Allergies:</span>
                <span className="ml-1">
                    {Array.isArray(patient.allergies_c || patient.allergies) ? (patient.allergies_c || patient.allergies).join(", ") : patient.allergies_c || patient.allergies}
                </span>
            </div>
        </div>}
        <span>Last Visit: {formatDate(patient.lastVisit_c || patient.lastVisit)}</span>
        {hasUpcomingAppointment && <span>Next: {formatDate(patient.nextAppointment_c || patient.nextAppointment)}</span>}
    </div>
</Card>
  );
};

export default PatientCard;