import { useState, useEffect } from "react";
import { treatmentService } from "@/services/api/treatmentService";
import { patientService } from "@/services/api/patientService";
import TreatmentCard from "@/components/molecules/TreatmentCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const TreatmentHistory = ({ patientId, limit }) => {
  const [treatments, setTreatments] = useState([]);
  const [patients, setPatients] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTreatments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let treatmentData;
      
      if (patientId) {
        treatmentData = await treatmentService.getByPatientId(patientId);
      } else if (limit) {
        treatmentData = await treatmentService.getRecentTreatments(limit);
      } else {
        treatmentData = await treatmentService.getAll();
      }
      
      // Sort by date (most recent first)
      treatmentData.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setTreatments(treatmentData);
      
      // Load patient data for treatments if not filtered by patientId
      if (!patientId) {
        const patientIds = [...new Set(treatmentData.map(treatment => treatment.patientId))];
        const patientPromises = patientIds.map(id => patientService.getById(id));
        const patientResults = await Promise.allSettled(patientPromises);
        
        const patientsMap = {};
        patientResults.forEach((result, index) => {
          if (result.status === "fulfilled") {
            patientsMap[patientIds[index]] = result.value;
          }
        });
        
        setPatients(patientsMap);
      }
    } catch (err) {
      setError(err.message || "Failed to load treatment history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTreatments();
  }, [patientId, limit]);
const handleTreatmentClick = (treatment) => {
    const { useNavigate } = require('react-router-dom');
    const navigate = useNavigate();
    navigate(`/patients/${treatment.patientId}`);
  };

  if (loading) {
    return <Loading variant="table" />;
  }

  if (error) {
    return (
      <Error 
        message={error}
        onRetry={loadTreatments}
      />
    );
  }

  if (treatments.length === 0) {
    return (
      <Empty
        icon="Stethoscope"
        title="No treatments found"
        message={patientId ? "No treatment history for this patient." : "No treatments have been recorded yet."}
actionLabel="Add Treatment"
        onAction={() => {
          const { useNavigate } = require('react-router-dom');
          const navigate = useNavigate();
          navigate('/treatments');
        }}
      />
    );
  }

return (
    <div className="space-y-4">
      {treatments.map((treatment, index) => (
        <TreatmentCard
          key={treatment.id || treatment.Id || treatment.treatmentId || `treatment-${index}`}
          treatment={treatment}
          patient={patients[treatment.patientId]}
          onClick={handleTreatmentClick}
          className="animate-fade-in"
        />
      ))}
    </div>
  );
};

export default TreatmentHistory;