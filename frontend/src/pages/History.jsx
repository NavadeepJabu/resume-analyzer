import { useEffect, useState } from "react";
import api from "../services/api";

export default function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    async function fetchHistory() {
      try {

        const res = await api.get("/resume/history");
        setHistory(res.data);

      } catch (err) {
        alert("Failed to load history");
      }
    }

    fetchHistory();

  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <h3>My Analysis History</h3>

      {history.length === 0 && (
        <p>No reports yet.</p>
      )}

      {history.map((item) => (

        <div
          key={item._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px"
          }}
        >

          <p>
            <b>Date:</b>{" "}
            {new Date(item.createdAt).toLocaleString()}
          </p>

          <p>
            <b>Score:</b> {item.matchScore}%
          </p>

          <p>
            <b>Missing:</b>{" "}
            {item.missingSkills.join(", ")}
          </p>

        </div>

      ))}

    </div>
  );
}
