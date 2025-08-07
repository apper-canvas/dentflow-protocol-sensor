// Initialize ApperClient for database operations
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = "patient_c";

export const patientService = {
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "firstName_c" } },
          { field: { Name: "lastName_c" } },
          { field: { Name: "dateOfBirth_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "insuranceProvider_c" } },
          { field: { Name: "insuranceId_c" } },
          { field: { Name: "medicalHistory_c" } },
          { field: { Name: "allergies_c" } },
          { field: { Name: "lastVisit_c" } },
          { field: { Name: "nextAppointment_c" } }
        ],
        orderBy: [
          { fieldName: "firstName_c", sorttype: "ASC" },
          { fieldName: "lastName_c", sorttype: "ASC" }
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
        console.error("Error fetching patients:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching patients:", error.message);
        throw error;
      }
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "firstName_c" } },
          { field: { Name: "lastName_c" } },
          { field: { Name: "dateOfBirth_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "insuranceProvider_c" } },
          { field: { Name: "insuranceId_c" } },
          { field: { Name: "medicalHistory_c" } },
          { field: { Name: "allergies_c" } },
          { field: { Name: "lastVisit_c" } },
          { field: { Name: "nextAppointment_c" } }
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
        console.error("Error fetching patient:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching patient:", error.message);
        throw error;
      }
    }
  },

  async create(patientData) {
    try {
      const params = {
        records: [
          {
            Name: `${patientData.firstName} ${patientData.lastName}`,
            firstName_c: patientData.firstName,
            lastName_c: patientData.lastName,
            dateOfBirth_c: patientData.dateOfBirth,
            phone_c: patientData.phone,
            email_c: patientData.email || "",
            address_c: patientData.address || "",
            insuranceProvider_c: patientData.insurance || patientData.insuranceProvider || "",
            insuranceId_c: patientData.insuranceId || "",
            medicalHistory_c: Array.isArray(patientData.medicalHistory) ? patientData.medicalHistory.join(",") : (patientData.medicalHistory || ""),
            allergies_c: Array.isArray(patientData.allergies) ? patientData.allergies.join(",") : (patientData.allergies || ""),
            lastVisit_c: null,
            nextAppointment_c: null
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
          console.error(`Failed to create patient records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to create patient");
        }
        return response.results[0].data;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating patient:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating patient:", error.message);
        throw error;
      }
    }
  },

  async update(id, patientData) {
    try {
      const updateData = { Id: parseInt(id) };
      
      if (patientData.firstName || patientData.lastName) {
        updateData.Name = `${patientData.firstName || ''} ${patientData.lastName || ''}`.trim();
      }
      if (patientData.firstName) updateData.firstName_c = patientData.firstName;
      if (patientData.lastName) updateData.lastName_c = patientData.lastName;
      if (patientData.dateOfBirth) updateData.dateOfBirth_c = patientData.dateOfBirth;
      if (patientData.phone) updateData.phone_c = patientData.phone;
      if (patientData.email !== undefined) updateData.email_c = patientData.email;
      if (patientData.address !== undefined) updateData.address_c = patientData.address;
      if (patientData.insurance !== undefined || patientData.insuranceProvider !== undefined) {
        updateData.insuranceProvider_c = patientData.insurance || patientData.insuranceProvider;
      }
      if (patientData.insuranceId !== undefined) updateData.insuranceId_c = patientData.insuranceId;
      if (patientData.medicalHistory !== undefined) {
        updateData.medicalHistory_c = Array.isArray(patientData.medicalHistory) ? 
          patientData.medicalHistory.join(",") : patientData.medicalHistory;
      }
      if (patientData.allergies !== undefined) {
        updateData.allergies_c = Array.isArray(patientData.allergies) ? 
          patientData.allergies.join(",") : patientData.allergies;
      }
      if (patientData.lastVisit !== undefined) updateData.lastVisit_c = patientData.lastVisit;
      if (patientData.nextAppointment !== undefined) updateData.nextAppointment_c = patientData.nextAppointment;

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
          console.error(`Failed to update patient records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to update patient");
        }
        return response.results[0].data;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating patient:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error updating patient:", error.message);
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
          console.error(`Failed to delete patient records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to delete patient");
        }
      }

      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting patient:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error deleting patient:", error.message);
        throw error;
      }
    }
  },

  async search(query) {
    try {
      if (!query.trim()) {
        return this.getAll();
      }

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "firstName_c" } },
          { field: { Name: "lastName_c" } },
          { field: { Name: "dateOfBirth_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "insuranceProvider_c" } },
          { field: { Name: "insuranceId_c" } },
          { field: { Name: "medicalHistory_c" } },
          { field: { Name: "allergies_c" } },
          { field: { Name: "lastVisit_c" } },
          { field: { Name: "nextAppointment_c" } }
        ],
        whereGroups: [
          {
            operator: "OR",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "firstName_c",
                    operator: "Contains",
                    values: [query]
                  }
                ]
              },
              {
                conditions: [
                  {
                    fieldName: "lastName_c",
                    operator: "Contains",
                    values: [query]
                  }
                ]
              },
              {
                conditions: [
                  {
                    fieldName: "phone_c",
                    operator: "Contains",
                    values: [query]
                  }
                ]
              },
              {
                conditions: [
                  {
                    fieldName: "email_c",
                    operator: "Contains",
                    values: [query]
                  }
                ]
              }
            ]
          }
        ],
        orderBy: [
          { fieldName: "firstName_c", sorttype: "ASC" },
          { fieldName: "lastName_c", sorttype: "ASC" }
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
        console.error("Error searching patients:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error searching patients:", error.message);
        throw error;
      }
    }
}
};