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
    return treatmentPlans.filter(p => p.patientId === patientId.toString());
  },

  async create(planData) {
    await delay(400);
    const newPlan = {
      Id: nextPlanId++,
      ...planData,
      createdAt: new Date().toISOString(),
      status: planData.status || "draft",
      procedures: planData.procedures || []
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
    treatmentPlans[index] = { ...treatmentPlans[index], ...planData };
    return { ...treatmentPlans[index] };
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
    const totalInsuranceCovered = procedures.reduce((sum, proc) => sum + (proc.insuranceCovered || 0), 0);
    const patientPortion = totalCost - totalInsuranceCovered;
    
    return {
      totalCost,
      totalInsuranceCovered,
      patientPortion,
      procedureCount: procedures.length
    };
  }
};