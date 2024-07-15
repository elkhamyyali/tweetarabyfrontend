import React from "react";
import ApexChart from "./ApexChart";
import Image01 from "../../assets/user-36-05.jpg";
import Image02 from "../../assets/user-36-06.jpg";
import Image03 from "../../assets/user-36-07.jpg";
import Image04 from "../../assets/user-36-08.jpg";
import Image05 from "../../assets/user-36-09.jpg";
import {
  FaArrowUp,
  FaArrowDown,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import Image, { StaticImageData } from "next/image";

type Customer = {
  id: string;
  name: string;
  email: string;
  location: string;
  spent: string;
  availability: string;
  chartData: number[];
  image: StaticImageData;
  color: string;
};

const customers: Customer[] = [
  {
    id: "0",
    name: "Alex Shatov",
    email: "alexshatov@gmail.com",
    location: "🇺🇸",
    spent: "$2,890.66",
    availability: "Available",
    chartData: [20, 301, 225, 51, 300, 25, 501, 30, 221],
    image: Image01,
    color: "#29b6f6",
  },
  {
    id: "1",
    name: "Philip Harbach",
    email: "philip.h@gmail.com",
    location: "🇩🇪",
    spent: "$2,767.04",
    availability: "Unavailable",
    chartData: [30, 201, 35, 151, 40],
    image: Image02,
    color: "#ffee58",
  },
  {
    id: "2",
    name: "Mirko Fisuk",
    email: "mirkofisuk@gmail.com",
    location: "🇫🇷",
    spent: "$2,996.00",
    availability: "Pending",
    chartData: [30, 201, 35, 151, 40],
    image: Image03,
    color: "#ffab91",
  },
  {
    id: "3",
    name: "Olga Semklo",
    email: "olga.s@cool.design",
    location: "🇮🇹",
    spent: "$1,220.66",
    availability: "Available",
    chartData: [40, 101, 45, 251, 50],
    image: Image04,
    color: "#29b6f6",
  },
  {
    id: "4",
    name: "Burak Long",
    email: "longburak@gmail.com",
    location: "🇬🇧",
    spent: "$1,890.66",
    availability: "Unavailable",
    chartData: [20, 301, 225, 51, 300, 25, 501, 30, 221],
    image: Image05,
    color: "#ffee58",
  },
];

const Thirdtable: React.FC = () => {
  return (
    <div className="col-span-full xl:col-span-12 shadow-md rounded-lg border border-slate-200">
      {/* <header className="px-5 pt-4 flex justify-between content-center">
        <div>
          <h2 className="font-semibold text-slate-800">Top Channels</h2>
          <p
            style={{ fontSize: "12px" }}
            className="text-gray-400 mr-2 hover:text-slate-800 font-thin"
          >
            Customers 254
          </p>
        </div>
        <div>
          <button className="bg-gray-100 rounded-lg text-sm text-black px-3 py-1">
            History
          </button>
        </div>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto whitespace-nowrap">
          <table className="table-auto w-full">
            <thead
              className="text-xs font-semibold uppercase text-slate-400"
              style={{ lineHeight: 3 }}
            >
              <tr>
                <th className="p-1 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-1 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-1 whitespace-nowrap">
                  <div className="font-semibold text-left">Spent</div>
                </th>
                <th className="p-1 whitespace-nowrap">
                  <div className="font-semibold text-left">Status</div>
                </th>
                <th className="p-1 whitespace-nowrap">
                  <div className="font-semibold text-center">Chart</div>
                </th>
                <th className="p-1 whitespace-nowrap">
                  <div className="font-semibold text-center">Icon</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-slate-100">
              {customers.map((customer) => (
                <tr key={customer.id} style={{ borderStyle: "dashed" }}>
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                        <Image
                          className="image-square"
                          src={customer.image}
                          alt={customer.name}
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="font-thin text-gray-400">
                          {customer.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-2 text-gray-400 font-semibold">
                    {customer.email}
                  </td>
                  <td className="p-2">
                    <div
                      style={{
                        backgroundColor:
                          customer.availability === "Available"
                            ? "#DFFFEA"
                            : customer.availability === "Unavailable"
                            ? "#FFEEF3"
                            : "#FFF8DD",
                        borderRadius: "0.375rem",
                        padding: "0.25rem",
                        display: "inline-block",
                        color:
                          customer.availability === "Available"
                            ? "#000000"
                            : customer.availability === "Unavailable"
                            ? "#302024"
                            : "#F6C000",
                      }}
                    >
                      {customer.spent}
                    </div>
                  </td>
                  <td className="p-2">
                    <div
                      style={{
                        backgroundColor:
                          customer.availability === "Available"
                            ? "#DFFFEA"
                            : customer.availability === "Unavailable"
                            ? "#FFEEF3"
                            : "#FFF8DD",
                        borderRadius: "0.375rem",
                        padding: "0.25rem",
                        display: "inline-block",
                        color:
                          customer.availability === "Available"
                            ? "#000000"
                            : customer.availability === "Unavailable"
                            ? "#302024"
                            : "#F6C000",
                      }}
                      className="w-fit"
                    >
                      {customer.availability}
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex justify-center">
                      <ApexChart data={[customer]} color={customer.color} />
                    </div>
                  </td>
                  <td className="p-2 text-center">
                    {customer.availability === "Available" ? (
                      <FaArrowRight className="bg-gray-100 mx-auto text-gray-400 p-1 rounded-md font-extrabold text-xl" />
                    ) : customer.availability === "Unavailable" ? (
                      <FaArrowLeft className="bg-gray-100 mx-auto text-gray-400 p-1 rounded-md font-extrabold text-xl" />
                    ) : (
                      <span className="text-blue-500 mx-auto text-center">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
};

export default Thirdtable;
