import { useState } from "react";
import { useRouter } from "next/router";
import "../styles/questionnaire.css";
import questions from "../api/questions";

const QuestionnairePage = () => {
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [questionnaireData, setQuestionnaireData] = useState({
    gasBill: "",
    electricBill: "",
    recycle: false,
    carOwners: "",
    LaptopPcUsageofOwn: "",
    LaptopPcUsageofCompany: "",
    vehicleType:"gas",
    electricSource:"naturalGas",
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (type === "text") {
      if (
        name === "carOwners" ||
        name === "gasBill" ||
        name === "electricBill"
      ) {
        // Allow only numeric and decimal values
        newValue = value.replace(/[^0-9.]/g, "");
      } else if (
        name === "numberOfPeople" ||
        name === "LaptopPcUsageofOwn" ||
        name === "LaptopPcUsageofCompany"
      ) {
        // Allow only numeric values
        newValue = value.replace(/[^0-9]/g, "");
      }
    }

    if (type === "checkbox") {
      newValue = checked;
    }

    setQuestionnaireData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(questionnaireData, 'handle')
    const unansweredQuestions = Object.keys(questionnaireData).filter(
      (key) => questionnaireData[key] === ""
    );

    if (unansweredQuestions.length > 0) {
      console.log(unansweredQuestions.length);
      setShowPopup(true);
      return;
    }

    // Set default value to 0 for fields with empty values
console.log(questionnaireData, 'before');
    const updatedQuestionnaireData = {
      ...questionnaireData,
      gasBill: questionnaireData.gasBill || 0,
      electricBill: questionnaireData.electricBill || 0,
      carOwners: questionnaireData.carOwners || 0,
      LaptopPcUsageofOwn: questionnaireData.LaptopPcUsageofOwn || 0,
      LaptopPcUsageofCompany: questionnaireData.LaptopPcUsageofCompany || 0,
    };
console.log(questionnaireData , 'after');
console.log(updatedQuestionnaireData, 'updated')
    // Redirect to the result page with the questionnaire data
    router.push({
      pathname: "/result",
      query: updatedQuestionnaireData,
    });
    // Set isFormSubmitted to true after form submission
    setFormSubmitted(true);
  };

  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(questionnaireData).filter(
    (key) => questionnaireData[key] !== ""
  ).length;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="container">
      <div className="backgroundImage"></div>
      <div className="snow"></div>
      <h1 className="title">Gebeya Carbon Footprint Questionnaire</h1>

      <div className="progress-bar">
        <div
          className={`progress ${isFormSubmitted ? "animation" : ""}`}
          style={{ width: `${progressPercentage}%` }}
        ></div>

        <div
          className="progress"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-column">
          {questions
            .slice(0, Math.ceil(questions.length / 2))
            .map((question) => (
              <div className="question" key={question.id}>
                <div className="question-row">
                  {question.icon && (
                    <img
                      src={question.icon}
                      alt={`${question.label} icon`}
                      className="question-icon"
                    />
                  )}
                  <label htmlFor={question.id}>{question.label}</label>
                </div>
                {question.type === "select" ? (
                  <select
                    className="question-select"
                    id={question.id}
                    name={question.id}
                    value={questionnaireData[question.id]}
                    onChange={handleInputChange}
                  >
                    {question.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="input-container">
                    <input
                      type={question.type}
                      id={question.id}
                      name={question.id}
                      value={questionnaireData[question.id]}
                      onChange={handleInputChange}
                    />
                    {question.unit && (
                      <span className="unit">{question.unit}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>
        <div className="form-column">
          {questions.slice(Math.ceil(questions.length / 2)).map((question) => (
            <div className="question" key={question.id}>
              <div className="question-row">
                {question.icon && (
                  <img
                    src={question.icon}
                    alt={`${question.label} icon`}
                    className="question-icon"
                  />
                )}
                <label htmlFor={question.id}>{question.label}</label>
              </div>
              {question.type === "select" ? (
                <select
                  className="question-select"
                  id={question.id}
                  name={question.id}
                  value={questionnaireData[question.id]}
                  onChange={handleInputChange}
                >
                  {question.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="input-container">
                  <input
                    type={question.type}
                    id={question.id}
                    name={question.id}
                    value={questionnaireData[question.id]}
                    onChange={handleInputChange}
                  />
                  {question.unit && (
                    <span className="unit">{question.unit}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="buttonContainer">
          <button type="submit" className="calculate-button">
            Calculate
          </button>
        </div>
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <p>Please complete all the questions before submitting.</p>
              <button onClick={() => setShowPopup(false)}>OK</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default QuestionnairePage;
