import React, { useEffect } from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import "../styles/ChartsAndFigures.css";
const ChartsAndFigures = ({ data, total }) => {
  let footprintCategory = "";
  if (total >= 24) {
    footprintCategory = "High Carbon Footprint";
  } else if (total >= 16) {
    footprintCategory = "Medium Carbon Footprint";
  } else {
    footprintCategory = "Low Carbon Footprint";
  }
useEffect(()=>{
  console.log("total", total);

})
  return (
    <div className="container">
      <h2 className="text-3xl font-bold mb-4 -mt-20 text-center">
        Your Carbon Footprint
      </h2>
      <PieChart data={data} />
      <div className="mb-6 text-center">
        Your annual CO2 emissions amount to <strong>{Math.ceil(total)}</strong>{" "}
        metric tonnes
      </div>

      <p className="text-center">
        Based on your emissions, you are categorized as having a{" "}
        <strong>{footprintCategory}</strong> .
      </p>
      <ul>
        <li className="font-semibold mb-2">
          Low Carbon Footprint: 6.00 to 15.99
        </li>
        <li className="font-semibold mb-2">
          Medium Carbon Footprint: 16.00 to 23.99
        </li>
        <li className="font-semibold">High Carbon Footprint: 24.00 to 31.99</li>
      </ul>
      <BarChart data={data} />
    </div>
  );
};

export default ChartsAndFigures;
