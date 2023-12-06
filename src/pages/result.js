"use client";
import React, { useEffect, useState } from "react";
import "../styles/result.css";
import Recommendations from "@/components/Recommendations";
import FactDisplay from "@/components/FactDisplay";
import ChartsAndFigures from "@/components/ChartsAndFigures";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useSearchParams } from "next/navigation";

const Result = () => {
  const [activeTab, setActiveTab] = useState(0);
  const searchParams = useSearchParams();
  const gasBill = searchParams.get("gasBill");
  const electricBill = searchParams.get("electricBill");
  const recycle = searchParams.get("recycle");
  const carOwners = searchParams.get("carOwners");
  const LaptopPcUsageofOwn = searchParams.get("LaptopPcUsageofOwn");
  const LaptopPcUsageofCompany = searchParams.get("LaptopPcUsageofCompany");
  const electricSource = searchParams.get("electricSource");
  const vehicleType = searchParams.get("vehicleType");
  const numberOfPeople = searchParams.get("numberOfPeople");

  let electricEmissions = 0;
  let vehicleGasUsage = 0;
  let vehicleElectricityUsage = 0;
  let householdElectricityUsage = (electricBill * 105) / 1000;
  let gasEmissions = (gasBill * 105) / 1000;


  if (vehicleType === "gas") {
    vehicleGasUsage += (carOwners * 2.31) / 1000;
  } else if (vehicleType === "hybrid") {
    vehicleGasUsage += (carOwners * 1.56) / 1000;
  } else if (vehicleType === "electric") {
    vehicleElectricityUsage += (carOwners * 0.12) / 1000;
  }

  if (electricSource === "coal") {
    electricEmissions = householdElectricityUsage * 0.975;
    vehicleElectricityUsage = vehicleElectricityUsage * 0.975;
  } else if (electricSource === "petroleum") {
    electricEmissions = householdElectricityUsage * 0.75;
    vehicleElectricityUsage = vehicleElectricityUsage * 0.75;
  } else if (electricSource === "naturalGas") {
    electricEmissions = householdElectricityUsage * 0.5;
    vehicleElectricityUsage = vehicleElectricityUsage * 0.5;
  } else if (electricSource === "dontKnow") {
    electricEmissions = householdElectricityUsage * 0.6;
    vehicleElectricityUsage = vehicleElectricityUsage * 0.6;
  }

  let electricEmissionsPerPerson = electricEmissions / numberOfPeople; // changed to only household electrical usage
  let vehicleGasUsagePerPerson =
    (vehicleGasUsage + vehicleElectricityUsage) / numberOfPeople; // changed to electric and gas usage
  let LaptopPcusageofOwn = (numberOfPeople * 105) / 1000;
  let LaptopPcusageofCompany = (numberOfPeople * 105) / 1000;
  const doesRecycle = recycle ? 0 : 350 / 1000;
  let total =
    electricEmissionsPerPerson +
    vehicleGasUsagePerPerson +
    electricBill+
    LaptopPcUsageofOwn +
    LaptopPcUsageofCompany +
    doesRecycle;

  const recommendationData = {
    electric: electricEmissionsPerPerson,
    gas: vehicleGasUsagePerPerson,
    LaptopPcUsageofOwn: electricEmissionsPerPerson,
    LaptopPcUsageofCompany: electricEmissionsPerPerson,
    recycle: doesRecycle,
    electricSource: electricSource,
    vehicleType: vehicleType,
    total: total,
  };
  useEffect(()=>{
    console.log("total", total);
  
  })
  const data = {
    labels: [
      "Vehicle Usage",
      "Gas Emissions",
      "CarOwners",
      "LaptopPcUsageofOwn",
      "LaptopPcUsageofCompany",
      "Electric Emissions",
      "Recycle",
    ],
    datasets: [
      {
        label: "Tonnes of CO2",
        data: [
          vehicleGasUsagePerPerson,
          gasEmissions,
          electricEmissionsPerPerson,
          carOwners,
          LaptopPcUsageofOwn,
          LaptopPcUsageofCompany,
          doesRecycle,
        ],
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="pb-44">
      <div className="backgroundImage" />
      <div className="leaves" />

      <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
        <TabList className="custom-tab-list">
          <Tab className="custom-tab">Your Carbon Footprint</Tab>
          <Tab className="custom-tab">Recommendations</Tab>
          <Tab className="custom-tab">Facts</Tab>
        </TabList>

        <div className="tabs-container">
          <TabPanel>
            <ChartsAndFigures data={data} total= {total} />
          </TabPanel>
          <TabPanel>
            <Recommendations data={recommendationData} />
          </TabPanel>
          <TabPanel>
            <FactDisplay />
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default Result;
