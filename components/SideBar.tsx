"use client";
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

  useEffect(() => {
    dispatch(fetchSiteContext());
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
    <div className="flex h-screen">
      <div
        className={`
          bg-gray-900 text-white 
          transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-20"}
          relative flex flex-col
          overflow-y-auto
        `}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-4 right-2 bg-blue-600 text-white p-1 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        >
          {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>

        {/* Logo/Brand Area */}
        <div
          className={`
            flex items-center 
            p-4 border-b border-gray-800
            ${isOpen ? "justify-between" : "justify-center"}
          `}
        >
          {isOpen ? (
            <Link href="/" className="font-bold text-xl">
              {siteContext?.site_title || "Admin"}
            </Link>
          ) : (
            ""
          )}
        </div>

        {/* Site Context Apps */}
        <nav className="flex-1 mt-4">
          {siteContext?.available_apps &&
            siteContext.available_apps.map((app, index) => (
              <div key={app.app_label} className="mb-2">
                <div
                  className={`
                    flex items-center justify-between p-3 
                    ${isOpen ? "px-4" : "justify-center"}
                    cursor-pointer hover:bg-gray-800
                    ${openLabels[app.app_label] ? "bg-blue-900" : ""}
                  `}
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
                    // Different icons for each menu item when sidebar is closed
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
        <div className="p-4 border-t border-gray-800 flex items-center">
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
    </div>
  );
};

export default Sidebar;
