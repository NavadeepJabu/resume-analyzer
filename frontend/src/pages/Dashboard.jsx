import { useState } from "react";

import Upload from "./Upload";
import History from "./History";

export default function Dashboard() {

  const [result, setResult] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <div style={{ padding: "30px" }}>

      <h2>Resume Analyzer Dashboard</h2>

      <button onClick={handleLogout}>
        Logout
      </button>

      <br /><br />

      <button
        onClick={() => setShowHistory(!showHistory)}
      >
        {showHistory ? "Back to Upload" : "View History"}
      </button>

      <br /><br />

      {showHistory ? (

        <History />

      ) : (

        <>
          <Upload onResult={setResult} />

          <br /><br />

          {result && (
            <div>

              <h3>Match Score: {result.matchScore}%</h3>

              <p>
                <b>Missing Skills:</b>{" "}
                {result.missingSkills.join(", ")}
              </p>

              <p><b>Suggestions:</b></p>

              <ul>
                {result.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>

            </div>
          )}
        </>
      )}

    </div>
  );
}
