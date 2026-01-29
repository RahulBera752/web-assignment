import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EditForm({ content, setContent }) {
  const navigate = useNavigate();

  const [companiesInput, setCompaniesInput] = useState(
    content.companies?.join(", ") || ""
  );

  const handleSave = async () => {
    const updatedContent = {
      businessName: content.businessName,
      about: content.about,
      why: content.why,
      companies: companiesInput
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
    };

    setContent(updatedContent);

    try {
      const res = await fetch("http://localhost:5000/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContent),
      });

      if (!res.ok) throw new Error("Save failed");

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to save data to MongoDB");
    }
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>Edit Page Content</h1>

      <label style={styles.label}>Business Name</label>
      <input
        style={styles.input}
        value={content.businessName}
        onChange={(e) =>
          setContent({ ...content, businessName: e.target.value })
        }
      />

      <label style={styles.label}>About Company</label>
      <textarea
        style={styles.textarea}
        value={content.about}
        onChange={(e) =>
          setContent({ ...content, about: e.target.value })
        }
      />

      <label style={styles.label}>Why Choose Us</label>
      <textarea
        style={styles.textarea}
        value={content.why}
        onChange={(e) =>
          setContent({ ...content, why: e.target.value })
        }
      />

      <label style={styles.label}>Company Names (comma separated)</label>
      <input
        style={styles.input}
        value={companiesInput}
        onChange={(e) => setCompaniesInput(e.target.value)}
      />

      <div style={styles.actions}>
        <button style={styles.saveBtn} onClick={handleSave}>
          Save Changes
        </button>
        <button style={styles.cancelBtn} onClick={() => navigate("/")}>
          Cancel
        </button>
      </div>
    </div>
  );
}

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
  },
  input: {
    width: "100%",
    padding: "12px",
    background: "#111",
    border: "1px solid #333",
    color: "#fff",
    borderRadius: "6px",
  },
  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "12px",
    background: "#111",
    border: "1px solid #333",
    color: "#fff",
    borderRadius: "6px",
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
    borderRadius: "20px",
    cursor: "pointer",
  },
  cancelBtn: {
    background: "transparent",
    color: "#aaa",
    border: "1px solid #444",
    padding: "12px 24px",
    borderRadius: "20px",
    cursor: "pointer",
  },
};
