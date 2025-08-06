import { useState } from "react";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const ProcedureLibrary = ({ procedures, onDragStart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "preventive", label: "Preventive" },
    { value: "restorative", label: "Restorative" },
    { value: "endodontic", label: "Endodontic" },
    { value: "surgical", label: "Surgical" },
    { value: "orthodontic", label: "Orthodontic" },
    { value: "cosmetic", label: "Cosmetic" }
  ];

  const filteredProcedures = procedures.filter(procedure => {
    const matchesSearch = procedure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         procedure.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || procedure.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    const colors = {
      preventive: "success",
      restorative: "primary",
      endodontic: "warning",
      surgical: "error",
      orthodontic: "info",
      cosmetic: "secondary"
    };
    return colors[category] || "secondary";
  };

  const handleDragStart = (e, procedure) => {
    e.dataTransfer.effectAllowed = "copy";
    onDragStart(e, procedure);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Procedure Library</h3>
        
        {/* Search */}
        <div className="mb-4">
          <Input
            placeholder="Search procedures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon="Search"
          />
        </div>
        
        {/* Category Filter */}
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full"
        >
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </Select>
      </div>

      {/* Procedures List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredProcedures.length === 0 ? (
          <div className="text-center py-8">
            <ApperIcon name="Search" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No procedures found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProcedures.map((procedure) => (
              <div
                key={procedure.id}
                draggable
                onDragStart={(e) => handleDragStart(e, procedure)}
                className={cn(
                  "bg-white border border-gray-200 rounded-lg p-4 cursor-grab",
                  "hover:border-primary hover:shadow-md transition-all duration-200",
                  "active:cursor-grabbing active:scale-95"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {procedure.name}
                      </h4>
                      <Badge variant={getCategoryColor(procedure.category)} size="sm">
                        {procedure.category}
                      </Badge>
                    </div>
                    {procedure.description && (
                      <p className="text-xs text-gray-600 mb-2">
                        {procedure.description}
                      </p>
                    )}
                  </div>
                  <ApperIcon name="GripVertical" className="w-4 h-4 text-gray-400 ml-2" />
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-900">
                      ${procedure.cost?.toFixed(2) || '0.00'}
                    </span>
                    {procedure.insuranceRate && (
                      <span className="text-success">
                        {(procedure.insuranceRate * 100).toFixed(0)}% covered
                      </span>
                    )}
                  </div>
                  <span className="text-gray-500">
                    ~{procedure.duration || 30}min
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcedureLibrary;