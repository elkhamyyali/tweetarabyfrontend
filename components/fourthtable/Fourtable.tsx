import React, { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";

function Fourthtable() {
  // Define state variables
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [filterOption, setFilterOption] = useState<string>("All");

  // Sample data (replace with your actual data)
  const data = [
    {
      domain: "Github.com",
      ipAddress: "192.168.1.1",
      cpu: "8 Core",
      price: "$50.54",
      server: "Server A",
      status: "Active",
      availability: "Available",
      OrderId: "lck-76554",
    },
    {
      domain: "Facebook.com",
      ipAddress: "192.168.1.2",
      cpu: "4 Core",
      price: "$30.54",
      server: "Server B",
      status: "pending",
      availability: "Not Available",
      OrderId: "slss-3i3i",
    },
    {
      domain: "Twitter.com",
      ipAddress: "192.168.1.3",
      cpu: "6 Core",
      price: "$45.54",
      server: "Server C",
      status: "Active",
      availability: "Available",
      OrderId: "abc-12345",
    },
    {
      domain: "Yahoo.com",
      ipAddress: "192.168.1.11",
      cpu: "8 Core",
      price: "$55.54",
      server: "Server K",
      status: "Active",
      availability: "Available",
      OrderId: "ghi-56789",
    },
    {
      domain: "Reddit.com",
      ipAddress: "192.168.1.12",
      cpu: "4 Core",
      price: "$25.54",
      server: "Server L",
      status: "pending",
      availability: "Not Available",
      OrderId: "zab-98765",
    },
  ];

  // Function to handle search input changes
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value.toLowerCase(); // Get the current value from the input field in lowercase
    setSearchQuery(query); // Update the state with the search query

    // Filter data based on the search query
    const filtered = data.filter((item) =>
      item.domain.toLowerCase().includes(query)
    );
    setFilteredData(filtered); // Update filtered data state
  };

  // Function to handle filter select changes
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const option = event.target.value;
    setFilterOption(option); // Update filter option state

    if (option === "All") {
      setFilteredData([]); // Reset filtered data
    } else {
      // Filter data based on the selected option
      const filtered = data.filter((item) => item.domain === option);
      setFilteredData(filtered); // Update filtered data state
    }
  };

  // Use filteredData instead of data to render table rows
  const rows = filteredData.length > 0 ? filteredData : data;

  return (
    <div
      className="col-span-full xl:col-span-12 shadow-md rounded-lg border border-slate-200 dark:border-none"
      style={{
        background: "#FFFFFF",
        border: "1px solid #F1F1F4",
      }}
    >
      <header className="px-5 py-4 flex justify-between items-center flex-wrap">
        <div>
          <h2 className="font-semibold text-slate-800 dark:text-gray-400">
            Top Products
          </h2>
          <p
            style={{ fontSize: "10px" }}
            className="text-gray-400 mr-2 hover:text-slate-800 font-inter dark:text-gray-400"
          >
            Avg : 254 product
          </p>
        </div>
        {/* Filter select and search input */}
        <div className="flex items-center">
          {/* Filter select */}
          <div className="flex items-center flex-wrap">
            <span
              style={{
                fontWeight: "bold",
                fontSize: "0.80rem",
                color: "#99A1B7",
              }}
            >
              Source
            </span>
            <select
              className="bg-transparent text-sm border-none font-bold"
              value={filterOption}
              onChange={handleFilterChange}
              style={{ paddingLeft: "0.52rem", paddingRight: "0rem" }}
            >
              <option value="All">All Items</option>
              {data.map((item, index) => (
                <option key={index} value={item.domain}>
                  {item.domain}
                </option>
              ))}
            </select>

            <span
              style={{
                fontWeight: "bold",
                fontSize: "0.80rem",
                color: "#99A1B7",
              }}
            >
              {" "}
              Budget
            </span>
            <select
              style={{
                color: "#252F4A",
                fontWeight: "11.4px",
              }}
              className="bg-transparent rounded-md py-1 px-2 text-xs pr-8 border-none font-bold text-gray- dark:text-white"
            >
              <option value="All">Less Than 2000 $</option>
            </select>
          </div>

          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="focus:border-none target:border-none dark:border-gray-500 block w-full sm:w-36 md:w-48 py-1.5 pl-10 pr-3 text-sm rounded-md border border-gray-300 bg-transparent"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />

            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
          </div>
        </div>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto whitespace-nowrap">
          <table className="table-auto w-full dark:text-slate-300 whitespace-nowrap">
            {/* Table header */}
            <thead className="border-b-1 border-dashed border-gray-500 text-xs uppercase text-slate-400 dark:text-slate-500 rounded-sm">
              <tr>
                <th className="p-1">
                  <div className="font-medium text-left">OrderId</div>
                </th>
                <th className="p-1">
                  <div className="font-medium text-left">Domain</div>
                </th>
                <th className="p-1">
                  <div className="font-medium text-left">IP Address</div>
                </th>
                <th className="p-1">
                  <div className="font-medium text-left">CPU</div>
                </th>
                <th className="p-1">
                  <div className="font-medium text-left">Price</div>
                </th>
                <th className="p-1">
                  <div className="font-medium text-left">Server</div>
                </th>
                <th className="p-1">
                  <div className="font-medium text-left ">Status</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-xs font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {/* Render table rows */}
              {rows.map((item, index) => (
                <tr key={index} className="border-b-inherit border-dashed ">
                  <td className="p-1">
                    <div className="font-extrabold text-black dark:text-gray-400">
                      {item.OrderId}
                    </div>
                  </td>
                  <td className="p-1">
                    <div className="flex items-center">
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: "0.70rem",
                          color: "#78829D",
                        }}
                      >
                        {item.domain}
                      </div>
                    </div>
                  </td>
                  <td className="p-1">
                    <div className="flex items-center">
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: "0.70rem",
                          color: "#78829D",
                        }}
                      >
                        {item.ipAddress}
                      </div>
                    </div>
                  </td>
                  <td className="p-1">
                    <div className="flex items-center">
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: "0.70rem",
                          color: "#78829D",
                        }}
                      >
                        {item.cpu}
                      </div>
                    </div>
                  </td>
                  <td className="p-1">
                    <div className="flex items-center">
                      <div className=" font-extrabold text-black dark:text-gray-400">
                        {item.price}
                      </div>
                    </div>
                  </td>
                  <td className="p-1">
                    <div className="flex items-center">
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: "0.70rem",
                          color: "#78829D",
                        }}
                      >
                        {item.server}
                      </div>
                    </div>
                  </td>
                  <td className="p-1">
                    <div className="flex items-center">
                      <span className="bg-green-100 text-green-800 dark:bg-green-700 dark:text-slate-200 rounded-md px-2 py-0.5 text-xs font-semibold">
                        {item.status}
                      </span>
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
}

export default Fourthtable;
