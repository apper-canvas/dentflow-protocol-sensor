import treatmentsData from "@/services/mockData/treatments.json";

let treatments = [...treatmentsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const treatmentService = {
  async getAll() {
    await delay(300);
    return [...treatments];
  },

  async getById(id) {
    await delay(200);
    const treatment = treatments.find(t => t.Id === parseInt(id));
    if (!treatment) {
      throw new Error("Treatment not found");
    }
    return { ...treatment };
  },

  async getByPatientId(patientId) {
    await delay(250);
    return treatments.filter(t => t.patientId === patientId.toString());
  },

  async create(treatmentData) {
    await delay(400);
    const maxId = Math.max(...treatments.map(t => t.Id), 0);
    const newTreatment = {
      Id: maxId + 1,
      ...treatmentData,
      date: treatmentData.date || new Date().toISOString().split("T")[0],
      status: treatmentData.status || "completed"
    };
    treatments.push(newTreatment);
    return { ...newTreatment };
  },

  async update(id, treatmentData) {
    await delay(300);
    const index = treatments.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Treatment not found");
    }
    treatments[index] = { ...treatments[index], ...treatmentData };
    return { ...treatments[index] };
  },

  async delete(id) {
    await delay(250);
    const index = treatments.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Treatment not found");
    }
    treatments.splice(index, 1);
    return true;
  },

  async getRecentTreatments(limit = 10) {
    await delay(200);
    return [...treatments]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  }
};