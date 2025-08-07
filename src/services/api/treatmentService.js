import treatmentsData from "@/services/mockData/treatments.json";

// Initialize ApperClient for database operations
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = "treatment_c";
const procedureLibraryTable = "procedure_library_c";

export const treatmentService = {
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "patientId_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "procedure_c" } },
          { field: { Name: "tooth_c" } },
          { field: { Name: "provider_c" } },
          { field: { Name: "cost_c" } },
          { field: { Name: "insuranceCovered_c" } },
          { field: { Name: "notes_c" } },
          { field: { Name: "status_c" } }
        ],
        orderBy: [
          { fieldName: "date_c", sorttype: "DESC" }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching treatments:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching treatments:", error.message);
        throw error;
      }
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "patientId_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "procedure_c" } },
          { field: { Name: "tooth_c" } },
          { field: { Name: "provider_c" } },
          { field: { Name: "cost_c" } },
          { field: { Name: "insuranceCovered_c" } },
          { field: { Name: "notes_c" } },
          { field: { Name: "status_c" } }
        ]
      };

      const response = await apperClient.getRecordById(tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching treatment:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching treatment:", error.message);
        throw error;
      }
    }
  },

  async getByPatientId(patientId) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "patientId_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "procedure_c" } },
          { field: { Name: "tooth_c" } },
          { field: { Name: "provider_c" } },
          { field: { Name: "cost_c" } },
          { field: { Name: "insuranceCovered_c" } },
          { field: { Name: "notes_c" } },
          { field: { Name: "status_c" } }
        ],
        where: [
          {
            FieldName: "patientId_c",
            Operator: "EqualTo",
            Values: [parseInt(patientId)]
          }
        ],
        orderBy: [
          { fieldName: "date_c", sorttype: "DESC" }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching patient treatments:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching patient treatments:", error.message);
        throw error;
      }
    }
  },

  async create(treatmentData) {
    try {
      const params = {
        records: [
          {
            Name: treatmentData.Name || treatmentData.procedure || 'Treatment',
            patientId_c: parseInt(treatmentData.patientId),
            date_c: treatmentData.date || new Date().toISOString().split("T")[0],
            procedure_c: treatmentData.procedure,
            tooth_c: Array.isArray(treatmentData.tooth) ? treatmentData.tooth.join(",") : treatmentData.tooth,
            provider_c: treatmentData.provider,
            cost_c: parseFloat(treatmentData.cost) || 0,
            insuranceCovered_c: parseFloat(treatmentData.insuranceCovered) || 0,
            notes_c: treatmentData.notes || "",
            status_c: treatmentData.status || "completed"
          }
        ]
      };

      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to create treatment records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to create treatment");
        }
        return response.results[0].data;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating treatment:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating treatment:", error.message);
        throw error;
      }
    }
  },

  async update(id, treatmentData) {
    try {
      const updateData = { Id: parseInt(id) };
      
      if (treatmentData.Name) updateData.Name = treatmentData.Name;
      if (treatmentData.patientId) updateData.patientId_c = parseInt(treatmentData.patientId);
      if (treatmentData.date) updateData.date_c = treatmentData.date;
      if (treatmentData.procedure) updateData.procedure_c = treatmentData.procedure;
      if (treatmentData.tooth) updateData.tooth_c = Array.isArray(treatmentData.tooth) ? treatmentData.tooth.join(",") : treatmentData.tooth;
      if (treatmentData.provider) updateData.provider_c = treatmentData.provider;
      if (treatmentData.cost !== undefined) updateData.cost_c = parseFloat(treatmentData.cost);
      if (treatmentData.insuranceCovered !== undefined) updateData.insuranceCovered_c = parseFloat(treatmentData.insuranceCovered);
      if (treatmentData.notes !== undefined) updateData.notes_c = treatmentData.notes;
      if (treatmentData.status) updateData.status_c = treatmentData.status;

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to update treatment records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to update treatment");
        }
        return response.results[0].data;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating treatment:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error updating treatment:", error.message);
        throw error;
      }
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to delete treatment records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to delete treatment");
        }
      }

      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting treatment:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error deleting treatment:", error.message);
        throw error;
      }
    }
  },

  async getRecentTreatments(limit = 10) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "patientId_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "procedure_c" } },
          { field: { Name: "tooth_c" } },
          { field: { Name: "provider_c" } },
          { field: { Name: "cost_c" } },
          { field: { Name: "insuranceCovered_c" } },
          { field: { Name: "notes_c" } },
          { field: { Name: "status_c" } }
        ],
        orderBy: [
          { fieldName: "date_c", sorttype: "DESC" }
        ],
        pagingInfo: {
          limit: limit,
          offset: 0
        }
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching recent treatments:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching recent treatments:", error.message);
        throw error;
      }
    }
  },

  async getProcedureLibrary() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "cost_c" } },
          { field: { Name: "insuranceRate_c" } },
          { field: { Name: "duration_c" } }
        ],
        orderBy: [
          { fieldName: "Name", sorttype: "ASC" }
        ]
      };

      const response = await apperClient.fetchRecords(procedureLibraryTable, params);
      
      if (!response.success) {
        console.error("Procedure library fetch failed, using fallback data");
        // Fallback to JSON data if database table is not available
        return treatmentsData.procedureLibrary || [];
      }

      // Map database fields to expected format
      const procedures = (response.data || []).map(proc => ({
        id: proc.Id,
        name: proc.Name,
        category: proc.category_c,
        description: proc.description_c,
        cost: proc.cost_c,
        insuranceRate: proc.insuranceRate_c,
        duration: proc.duration_c
      }));

      return procedures;
    } catch (error) {
      console.error("Error fetching procedure library, using fallback:", error.message);
      // Return fallback data
      return treatmentsData.procedureLibrary || [];
    }
  },

  async searchProcedures(searchTerm, category = null) {
    try {
      const whereConditions = [];
      
      if (searchTerm) {
        whereConditions.push({
          FieldName: "Name",
          Operator: "Contains",
          Values: [searchTerm]
        });
      }
      
      if (category && category !== "all") {
        whereConditions.push({
          FieldName: "category_c",
          Operator: "EqualTo",
          Values: [category]
        });
      }

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "cost_c" } },
          { field: { Name: "insuranceRate_c" } },
          { field: { Name: "duration_c" } }
        ],
        where: whereConditions,
        orderBy: [
          { fieldName: "Name", sorttype: "ASC" }
        ]
      };

      const response = await apperClient.fetchRecords(procedureLibraryTable, params);
      
      if (!response.success) {
        console.error("Procedure search failed, using fallback");
        // Fallback to JSON data search
        const procedures = treatmentsData.procedureLibrary || [];
        return procedures.filter(procedure => {
          const matchesSearch = !searchTerm || 
            procedure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            procedure.description?.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = !category || category === "all" || procedure.category === category;
          
          return matchesSearch && matchesCategory;
        });
      }

      // Map database fields to expected format
      const procedures = (response.data || []).map(proc => ({
        id: proc.Id,
        name: proc.Name,
        category: proc.category_c,
        description: proc.description_c,
        cost: proc.cost_c,
        insuranceRate: proc.insuranceRate_c,
        duration: proc.duration_c
      }));

      return procedures;
    } catch (error) {
      console.error("Error searching procedures, using fallback:", error.message);
      // Return fallback search
      const procedures = treatmentsData.procedureLibrary || [];
      return procedures.filter(procedure => {
        const matchesSearch = !searchTerm || 
          procedure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          procedure.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !category || category === "all" || procedure.category === category;
        
        return matchesSearch && matchesCategory;
      });
    }
  }
};