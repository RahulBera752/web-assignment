import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EditForm({ content, setContent }) {
  const navigate = useNavigate();

  // Local state for companies (comma separated)
  const [companiesInput, setCompaniesInput] = useState("");

  // 🔥 SYNC INPUT WHEN CONTENT LOADS FROM MONGODB
  useEffect(() => {
    setCompaniesInput(content.companies?.join(", ") || "");
  }, [content.companies]);

  const handleSave = async () => {
    const updatedContent = {
      ...content,
      companies: companiesInput
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch("http://localhost:5000/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedContent),
      });

      if (!res.ok) {
        throw new Error("Failed to save data");
      }

      // ✅ UPDATE REACT STATE ONLY AFTER DB SUCCESS
      setContent(updatedContent);
      navigate("/");
    } catch (error) {
      console.error("Save failed:", error);
      alert("❌ Data not saved to MongoDB");
    }
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>Edit Page Content</h1>

      {/* BUSINESS NAME */}
      <label style={styles.label}>Business Name</label>
      <input
        style={styles.input}
        value={content.businessName}
        onChange={(e) =>
          setContent({ ...content, businessName: e.target.value })
        }
        placeholder="Enter business name"
      />

      {/* ABOUT */}
      <label style={styles.label}>About Company</label>
      <textarea
        style={styles.textarea}
        value={content.about}
        onChange={(e) =>
          setContent({ ...content, about: e.target.value })
        }
        placeholder="Write about your company"
      />

      {/* WHY */}
      <label style={styles.label}>Why Choose Us</label>
      <textarea
        style={styles.textarea}
        value={content.why}
        onChange={(e) =>
          setContent({ ...content, why: e.target.value })
        }
        placeholder="Why customers should choose you"
      />

      {/* COMPANIES */}
      <label style={styles.label}>
        Company Names (comma separated)
      </label>
      <input
        style={styles.input}
        value={companiesInput}
        onChange={(e) => setCompaniesInput(e.target.value)}
        placeholder="BBC, TIME, CNBC, Forbes"
      />

      {/* ACTIONS */}
      <div style={styles.actions}>
        <button style={styles.saveBtn} onClick={handleSave}>
          Save Changes
        </button>

        <button
          style={styles.cancelBtn}
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "#000",
    color: "#fff",
    padding: "60px 40px",
    maxWidth: "700px",
    margin: "auto",
  },
  title: {
    color: "gold",
    marginBottom: "40px",
    textAlign: "center",
  },
  label: {
    display: "block",
    marginTop: "20px",
    marginBottom: "8px",
    color: "#aaa",
    fontSize: "14px",
    letterSpacing: "1px",
  },
  input: {
    width: "100%",
    padding: "12px",
    background: "#111",
    border: "1px solid #333",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "14px",
  },
  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "12px",
    background: "#111",
    border: "1px solid #333",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "14px",
    resize: "vertical",
  },
  actions: {
    display: "flex",
    gap: "14px",
    marginTop: "40px",
    justifyContent: "center",
  },
  saveBtn: {
    background: "gold",
    color: "#000",
    border: "none",
    padding: "12px 24px",
    fontWeight: "600",
    cursor: "pointer",
    borderRadius: "20px",
  },
  cancelBtn: {
    background: "transparent",
    color: "#aaa",
    border: "1px solid #444",
    padding: "12px 24px",
    cursor: "pointer",
    borderRadius: "20px",
  },
};
