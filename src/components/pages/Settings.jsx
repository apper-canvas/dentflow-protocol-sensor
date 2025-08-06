import Header from "@/components/organisms/Header";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
const Settings = () => {
  const { toast } = require('react-toastify');
  
  const handleExportSettings = () => {
    toast.success('Settings exported successfully');
  };

  const handleSaveChanges = () => {
    toast.success('Settings saved successfully');
  };

  const handleEditSection = (sectionName) => {
    toast.info(`Editing ${sectionName} settings`);
  };

  const handleConfigureIntegration = (integrationName) => {
    toast.info(`Configuring ${integrationName} integration`);
  };

  const handleViewBackupDetails = (backupType) => {
    toast.info(`Viewing ${backupType} backup details`);
  };

  const handleCreateBackup = () => {
    toast.success('Manual backup created successfully');
  };

  const handleRestoreBackup = () => {
    toast.info('Select backup file to restore');
  };

  const handleChangePassword = () => {
    toast.info('Redirecting to password change form');
  };

  const settingsCategories = [
    {
      title: "Practice Information",
      description: "Basic information about your dental practice",
      icon: "Building",
      fields: [
        { label: "Practice Name", type: "text", defaultValue: "DentFlow Dental Practice" },
        { label: "Address", type: "text", defaultValue: "123 Medical Center Dr" },
        { label: "Phone", type: "tel", defaultValue: "(555) 123-4567" },
        { label: "Email", type: "email", defaultValue: "info@dentflowpractice.com" }
      ]
    },
    {
      title: "Appointment Settings",
      description: "Configure appointment scheduling options",
      icon: "Calendar",
      fields: [
        { label: "Default Appointment Duration", type: "select", options: ["30 minutes", "45 minutes", "60 minutes", "90 minutes"] },
        { label: "Booking Window (Days)", type: "number", defaultValue: "30" },
        { label: "Reminder Time (Hours)", type: "number", defaultValue: "24" }
      ]
    },
    {
      title: "Treatment Categories",
      description: "Manage treatment types and procedures",
      icon: "Stethoscope",
      fields: [
        { label: "Default Treatment Duration", type: "select", options: ["30 minutes", "60 minutes", "90 minutes", "120 minutes"] },
        { label: "Insurance Processing", type: "select", options: ["Automatic", "Manual Review", "Disabled"] }
      ]
    },
    {
      title: "Notifications",
      description: "Email and system notification preferences",
      icon: "Bell",
      fields: [
        { label: "Email Notifications", type: "select", options: ["All", "Important Only", "None"] },
        { label: "Appointment Reminders", type: "select", options: ["Enabled", "Disabled"] },
        { label: "System Alerts", type: "select", options: ["Enabled", "Disabled"] }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header
        title="Settings"
        subtitle="Configure your practice settings and preferences"
        actions={
<div className="flex space-x-3">
            <Button variant="outline" icon="Download" onClick={handleExportSettings}>
              Export Settings
            </Button>
            <Button variant="primary" icon="Save" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </div>
        }
      />
      
      <div className="p-6 space-y-6">
        {settingsCategories.map((category, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-blue-100 rounded-lg flex items-center justify-center">
                <ApperIcon name={category.icon} className="w-6 h-6 text-primary" />
              </div>
              
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900">{category.title}</h2>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
              
<Button variant="outline" size="sm" icon="Edit" onClick={() => handleEditSection(category.title)}>
                Edit
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.fields.map((field, fieldIndex) => (
                <div key={fieldIndex}>
                  {field.type === "select" ? (
                    <Select label={field.label} defaultValue={field.options?.[0]}>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      label={field.label}
                      type={field.type}
                      defaultValue={field.defaultValue}
                    />
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
        
        {/* System Information */}
        <Card className="p-6">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
              <ApperIcon name="Info" className="w-6 h-6 text-gray-600" />
            </div>
            
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">System Information</h2>
              <p className="text-sm text-gray-600">Application version and system details</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4">
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <dt className="font-medium text-gray-700">Version</dt>
                <dd className="text-gray-600">DentFlow v1.0.0</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-700">Last Updated</dt>
                <dd className="text-gray-600">January 24, 2024</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-700">Database Status</dt>
                <dd className="text-green-600 flex items-center">
                  <ApperIcon name="CheckCircle" className="w-4 h-4 mr-1" />
                  Connected
                </dd>
              </div>
            </dl>
          </div>
        </Card>
        
        {/* Backup & Security */}
        <Card className="p-6">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-success/20 to-green-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="Shield" className="w-6 h-6 text-success" />
            </div>
            
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">Backup & Security</h2>
              <p className="text-sm text-gray-600">Data backup and security settings</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Database" className="w-5 h-5 text-success" />
                  <div>
                    <p className="font-medium text-gray-900">Automatic Backup</p>
                    <p className="text-sm text-gray-600">Daily at 2:00 AM</p>
                  </div>
</div>
                <Button variant="outline" size="sm" onClick={() => handleConfigureIntegration('Practice Management')}>Configure</Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Lock" className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Data Encryption</p>
                    <p className="text-sm text-gray-600">AES-256 Enabled</p>
                  </div>
</div>
                <Button variant="outline" size="sm" onClick={() => handleViewBackupDetails('Automatic')}>View Details</Button>
              </div>
            </div>
            
            <div className="space-y-4">
<Button variant="primary" className="w-full" icon="Download" onClick={handleCreateBackup}>
                Create Manual Backup
              </Button>
              
              <Button variant="outline" className="w-full" icon="Upload" onClick={handleRestoreBackup}>
                Restore from Backup
              </Button>
              
              <Button variant="outline" className="w-full" icon="Key" onClick={handleChangePassword}>
                Change Master Password
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;