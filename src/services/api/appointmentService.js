import appointmentsData from "@/services/mockData/appointments.json";

let appointments = [...appointmentsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const appointmentService = {
  async getAll() {
    await delay(300);
    return [...appointments];
  },

  async getById(id) {
    await delay(200);
    const appointment = appointments.find(a => a.Id === parseInt(id));
    if (!appointment) {
      throw new Error("Appointment not found");
    }
    return { ...appointment };
  },

  async getByPatientId(patientId) {
    await delay(250);
    return appointments.filter(a => a.patientId === patientId.toString());
  },

  async getByDateRange(startDate, endDate) {
    await delay(300);
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.dateTime);
      return appointmentDate >= start && appointmentDate <= end;
    });
  },

  async getTodaysAppointments() {
    await delay(200);
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    
    return appointments.filter(appointment => {
      const appointmentDate = appointment.dateTime.split("T")[0];
      return appointmentDate === todayStr;
    });
  },

  async create(appointmentData) {
    await delay(400);
    const maxId = Math.max(...appointments.map(a => a.Id), 0);
    const newAppointment = {
      Id: maxId + 1,
      ...appointmentData,
      status: "pending"
    };
    appointments.push(newAppointment);
    return { ...newAppointment };
  },

  async update(id, appointmentData) {
    await delay(300);
    const index = appointments.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Appointment not found");
    }
    appointments[index] = { ...appointments[index], ...appointmentData };
    return { ...appointments[index] };
  },

  async updateStatus(id, status) {
    await delay(200);
    const index = appointments.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Appointment not found");
    }
    appointments[index].status = status;
    return { ...appointments[index] };
  },

  async delete(id) {
    await delay(250);
    const index = appointments.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Appointment not found");
    }
    appointments.splice(index, 1);
    return true;
  }
};