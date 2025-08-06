import { useState, useEffect } from "react";
import { patientService } from "@/services/api/patientService";
import { appointmentService } from "@/services/api/appointmentService";
import { treatmentService } from "@/services/api/treatmentService";
import StatCard from "@/components/molecules/StatCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    weekRevenue: 0,
    pendingTreatments: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [patients, todayAppts, treatments] = await Promise.all([
        patientService.getAll(),
        appointmentService.getTodaysAppointments(),
        treatmentService.getAll()
      ]);
      
      // Calculate week revenue from recent treatments
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const weekTreatments = treatments.filter(treatment => 
        new Date(treatment.date) >= oneWeekAgo && treatment.status === "completed"
      );
      
      const weekRevenue = weekTreatments.reduce((sum, treatment) => sum + treatment.cost, 0);
      
      const pendingTreatments = treatments.filter(treatment => 
        treatment.status === "in-progress" || treatment.status === "planned"
      ).length;
      
      setStats({
        totalPatients: patients.length,
        todayAppointments: todayAppts.length,
        weekRevenue,
        pendingTreatments
      });
    } catch (err) {
      setError(err.message || "Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-card p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Error 
        message={error}
        onRetry={loadStats}
        className="col-span-full"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Patients"
        value={stats.totalPatients.toLocaleString()}
        icon="Users"
        change="+12% from last month"
        changeType="positive"
        gradient
      />
      
      <StatCard
        title="Today's Appointments"
        value={stats.todayAppointments}
        icon="Calendar"
        change="3 confirmed, 1 pending"
        changeType="neutral"
        gradient
      />
      
      <StatCard
        title="Week Revenue"
        value={formatCurrency(stats.weekRevenue)}
        icon="DollarSign"
        change="+8% from last week"
        changeType="positive"
        gradient
      />
      
      <StatCard
        title="Pending Treatments"
        value={stats.pendingTreatments}
        icon="Clock"
        change="2 in-progress"
        changeType="neutral"
        gradient
      />
    </div>
  );
};

export default DashboardStats;