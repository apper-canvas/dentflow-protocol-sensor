import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { patientService } from "@/services/api/patientService";
import PatientCard from "@/components/molecules/PatientCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const PatientList = ({ searchQuery = "" }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data;
      if (searchQuery.trim()) {
        data = await patientService.search(searchQuery);
      } else {
        data = await patientService.getAll();
      }
      
      setPatients(data);
    } catch (err) {
      setError(err.message || "Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, [searchQuery]);

  const handlePatientClick = (patient) => {
    navigate(`/patients/${patient.Id}`);
  };

  if (loading) {
    return <Loading variant="grid" className="mt-6" />;
  }

  if (error) {
    return (
      <Error 
        message={error}
        onRetry={loadPatients}
        className="mt-6"
      />
    );
  }

  if (patients.length === 0) {
    return (
      <Empty
        icon="Users"
        title={searchQuery ? "No patients found" : "No patients yet"}
        message={searchQuery ? "Try adjusting your search terms." : "Get started by adding your first patient."}
        actionLabel={!searchQuery ? "Add Patient" : undefined}
        onAction={!searchQuery ? () => navigate("/patients/new") : undefined}
        className="mt-6"
      />
    );
  }

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <PatientCard
            key={patient.Id}
            patient={patient}
            onClick={handlePatientClick}
            className="animate-fade-in"
          />
        ))}
      </div>
    </div>
  );
};

export default PatientList;