import React, { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Header from "@/components/organisms/Header";
import TreatmentHistory from "@/components/organisms/TreatmentHistory";
import TreatmentPlanBuilder from "@/components/organisms/TreatmentPlanBuilder";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import Card from "@/components/atoms/Card";
const Treatments = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("list");
  const [showPlanBuilder, setShowPlanBuilder] = useState(false);
  const handleAddTreatment = () => {
    toast.info("Redirecting to add new treatment form");
    // In a real app, this would navigate to a treatment creation form
  };

  const handleCreatePlan = () => {
    setShowPlanBuilder(true);
    toast.info("Opening treatment plan builder");
  };

  const handleClosePlanBuilder = () => {
    setShowPlanBuilder(false);
  };

  const handleAdvancedFilter = () => {
    toast.info("Opening advanced filter options");
  };

  const handleExportReport = () => {
    toast.success("Treatment report exported successfully");
  };

  const handleSearch = () => {
    toast.info("Opening search functionality");
  };

  const handleDateRange = () => {
    toast.info("Opening date range picker");
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
              <Button variant="outline" size="sm" icon="Filter" onClick={handleAdvancedFilter}>
                Advanced Filter
              </Button>
              <Button variant="outline" size="sm" icon="Download" onClick={handleExportReport}>
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
<Button variant="outline" size="sm" icon="Search" onClick={handleSearch}>
                Search
              </Button>
              <Button variant="outline" size="sm" icon="Calendar" onClick={handleDateRange}>
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
                Build comprehensive treatment plans with cost estimates
              </p>
            </div>
            
            <Button variant="primary" size="sm" icon="Plus" onClick={handleCreatePlan}>
              Create Plan
            </Button>
          </div>
          
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 text-center">
            <ApperIcon name="Calendar" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Treatment Planning</h3>
            <p className="text-gray-600 mb-4">
              Create detailed treatment plans with drag-and-drop interface, cost estimates, and insurance calculations
            </p>
            <Button variant="primary" icon="Plus" onClick={handleCreatePlan}>
              Create First Plan
            </Button>
          </div>
        </Card>

        {/* Treatment Plan Builder Modal */}
        {showPlanBuilder && (
          <TreatmentPlanBuilder
            onClose={handleClosePlanBuilder}
          />
        )}
      </div>
    </div>
  );
};

export default Treatments;