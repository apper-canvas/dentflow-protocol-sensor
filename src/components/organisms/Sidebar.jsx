import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: "LayoutDashboard" },
    { name: "Patients", href: "/patients", icon: "Users" },
    { name: "Appointments", href: "/appointments", icon: "Calendar" },
    { name: "Treatments", href: "/treatments", icon: "Stethoscope" },
    { name: "Settings", href: "/settings", icon: "Settings" }
  ];

  const NavItem = ({ item, mobile = false }) => {
    const isActive = location.pathname === item.href;
    
    return (
      <NavLink
        to={item.href}
        onClick={mobile ? () => setIsMobileMenuOpen(false) : undefined}
        className={cn(
          "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
          isActive 
            ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg" 
            : "text-gray-700 hover:bg-gray-100 hover:text-primary"
        )}
      >
        <ApperIcon name={item.icon} className="w-5 h-5 mr-3" />
        {item.name}
      </NavLink>
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border border-gray-200"
      >
        <ApperIcon name="Menu" className="w-6 h-6 text-gray-600" />
      </button>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Tooth" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">DentFlow</h1>
                  <p className="text-xs text-gray-500">Practice Management</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <ApperIcon name="X" className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <nav className="p-4 space-y-2">
              {navigation.map((item) => (
                <NavItem key={item.name} item={item} mobile={true} />
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm z-30">
        <div className="flex items-center p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Tooth" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">DentFlow</h1>
              <p className="text-xs text-gray-500">Practice Management</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="w-8 h-8 bg-gradient-to-br from-secondary to-gray-600 rounded-full flex items-center justify-center">
              <ApperIcon name="User" className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Dr. Smith</p>
              <p className="text-xs text-gray-500 truncate">Lead Dentist</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;