import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/organisms/Header";
import PatientList from "@/components/organisms/PatientList";
import Button from "@/components/atoms/Button";

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddPatient = () => {
    navigate("/patients/new");
  };

  return (
    <div className="min-h-screen">
      <Header
        title="Patients"
        subtitle="Manage your patient records and information"
        showSearch={true}
        onSearch={handleSearch}
        searchPlaceholder="Search patients by name, phone, or ID..."
        actions={
          <Button 
            variant="primary" 
            icon="UserPlus"
            onClick={handleAddPatient}
          >
            Add Patient
          </Button>
        }
      />
      
      <div className="p-6">
        <PatientList searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Patients;