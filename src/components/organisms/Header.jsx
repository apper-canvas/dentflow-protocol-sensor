import { cn } from "@/utils/cn";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
const Header = ({ 
  title = "Dashboard",
  subtitle,
  showSearch = false,
  onSearch,
  searchPlaceholder = "Search patients...",
  actions,
  className,
  ...props 
}) => {
  return (
    <header className={cn("bg-white border-b border-gray-200 shadow-sm", className)} {...props}>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {showSearch && (
              <div className="w-80">
                <SearchBar 
                  placeholder={searchPlaceholder}
                  onSearch={onSearch}
                />
              </div>
            )}
            
            {actions && (
              <div className="flex items-center space-x-3">
                {actions}
              </div>
            )}
            
<div className="flex items-center space-x-3">
              <button 
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
onClick={() => {
                  toast.info('No new notifications');
                }}
              >
                <ApperIcon name="Bell" className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="relative group">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center cursor-pointer">
                  <ApperIcon name="User" className="w-4 h-4 text-white" />
                </div>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <button
                      onClick={async () => {
                        try {
                          const { ApperUI } = window.ApperSDK;
                          await ApperUI.logout();
                          window.location.href = '/login';
                        } catch (error) {
                          console.error("Logout failed:", error);
                          toast.error("Logout failed. Please try again.");
                        }
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <ApperIcon name="LogOut" className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;