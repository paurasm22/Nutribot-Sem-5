import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HealthStatus = () => {
  const [selectedDisease1, setSelectedDisease1] = useState("");
  const [selectedDisease2, setSelectedDisease2] = useState("");
  const [otherConditions, setOtherConditions] = useState("");
  const navigate = useNavigate();
  const handleNext = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "healthStatus",
      JSON.stringify({
        selectedDisease1,
        selectedDisease2,
        otherConditions,
      })
    );
    navigate("/cookingstyle");
  };
  const handlePrev = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "healthStatus",
      JSON.stringify({
        selectedDisease1,
        selectedDisease2,
        otherConditions,
      })
    );

    navigate("/ingridients");
  };
  useEffect(() => {
    // Load data from localStorage
    const storedData = JSON.parse(localStorage.getItem("healthStatus"));
    if (storedData) {
      setSelectedDisease1(storedData.selectedDisease1 || "");
      setSelectedDisease2(storedData.selectedDisease2 || "");
      setOtherConditions(storedData.otherConditions || "");
    }
  }, []);
  return (
    <div>
      <form action="">
        <div className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto flex justify-center align-middle place-items-center h-screen  ">
          <div className="inner bg-gray-300  flex flex-col  py-5 px-6 rounded-lg w-[400px] gap-3">
            <h1 className="text-center font-extrabold text-4xl ">
              Health Status
            </h1>

            <h2 className="text-center font-bold text-2xl">
              Any existing Medical Conditions ?{" "}
            </h2>
            <select
              name="diseases"
              id="diseases"
              className="p-2 rounded-lg"
              value={selectedDisease1}
              onChange={(e) => setSelectedDisease1(e.target.value)}
            >
              <option value="" selected disabled>
                Select a Disease-1
              </option>
              <option value="diabetes">Diabetes</option>
              <option value="hypertension">
                Hypertension (High Blood Pressure)
              </option>
              <option value="cardiovascular_disease">
                Cardiovascular Disease
              </option>
              <option value="obesity">Obesity</option>
              <option value="anemia">Anemia</option>
              <option value="osteoporosis">Osteoporosis</option>
              <option value="kidney_disease">Chronic Kidney Disease</option>
              <option value="gastrointestinal_disorders">
                Gastrointestinal Disorders (e.g., IBS, GERD)
              </option>
              <option value="pcos">Polycystic Ovary Syndrome (PCOS)</option>
              <option value="thyroid_disorders">
                Thyroid Disorders (e.g., Hypothyroidism)
              </option>
            </select>
            <select
              name="diseases"
              id="diseases"
              className="p-2 rounded-lg"
              value={selectedDisease2}
              onChange={(e) => setSelectedDisease2(e.target.value)}
            >
              <option value="">Select a Disease-2</option>
              <option value="diabetes">Diabetes</option>
              <option value="hypertension">
                Hypertension (High Blood Pressure)
              </option>
              <option value="cardiovascular_disease">
                Cardiovascular Disease
              </option>
              <option value="obesity">Obesity</option>
              <option value="anemia">Anemia</option>
              <option value="osteoporosis">Osteoporosis</option>
              <option value="kidney_disease">Chronic Kidney Disease</option>
              <option value="gastrointestinal_disorders">
                Gastrointestinal Disorders (e.g., IBS, GERD)
              </option>
              <option value="pcos">Polycystic Ovary Syndrome (PCOS)</option>
              <option value="thyroid_disorders">
                Thyroid Disorders (e.g., Hypothyroidism)
              </option>
            </select>
            <input
              className=" bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="text"
              id="ingridients"
              placeholder="Not in options enter here (seperate by ',') "
              value={otherConditions}
              onChange={(e) => setOtherConditions(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                className="bg-red-400 y-300 hover:bg-green-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center"
                onClick={handlePrev}
              >
                Back
              </button>
              <button
                className="bg-green-400 y-300 hover:bg-green-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center "
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HealthStatus;
