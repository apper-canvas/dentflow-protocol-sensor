import { useState } from "react";
import Header from "@/components/organisms/Header";
import TreatmentHistory from "@/components/organisms/TreatmentHistory";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Select from "@/components/atoms/Select";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const Treatments = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("list");

  const handleAddTreatment = () => {
    console.log("Add new treatment");
  };

  const statusFilters = [
    { value: "all", label: "All Treatments" },
    { value: "completed", label: "Completed" },
    { value: "in-progress", label: "In Progress" },
    { value: "planned", label: "Planned" }
  ];

  const commonProcedures = [
    { name: "Teeth Cleaning", count: 45, color: "primary" },
    { name: "Fillings", count: 32, color: "success" },
    { name: "Root Canal", count: 12, color: "warning" },
    { name: "Crown", count: 8, color: "info" },
    { name: "Extraction", count: 6, color: "error" }
  ];

  return (
    <div className="min-h-screen">
      <Header
        title="Treatments"
        subtitle="Track procedures and treatment history"
        actions={
          <Button 
            variant="primary" 
            icon="Plus"
            onClick={handleAddTreatment}
          >
            Add Treatment
          </Button>
        }
      />
      
      <div className="p-6 space-y-6">
        {/* Treatment Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {commonProcedures.map((procedure) => (
            <Card key={procedure.name} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{procedure.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{procedure.count}</p>
                </div>
                <Badge variant={procedure.color}>
                  <ApperIcon name="Stethoscope" className="w-3 h-3 mr-1" />
                  Total
                </Badge>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Filter Controls */}
        <Card className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-48"
                label="Filter by Status"
              >
                {statusFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" icon="Filter">
                Advanced Filter
              </Button>
              <Button variant="outline" size="sm" icon="Download">
                Export Report
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Treatment History */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Treatment History</h2>
              <p className="text-sm text-gray-600">
                Complete record of all procedures and treatments
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" icon="Search">
                Search
              </Button>
              <Button variant="outline" size="sm" icon="Calendar">
                Date Range
              </Button>
            </div>
          </div>
          
          <TreatmentHistory />
        </Card>
        
        {/* Treatment Planning */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Treatment Planning</h2>
              <p className="text-sm text-gray-600">
                Plan and schedule upcoming treatments
              </p>
            </div>
            
            <Button variant="primary" size="sm" icon="Plus">
              Create Plan
            </Button>
          </div>
          
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 text-center">
            <ApperIcon name="Calendar" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Treatment Plans</h3>
            <p className="text-gray-600 mb-4">
              Create comprehensive treatment plans for your patients
            </p>
            <Button variant="primary" icon="Plus">
              Create First Plan
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Treatments;