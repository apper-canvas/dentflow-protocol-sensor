import { useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const SearchBar = ({ 
  className,
  placeholder = "Search...",
  onSearch,
  debounceMs = 300,
  ...props 
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (onSearch) {
      clearTimeout(window.searchTimeout);
      window.searchTimeout = setTimeout(() => {
        onSearch(value);
      }, debounceMs);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className={cn("relative", className)} {...props}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" className="w-4 h-4 text-gray-400" />
      </div>
      
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white text-sm placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 transition-all duration-200"
      />
      
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors duration-200"
        >
          <ApperIcon name="X" className="w-4 h-4 text-gray-400" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;