import { useState } from "react";
import DashboardAvatars from "./DashboardAvatars";
import { FaArrowRight } from "react-icons/fa";

interface DataRow {
  source: string;
  description: string;
  labor: string;
  revenue: string;
  revenueBgColor: string;
  newColor: string;
  teamMembers: JSX.Element;
  dateRange: string;
}

const Secondapp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("All");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const data: DataRow[] = [
    {
      source: "Github.com",
      description: "Lorem, ipsum dolor.",
      labor: "Labor 24 - 35 years",
      revenue: "Reviewing",
      revenueBgColor: "#FF0000",
      newColor: "#DFFFEA",
      teamMembers: <DashboardAvatars />,
      dateRange: "24 Dec 21 - 06 Jan 22",
    },
    {
      source: "Twitter",
      description: "Lorem, ipsum dolor.",
      labor: "Labor 25 - 36 years",
      revenue: "Reviewing",
      revenueBgColor: "#00FF00",
      newColor: "#DFFFEA",
      teamMembers: <DashboardAvatars />,
      dateRange: "25 Dec 21 - 07 Jan 22",
    },
    {
      source: "Facebook",
      description: "Lorem, ipsum dolor.",
      labor: "Labor 26 - 37 years",
      revenue: "Reviewing",
      revenueBgColor: "#0000FF",
      newColor: "#DFFFEA",
      teamMembers: <DashboardAvatars />,
      dateRange: "26 Dec 21 - 08 Jan 22",
    },
    {
      source: "Github.com",
      description: "Lorem, ipsum dolor.",
      labor: "Labor 24 - 35 years",
      revenue: "Reviewing",
      revenueBgColor: "#FF0000",
      newColor: "#DFFFEA",
      teamMembers: <DashboardAvatars />,
      dateRange: "24 Dec 21 - 06 Jan 22",
    },
    {
      source: "Twitter",
      description: "Lorem, ipsum dolor.",
      labor: "Labor 25 - 36 years",
      revenue: "Reviewing",
      revenueBgColor: "#00FF00",
      newColor: "#DFFFEA",
      teamMembers: <DashboardAvatars />,
      dateRange: "25 Dec 21 - 07 Jan 22",
    },
  ];

  const filteredData =
    selectedOption === "All"
      ? data
      : data.filter((row) => row.source === selectedOption);

  return (
    <div className="col-span-full xl:col-span-12 shadow-md rounded-lg border border-slate-200 dark:border-none p-4">
      <header className="px-5 py-6 flex flex-wrap flex-col ">
        <div className="flex flex-wrap justify-between">
          <div className="flex gap-4 mb-3">
            <button
              className="font-semibold mr-2 text-slate-800 dark:text-slate-100 border-b-3 border-blue-500 pb-1"
              onClick={toggleDropdown}
            >
              All Campaigns (87)
            </button>
            <button
              className="text-gray-400 mr-2 hover:text-slate-800 font-medium dark:text-gray-100 border-b-2 pb-1 border-transparent hover:border-blue-500"
              onClick={toggleDropdown}
            >
              Lorem (48)
            </button>
            <button
              className="text-gray-400 mr-2 hover:text-slate-800 font-medium dark:text-gray-100 pb-1 border-b-2 border-transparent hover:border-blue-500"
              onClick={toggleDropdown}
            >
              Advanced (12)
            </button>
          </div>
          <div>
            <button
              style={{
                background: "#056EE9",
                padding: 10,
                borderRadius: 5,
                color: "white",
                fontSize: "12px",
              }}
            >
              CreateCampign
            </button>
          </div>
        </div>
        <div className="flex items-center flex-wrap border-b border-dashed border-gray-400 dark:border-gray-700">
          <div className="flex items-center mb-3">
            <span className="font-bold text-xs" style={{ color: "#99A1B7" }}>
              Type
            </span>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="bg-transparent rounded-md py-1 px-2 text-xs pr-8 border-none font-bold text-gray-900 dark:text-white"
            >
              <option value="All">Newst</option>
              {data.map((row, index) => (
                <option key={index} value={row.source}>
                  {row.source}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center mb-3">
            <span className="font-bold text-xs" style={{ color: "#99A1B7" }}>
              Status
            </span>
            <select className="bg-transparent rounded-md py-1 px-2 text-xs pr-8 border-none font-bold text-gray-900 dark:text-white">
              <option value="All">Show All</option>
            </select>
          </div>
          <div className="flex items-center mb-3">
            <span className="font-bold text-xs" style={{ color: "#99A1B7" }}>
              Budget
            </span>
            <select className="bg-transparent rounded-md py-1 px-2 text-xs pr-8 border-none font-bold text-gray-900 dark:text-white">
              <option value="All">Less Than 2000 $</option>
            </select>
          </div>
        </div>
      </header>
      <div className="px-6">
        <div className="overflow-x-auto whitespace-nowrap">
          <table className="table-auto w-full dark:text-slate-300">
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {filteredData.map((row, index) => (
                <tr key={index} style={{ borderStyle: "dashed" }}>
                  <td className="p-4 bg-info rounded-2 relative">
                    <div
                      className="absolute left-0 top-0 bottom-0"
                      style={{
                        backgroundColor: row.revenueBgColor,
                        width: "4px",
                        height: "calc(100% - 18px)",
                        top: "7px",
                        borderRadius: "2px",
                      }}
                    ></div>
                    <div className="flex flex-col ml-2">
                      <div className="text-slate-800 dark:text-slate-100">
                        {row.source}
                      </div>
                      <div
                        style={{
                          color: "#99A1B7",
                          fontSize: "11.4px",
                          lineHeight: 1,
                        }}
                      >
                        {row.description}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 bg-info rounded-2">
                    <div className="flex h-full">
                      <div style={{ color: "#99A1B7", fontSize: "11.4px" }}>
                        {row.labor}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 bg-info rounded-2">
                    <div className="flex h-full">
                      <div
                        style={{
                          backgroundColor: row.newColor,
                          color: "#17c653",
                          fontSize: 10,
                        }}
                        className="p-1 rounded-md"
                      >
                        {row.revenue}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 bg-info rounded-2">
                    <div className="flex flex-col items-start">
                      <div className="text-start">{row.teamMembers}</div>
                      <div
                        className="text-start"
                        style={{ color: "#99A1B7", fontSize: "11.4px" }}
                      >
                        Team Members
                      </div>
                    </div>
                  </td>
                  <td className="p-4 bg-info rounded-2">
                    <div className="flex flex-col items-start">
                      <div className="text-items-start text-slate-800 dark:text-slate-100">
                        {row.dateRange}
                      </div>
                      <div
                        className="text-items-start"
                        style={{ color: "#99A1B7", fontSize: "11.4px" }}
                      >
                        Date range
                      </div>
                    </div>
                  </td>
                  <td className="p-2 bg-info rounded-2">
                    <div className="flex flex-col items-start font bg-gray-100 p-2 rounded-md w-fit text-center dark:bg-neutral-800">
                      <FaArrowRight style={{ fontSize: "10px" }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Secondapp;
