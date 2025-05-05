import { useState, useEffect, useRef } from "react";
import { Search, Loader, User } from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";

const SearchUser = ({ setAssignedTo }) => {
  const { searchUsers, filteredUsers, loadingUsers } = useAuthStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // Search users
  useEffect(() => {
    if (searchTerm.trim()) {
      searchUsers(searchTerm);
    } else {
      setAssignedTo("");
    }
  }, [searchTerm]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectUser = (user) => {
    setAssignedTo(user._id);
    setSearchTerm(`${user.name} <${user.email}>`);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-left text-sm font-medium text-gray-700">
        Assign To <span className="text-red-500">*</span>
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!isDropdownOpen) setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder="Start typing to search users..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none pr-10"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {isDropdownOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {loadingUsers ? (
            <div className="p-3 flex items-center justify-center text-gray-500">
              <Loader className="animate-spin h-4 w-4 mr-2" />
              Searching...
            </div>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <div
                key={index}
                className="p-3 hover:bg-purple-50 cursor-pointer transition-colors"
                onClick={() => handleSelectUser(user)}
              >
                <div className="flex gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="font-medium text-left">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-500">
              {searchTerm.trim()
                ? "No users found"
                : "Start typing to search users"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchUser;
