const questions = [
  {
    id: "numberOfPeople",
    label: "How many people are sharing the electricity in the Office?",
    type: "text",
    unit: "numberOfPeople",
    icon: "/images/group.png",
  },
  {
    id: "electricBill",
    label: "How much do you spend on your monthly electric bill?",
    type: "text",
    unit: "USD",
    icon: "/images/plug.png",
  },
  {
    id: "electricSource",
    label: "What is the source of your electricity?",
    type: "select",
    options: [
      { value: "renewable", label: "Renewable" },
      { value: "coal", label: "Coal" },
      { value: "petroleum", label: "Petroleum" },
      { value: "naturalGas", label: "Natural Gas" },
      { value: "dontKnow", label: "Don't Know" },
    ],
    icon: "/images/power.png",
  },
  {
    id: "recycle",
    label: "Do you actively recycle?",
    type: "select",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
    icon: "/images/garbage.png",
  },
  {
    id: "vehicleType",
    label: "What type of vehicle do you have?",
    type: "select",
    options: [
      { value: "gas", label: "Gas Vehicle" },
      { value: "hybrid", label: "Hybrid Vehicle" },
      { value: "electric", label: "Electric Vehicle" },
    ],
    icon: "/images/car.png",
  },
  {
    id: "gasBill",
    label: "How much do you spend on your monthly gas bill?",
    type: "text",
    unit: "USD",
    icon: "/images/fuel.png",
  },
  {
    id: "carOwners",
    label: "How many of your Stafs have car?",
    type: "text",
    unit: "numberOfPeople",
    icon: "/images/speed.png",
  },
  {
    id: "LaptopPcUsageofOwn",
    label: "How many People have their own Pc/Laptop that uses in the Office?",
    type: "text",
    unit: "numberOfPeople",
    icon: "/images/group.png",
  },
  {
    id: "LaptopPcUsageofCompany",
    label:
      "How many People have access of Company Pc/Laptop that uses in the Office?",
    type: "text",
    unit: "numberOfPeople",
    icon: "/images/group.png",
  },
];

export default questions;
