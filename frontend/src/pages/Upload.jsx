import { useState } from "react";
import api from "../services/api";

export default function Upload({ onResult }) {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    e.preventDefault();

    if (!file) {
      alert("Select a PDF first");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);

      // Upload PDF
      const uploadRes = await api.post(
        "/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      // Analyze extracted text
      const analyzeRes = await api.post(
        "/resume/analyze",
        {
          resumeText: uploadRes.data.textPreview,
          jobDescription: "Software Developer"
        }
      );

      onResult(analyzeRes.data);

    } catch (err) {
      alert("Upload failed");
    }

    setLoading(false);
  }

  return (
    <div>

      <h3>Upload Resume PDF</h3>

      <form onSubmit={handleUpload}>

        <input
          type="file"
          accept=".pdf"
          onChange={e => setFile(e.target.files[0])}
        />

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Upload & Analyze"}
        </button>

      </form>

    </div>
  );
}
