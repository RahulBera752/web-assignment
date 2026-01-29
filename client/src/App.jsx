import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Landing from "./components/Landing";
import EditForm from "./components/EditForm";

export default function App() {
  const [content, setContent] = useState({
    businessName: "Business Name",
    companies: [
      "BBC",
      "TIME",
      "The New York Times",
      "CNBC",
      "Forbes",
      "Bloomberg",
    ],
    about: "Lorem ipsum about company...",
    why: "Lorem ipsum why choose us...",
  });

  /* LOAD DATA FROM MONGODB */
  useEffect(() => {
    fetch("http://localhost:5000/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data) setContent(data);
      })
      .catch((err) => console.error("Failed to load content", err));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landing content={content} />} />
      <Route
        path="/edit"
        element={<EditForm content={content} setContent={setContent} />}
      />
    </Routes>
  );
}
