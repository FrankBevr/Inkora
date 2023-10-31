import { useState } from "react";
import MindARThreeViewer from "./mindar-three-viewer";

const ArExperience = () => {
  const [started, setStarted] = useState(null);

  return (
    <div style={{ border: "2px solid green", margin: 20, borderRadius: 10 }}>
      <div className="control-buttons">
        {started === null && (
          <button
            onClick={() => {
              setStarted("three");
            }}
          >
            Start Coaster View
          </button>
        )}
        {started !== null && (
          <button
            onClick={() => {
              setStarted(null);
            }}
          >
            Stop
          </button>
        )}
      </div>
      {started === "three" && (
        <div className="container">
          <MindARThreeViewer />
        </div>
      )}
    </div>
  );
};

export default ArExperience;
