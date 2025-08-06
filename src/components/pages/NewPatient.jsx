import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { patientService } from "@/services/api/patientService";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import PatientForm from "@/components/molecules/PatientForm";
import Button from "@/components/atoms/Button";

const NewPatient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/patients");
  };

  const handleSubmit = async (patientData) => {
    setIsLoading(true);
    try {
      const newPatient = await patientService.create(patientData);
      toast.success(`Patient ${newPatient.firstName} ${newPatient.lastName} created successfully!`);
      navigate("/patients");
    } catch (error) {
      console.error("Error creating patient:", error);
      toast.error("Failed to create patient. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/patients");
  };

  return (
    <div className="min-h-screen">
      <Header
        title="New Patient"
        subtitle="Add a new patient to your practice"
        actions={
          <Button 
            variant="secondary" 
            icon="ArrowLeft"
            onClick={handleBack}
          >
            Back to Patients
          </Button>
        }
      />
      
      <div className="p-6">
        <PatientForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default NewPatient;