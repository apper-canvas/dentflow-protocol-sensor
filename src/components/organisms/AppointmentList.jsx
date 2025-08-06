import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { appointmentService } from "@/services/api/appointmentService";
import { patientService } from "@/services/api/patientService";
import AppointmentCard from "@/components/molecules/AppointmentCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const AppointmentList = ({ dateFilter = "today", limit }) => {
  const navigate = useNavigate();
const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let appointmentData;
      
      if (dateFilter === "today") {
        appointmentData = await appointmentService.getTodaysAppointments();
      } else {
        appointmentData = await appointmentService.getAll();
        
        // Sort by date and time
        appointmentData.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
      }
      
      // Apply limit if specified
      if (limit) {
        appointmentData = appointmentData.slice(0, limit);
      }
      
      setAppointments(appointmentData);
      
      // Load patient data for each appointment
      const patientIds = [...new Set(appointmentData.map(apt => apt.patientId))];
      const patientPromises = patientIds.map(id => patientService.getById(id));
      const patientResults = await Promise.allSettled(patientPromises);
      
      const patientsMap = {};
      patientResults.forEach((result, index) => {
        if (result.status === "fulfilled") {
          patientsMap[patientIds[index]] = result.value;
        }
      });
      
      setPatients(patientsMap);
    } catch (err) {
      setError(err.message || "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [dateFilter, limit]);
const handleAppointmentClick = (appointment) => {
    navigate(`/patients/${appointment.patientId}`);
  };

  if (loading) {
    return <Loading variant="table" />;
  }

  if (error) {
    return (
      <Error 
        message={error}
        onRetry={loadAppointments}
      />
    );
  }

  if (appointments.length === 0) {
    return (
      <Empty
        icon="Calendar"
        title={dateFilter === "today" ? "No appointments today" : "No appointments found"}
        message={dateFilter === "today" ? "Your schedule is clear for today." : "No appointments have been scheduled yet."}
actionLabel="Schedule Appointment"
        onAction={() => setShowModal(true)}
      />
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.Id}
          appointment={appointment}
          patient={patients[appointment.patientId]}
          onClick={handleAppointmentClick}
          className="animate-fade-in"
        />
      ))}
    </div>
  );
};

export default AppointmentList;