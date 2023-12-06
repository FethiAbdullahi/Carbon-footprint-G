import React from "react";
import Recommendation from "./Recommendation";
import "../styles/Recommendations.css";

function Recommendations(props) {
  const { data } = props;
  const {
    electric,
    gas,
    flights,
    recycle,
    electricSource,
    vehicleType,
    total,
  } = data;

  const electricPercentage = electric / total;
  const gasPercentage = gas / total;
  const LaptopPcUsageofOwn = numberofpeople / total;
  const LaptopPcUsageofCompany = numberofpeople / total;

  const createRecommendations = () => {
    const recommendations = [];

    switch (electricSource) {
      case "renewable":
        recommendations.push("renewable");
        break;
      case "coal":
        recommendations.push("coal");
        break;
      case "petroleum":
        recommendations.push("petroleum");
        break;
      case "naturalGas":
        recommendations.push("naturalGas");
        break;
      case "dontKnow":
        recommendations.push("dontKnow");
        break;
    }

    switch (vehicleType) {
      case "gas":
        recommendations.push("gas");
        break;
      case "hybrid":
        recommendations.push("hybrid");
        break;
      case "electric":
        recommendations.push("electric");
        break;
    }

    if (electricPercentage > 0.3) {
      recommendations.push("electricPercentage");
    }

    if (gasPercentage > 0.3) {
      recommendations.push("gasPercentage");
    }

    if (LaptopPcUsageofOwn > 0.25) {
      recommendations.push("LaptopPcUsageofOwnPercentage");
    }

    if (LaptopPcUsageofCompany > 0.25) {
      recommendations.push("LaptopPcUsageofCompanyPercentage");
    } 
    if (recycle !== 0) {
      recommendations.push("recycle");
    }

    return recommendations;
  };

  const recommendations = createRecommendations();
  return (
    <div className="recommendation-container">
      {recommendations.length > 0 ? (
        recommendations.map((recommendationKey, index) => (
          <Recommendation
            key={`${recommendationKey}-${index}`}
            recommendationKey={recommendationKey}
          />
        ))
      ) : (
        <p>No recommendations available.</p>
      )}
    </div>
  );
}

export default Recommendations;
