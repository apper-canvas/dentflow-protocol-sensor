import React, { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Header from "@/components/organisms/Header";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import Card from "@/components/atoms/Card";

const Settings = () => {
  const [settings, setSettings] = useState({
    clinicName: "DentFlow Clinic",
    address: "123 Main St, City, State 12345",
    phone: "(555) 123-4567",
    email: "info@dentflowclinic.com",
    timezone: "America/New_York",
    appointmentDuration: "30",
    reminderTime: "24"
  });

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6">
      <Header
        title="Settings"
        subtitle="Manage your clinic settings and preferences"
      />
      
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Clinic Information</h3>
          <div className="space-y-4">
            <Input
              label="Clinic Name"
              value={settings.clinicName}
              onChange={(e) => handleInputChange('clinicName', e.target.value)}
            />
            <Input
              label="Address"
              value={settings.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Phone"
                value={settings.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
              <Input
                label="Email"
                type="email"
                value={settings.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Appointment Settings</h3>
          <div className="space-y-4">
            <Select
              label="Default Appointment Duration"
              value={settings.appointmentDuration}
              onChange={(value) => handleInputChange('appointmentDuration', value)}
              options={[
                { value: "15", label: "15 minutes" },
                { value: "30", label: "30 minutes" },
                { value: "45", label: "45 minutes" },
                { value: "60", label: "1 hour" }
              ]}
            />
            <Select
              label="Reminder Time"
              value={settings.reminderTime}
              onChange={(value) => handleInputChange('reminderTime', value)}
              options={[
                { value: "1", label: "1 hour before" },
                { value: "24", label: "1 day before" },
                { value: "48", label: "2 days before" },
                { value: "168", label: "1 week before" }
              ]}
            />
          </div>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave}>
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;