// Treatment Plan Service - Mock implementation since no database table available
import treatmentsData from "@/services/mockData/treatments.json";

let treatmentPlans = [];
let nextPlanId = 1;

// Utility function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const treatmentPlanService = {
  async getAll() {
    await delay(300);
    return [...treatmentPlans];
  },

  async getById(id) {
    await delay(200);
    const plan = treatmentPlans.find(p => p.Id === parseInt(id));
    if (!plan) {
      throw new Error("Treatment plan not found");
    }
    return { ...plan };
  },

  async getByPatientId(patientId) {
    await delay(250);
    return treatmentPlans.filter(p => p.patientId_c === parseInt(patientId));
  },

  async create(planData) {
    await delay(400);
    const newPlan = {
      Id: nextPlanId++,
      Name: planData.Name || planData.name,
      patientId_c: parseInt(planData.patientId || planData.selectedPatientId),
      procedures: planData.procedures || [],
      status_c: planData.status || "draft",
      totalCost_c: planData.totalCost || 0,
      totalInsuranceCovered_c: planData.totalInsuranceCovered || 0,
      patientPortion_c: planData.patientPortion || 0,
      CreatedOn: new Date().toISOString()
    };
    treatmentPlans.push(newPlan);
    return { ...newPlan };
  },

  async update(id, planData) {
    await delay(300);
    const index = treatmentPlans.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Treatment plan not found");
    }
    
    const updatedPlan = {
      ...treatmentPlans[index],
      Name: planData.Name || planData.name || treatmentPlans[index].Name,
      patientId_c: planData.patientId ? parseInt(planData.patientId) : treatmentPlans[index].patientId_c,
      procedures: planData.procedures || treatmentPlans[index].procedures,
      status_c: planData.status || treatmentPlans[index].status_c,
      totalCost_c: planData.totalCost || treatmentPlans[index].totalCost_c,
      totalInsuranceCovered_c: planData.totalInsuranceCovered || treatmentPlans[index].totalInsuranceCovered_c,
      patientPortion_c: planData.patientPortion || treatmentPlans[index].patientPortion_c,
      ModifiedOn: new Date().toISOString()
    };
    
    treatmentPlans[index] = updatedPlan;
    return { ...updatedPlan };
  },

  async delete(id) {
    await delay(250);
    const index = treatmentPlans.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Treatment plan not found");
    }
    treatmentPlans.splice(index, 1);
    return true;
  },

  async updateProcedureOrder(planId, procedures) {
    await delay(200);
    const index = treatmentPlans.findIndex(p => p.Id === parseInt(planId));
    if (index === -1) {
      throw new Error("Treatment plan not found");
    }
    treatmentPlans[index].procedures = procedures;
    return { ...treatmentPlans[index] };
  },

  async calculateTotals(procedures) {
    await delay(100);
    const totalCost = procedures.reduce((sum, proc) => sum + (proc.cost || 0), 0);
    const totalInsuranceCovered = procedures.reduce((sum, proc) => sum + (proc.insuranceCovered || (proc.cost * (proc.insuranceRate || 0))), 0);
    const patientPortion = totalCost - totalInsuranceCovered;
    
    return {
      totalCost,
      totalInsuranceCovered,
      patientPortion,
      procedureCount: procedures.length
    };
  }
};