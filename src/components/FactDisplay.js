"use client"
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import facts from "../api/facts";
import "../styles/FactDisplay.css";

const FactDisplay = () => {
  const [randomFact, setRandomFact] = useState("");

  useEffect(() => {
    getRandomFact();
  }, []);

  const getRandomFact = () => {
    const randomNo = Math.ceil(Math.random() * 20); // Generate random number between 0 and 19
    setRandomFact(facts[randomNo]); // Get the fact corresponding to the random number
  };

  return (
<div className="fact-container-wrapper">
  <div className="fact-container">
    <p className="fact-text">{randomFact}</p>
    <button className="next-button" onClick={getRandomFact}>
      <FontAwesomeIcon icon={faAngleRight} />
    </button>
  </div>
</div>

  );
};

export default FactDisplay;

