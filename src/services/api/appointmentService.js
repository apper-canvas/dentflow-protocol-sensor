// Initialize ApperClient for database operations
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = "appointment_c";

export const appointmentService = {
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "patientId_c" } },
          { field: { Name: "dateTime_c" } },
          { field: { Name: "duration_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "provider_c" } },
          { field: { Name: "room_c" } },
          { field: { Name: "notes_c" } }
        ],
        orderBy: [
          { fieldName: "dateTime_c", sorttype: "ASC" }
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
        console.error("Error fetching appointments:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching appointments:", error.message);
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
          { field: { Name: "dateTime_c" } },
          { field: { Name: "duration_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "provider_c" } },
          { field: { Name: "room_c" } },
          { field: { Name: "notes_c" } }
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
        console.error("Error fetching appointment:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching appointment:", error.message);
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
          { field: { Name: "dateTime_c" } },
          { field: { Name: "duration_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "provider_c" } },
          { field: { Name: "room_c" } },
          { field: { Name: "notes_c" } }
        ],
        where: [
          {
            FieldName: "patientId_c",
            Operator: "EqualTo",
            Values: [parseInt(patientId)]
          }
        ],
        orderBy: [
          { fieldName: "dateTime_c", sorttype: "DESC" }
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
        console.error("Error fetching patient appointments:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching patient appointments:", error.message);
        throw error;
      }
    }
  },

  async getTodaysAppointments() {
    try {
      const today = new Date().toISOString().split("T")[0];
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "patientId_c" } },
          { field: { Name: "dateTime_c" } },
          { field: { Name: "duration_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "provider_c" } },
          { field: { Name: "room_c" } },
          { field: { Name: "notes_c" } }
        ],
        where: [
          {
            FieldName: "dateTime_c",
            Operator: "ExactMatch",
            SubOperator: "Day",
            Values: [today]
          }
        ],
        orderBy: [
          { fieldName: "dateTime_c", sorttype: "ASC" }
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
        console.error("Error fetching today's appointments:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching today's appointments:", error.message);
        throw error;
      }
    }
  },

  async create(appointmentData) {
    try {
      const params = {
        records: [
          {
            Name: appointmentData.Name || `${appointmentData.type || 'Appointment'} - ${new Date(appointmentData.dateTime).toLocaleDateString()}`,
            patientId_c: parseInt(appointmentData.patientId),
            dateTime_c: appointmentData.dateTime,
            duration_c: parseInt(appointmentData.duration),
            type_c: appointmentData.type,
            status_c: appointmentData.status || "pending",
            provider_c: appointmentData.provider,
            room_c: appointmentData.room,
            notes_c: appointmentData.notes || ""
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
          console.error(`Failed to create appointment records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to create appointment");
        }
        return response.results[0].data;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating appointment:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating appointment:", error.message);
        throw error;
      }
    }
  },

  async update(id, appointmentData) {
    try {
      const updateData = {};
      
      if (appointmentData.Name) updateData.Name = appointmentData.Name;
      if (appointmentData.patientId) updateData.patientId_c = parseInt(appointmentData.patientId);
      if (appointmentData.dateTime) updateData.dateTime_c = appointmentData.dateTime;
      if (appointmentData.duration) updateData.duration_c = parseInt(appointmentData.duration);
      if (appointmentData.type) updateData.type_c = appointmentData.type;
      if (appointmentData.status) updateData.status_c = appointmentData.status;
      if (appointmentData.provider) updateData.provider_c = appointmentData.provider;
      if (appointmentData.room) updateData.room_c = appointmentData.room;
      if (appointmentData.notes !== undefined) updateData.notes_c = appointmentData.notes;

      const params = {
        records: [
          {
            Id: parseInt(id),
            ...updateData
          }
        ]
      };

      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to update appointment records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to update appointment");
        }
        return response.results[0].data;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating appointment:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error updating appointment:", error.message);
        throw error;
      }
    }
  },

  async updateStatus(id, status) {
    return this.update(id, { status });
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
          console.error(`Failed to delete appointment records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to delete appointment");
        }
      }

      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting appointment:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error deleting appointment:", error.message);
        throw error;
      }
    }
  }
};