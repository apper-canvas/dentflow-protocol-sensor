import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { patientService } from "@/services/api/patientService";
import { appointmentService } from "@/services/api/appointmentService";
import { treatmentService } from "@/services/api/treatmentService";
import { toast } from "react-toastify";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import AppointmentList from "@/components/organisms/AppointmentList";
import Header from "@/components/organisms/Header";
import TreatmentHistory from "@/components/organisms/TreatmentHistory";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Patients from "@/components/pages/Patients";
import Appointments from "@/components/pages/Appointments";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPatient = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await patientService.getById(id);
      setPatient(data);
    } catch (err) {
      setError(err.message || "Failed to load patient details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadPatient();
    }
  }, [id]);

  const handleBack = () => {
    navigate("/patients");
  };

  const handleEdit = () => {
    navigate(`/patients/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this patient? This action cannot be undone.")) {
      try {
        await patientService.delete(id);
        toast.success("Patient deleted successfully");
        navigate("/patients");
      } catch (err) {
        toast.error("Failed to delete patient");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return format(new Date(dateString), "MMM d, yyyy");
  };

  const getAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const tabs = [
    { key: "overview", label: "Overview", icon: "User" },
    { key: "appointments", label: "Appointments", icon: "Calendar" },
    { key: "treatments", label: "Treatments", icon: "Stethoscope" }
  ];

  if (loading) {
    return <Loading variant="card" className="m-6" />;
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header
          title="Patient Details"
          actions={
            <Button variant="outline" icon="ArrowLeft" onClick={handleBack}>
              Back to Patients
            </Button>
          }
        />
        <div className="p-6">
          <Error message={error} onRetry={loadPatient} />
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen">
        <Header
          title="Patient Details"
          actions={
            <Button variant="outline" icon="ArrowLeft" onClick={handleBack}>
              Back to Patients
            </Button>
          }
        />
        <div className="p-6">
          <Error message="Patient not found" onRetry={loadPatient} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header
title={`${patient.firstName_c || patient.firstName} ${patient.lastName_c || patient.lastName}`}
        subtitle={`Patient ID: ${patient.Id} • Age ${getAge(patient.dateOfBirth_c || patient.dateOfBirth)}`}
        actions={
          <div className="flex space-x-3">
            <Button variant="outline" icon="ArrowLeft" onClick={handleBack}>
              Back
            </Button>
            <Button variant="outline" icon="Edit" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="danger" icon="Trash2" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        }
      />
      
      <div className="p-6 space-y-6">
        {/* Patient Header Card */}
        <Card className="p-6">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
{getInitials(patient.firstName_c || patient.firstName, patient.lastName_c || patient.lastName)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
<h1 className="text-2xl font-bold text-gray-900">
                    {patient.firstName_c || patient.firstName} {patient.lastName_c || patient.lastName}
                  </h1>
                  <p className="text-gray-600">
                    Born {formatDate(patient.dateOfBirth_c || patient.dateOfBirth)} • Age {getAge(patient.dateOfBirth_c || patient.dateOfBirth)}
                  </p>
                </div>
                
<div className="flex space-x-2">
                  {(patient.nextAppointment_c || patient.nextAppointment) && new Date(patient.nextAppointment_c || patient.nextAppointment) > new Date() && (
                    <Badge variant="success">
                      <ApperIcon name="Calendar" className="w-3 h-3 mr-1" />
                      Upcoming Appointment
                    </Badge>
                  )}
                  
{((patient.allergies_c || patient.allergies) && 
                    (Array.isArray(patient.allergies_c || patient.allergies) 
                      ? (patient.allergies_c || patient.allergies).length > 0 
                      : (patient.allergies_c || patient.allergies).trim() !== '')) && (
                    <Badge variant="warning">
                      <ApperIcon name="AlertTriangle" className="w-3 h-3 mr-1" />
                      Has Allergies
                    </Badge>
                  )}
                </div>
              </div>
              
<div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <ApperIcon name="Phone" className="w-4 h-4 mr-2 text-gray-400" />
                      {patient.phone_c || patient.phone}
                    </div>
                    <div className="flex items-center text-sm">
                      <ApperIcon name="Mail" className="w-4 h-4 mr-2 text-gray-400" />
                      {patient.email_c || patient.email}
                    </div>
                    <div className="flex items-start text-sm">
                      <ApperIcon name="MapPin" className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                      <span className="leading-tight">{patient.address_c || patient.address}</span>
                    </div>
                  </div>
                </div>
<div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Insurance</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <ApperIcon name="Shield" className="w-4 h-4 mr-2 text-gray-400" />
                      {patient.insuranceProvider_c || patient.insuranceProvider}
                    </div>
                    <div className="flex items-center text-sm">
                      <ApperIcon name="CreditCard" className="w-4 h-4 mr-2 text-gray-400" />
                      {patient.insuranceId_c || patient.insuranceId}
                    </div>
                  </div>
                </div>
<div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Visit History</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <ApperIcon name="Clock" className="w-4 h-4 mr-2 text-gray-400" />
                      Last: {formatDate(patient.lastVisit_c || patient.lastVisit)}
                    </div>
                    <div className="flex items-center text-sm">
                      <ApperIcon name="Calendar" className="w-4 h-4 mr-2 text-gray-400" />
                      Next: {formatDate(patient.nextAppointment_c || patient.nextAppointment)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Medical Information */}
{(((patient.medicalHistory_c || patient.medicalHistory) && 
            (Array.isArray(patient.medicalHistory_c || patient.medicalHistory) 
              ? (patient.medicalHistory_c || patient.medicalHistory).length > 0 
              : (patient.medicalHistory_c || patient.medicalHistory).trim() !== '')) ||
           ((patient.allergies_c || patient.allergies) && 
            (Array.isArray(patient.allergies_c || patient.allergies) 
              ? (patient.allergies_c || patient.allergies).length > 0 
              : (patient.allergies_c || patient.allergies).trim() !== ''))) && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {((patient.medicalHistory_c || patient.medicalHistory) && 
                (Array.isArray(patient.medicalHistory_c || patient.medicalHistory) 
                  ? (patient.medicalHistory_c || patient.medicalHistory).length > 0 
                  : (patient.medicalHistory_c || patient.medicalHistory).trim() !== '')) && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Medical History</h3>
                  <div className="space-y-2">
                    {(Array.isArray(patient.medicalHistory_c || patient.medicalHistory) 
                      ? (patient.medicalHistory_c || patient.medicalHistory)
                      : (patient.medicalHistory_c || patient.medicalHistory).split(",").map(item => item.trim())
                    ).map((condition, index) => (
                      <Badge key={index} variant="info">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
{((patient.allergies_c || patient.allergies) && 
                (Array.isArray(patient.allergies_c || patient.allergies) 
                  ? (patient.allergies_c || patient.allergies).length > 0 
                  : (patient.allergies_c || patient.allergies).trim() !== '')) && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Allergies</h3>
                  <div className="space-y-2">
                    {(Array.isArray(patient.allergies_c || patient.allergies) 
                      ? (patient.allergies_c || patient.allergies)
                      : (patient.allergies_c || patient.allergies).split(",").map(item => item.trim())
                    ).map((allergy, index) => (
                      <Badge key={index} variant="warning">
                        <ApperIcon name="AlertTriangle" className="w-3 h-3 mr-1" />
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}
        
        {/* Tabs */}
        <div>
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.key
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <ApperIcon name={tab.icon} className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Overview</h3>
                <p className="text-gray-600">
                  Complete patient profile with contact information, insurance details, and medical history.
                  Use the tabs above to view appointments and treatment history.
                </p>
              </Card>
            </div>
          )}
          
          {activeTab === "appointments" && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Appointments</h3>
              <AppointmentList patientId={patient.Id} />
            </Card>
          )}
          
          {activeTab === "treatments" && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Treatment History</h3>
              <TreatmentHistory patientId={patient.Id.toString()} />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;