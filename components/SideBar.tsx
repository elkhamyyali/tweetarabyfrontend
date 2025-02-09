import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Database,
  Home,
  Settings,
  Users,
  ChevronDown,
  ChevronRight as ChevronRightIcon,
  Menu,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSiteContext } from "@/store/apiSlice";
import type { RootState, AppDispatch } from "@/store/store";
import Link from "next/link";

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { siteContext, loading, error } = useSelector(
    (state: RootState) => state.api
  );

  const [isOpen, setIsOpen] = useState(true);
  const [openLabels, setOpenLabels] = useState<{ [key: string]: boolean }>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    dispatch(fetchSiteContext());

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const toggleLabel = (label: string) => {
    setOpenLabels((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-red-500">
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors lg:hidden"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`
          bg-gray-900 text-white 
          transition-all duration-300 ease-in-out
          ${isMobile ? "fixed top-0 left-0 h-full z-50" : "relative"}
          ${isOpen ? "w-64" : "w-0 lg:w-20"}
          flex flex-col overflow-y-auto
        `}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            absolute top-4 right-2 bg-blue-600 text-white p-1 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50
            ${isMobile ? "right-4" : ""}
          `}
        >
          {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>

        {/* Logo/Brand */}
        <div
          className={`flex items-center p-4 border-b border-gray-800 ${
            isOpen ? "justify-between" : "justify-center"
          }`}
        >
          {isOpen && (
            <Link href="/" className="font-bold text-xl">
              {siteContext?.site_title || "Admin"}
            </Link>
          )}
        </div>

        {/* Menu */}
        <nav className={`flex-1 mt-4 ${!isOpen && "hidden lg:block"}`}>
          {siteContext?.available_apps &&
            siteContext.available_apps.map((app, index) => (
              <div key={app.app_label} className="mb-2">
                <div
                  className={`flex items-center justify-between p-3 ${
                    isOpen ? "px-4" : "justify-center"
                  } cursor-pointer hover:bg-gray-800 ${
                    openLabels[app.app_label] ? "bg-blue-900" : ""
                  }`}
                  onClick={() => toggleLabel(app.app_label)}
                >
                  {isOpen ? (
                    <>
                      <span className="font-semibold">{app.name}</span>
                      {openLabels[app.app_label] ? (
                        <ChevronDown size={20} />
                      ) : (
                        <ChevronRightIcon size={20} />
                      )}
                    </>
                  ) : (
                    <div className="flex justify-center w-full">
                      {index % 3 === 0 ? (
                        <Database size={20} />
                      ) : index % 3 === 1 ? (
                        <Settings size={20} />
                      ) : (
                        <Users size={20} />
                      )}
                    </div>
                  )}
                </div>

                {/* Nested Models */}
                {isOpen && openLabels[app.app_label] && app.models && (
                  <ul className="ml-4 mt-2 space-y-2 text-gray-300">
                    {app.models.map((model) => (
                      <li
                        key={model.object_name}
                        className="p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
                      >
                        <Link
                          href={`/${model.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="block hover:text-blue-400 transition-colors"
                        >
                          {model.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
        </nav>

        {/* Footer/User Section */}
        <div
          className={`p-4 border-t border-gray-800 flex items-center ${
            !isOpen && "hidden lg:flex"
          }`}
        >
          {isOpen ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                U
              </div>
              <div>
                <p className="text-sm font-semibold">Admin User</p>
                <p className="text-xs text-gray-500">Site Administrator</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
              U
            </div>
          )}
        </div>
      </div>

      {/* Mobile overlay (Backdrop when sidebar is open) */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
