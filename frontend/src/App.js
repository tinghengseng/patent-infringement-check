import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Search from "./components/Search";
import Result from "./components/Result";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { jsPDF } from "jspdf";

const App = () => {
  const [patentID, setPatentID] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5001/check",
        {
          patentID: patentID,
          companyName: companyName,
        },
        {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
      );
      setResult(response.data);
    } catch (error) {
      setResult("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (result.length === 0) {
      alert("No results to download.");
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10; // Left and right margins
    const maxLineWidth = pageWidth - margin * 2; // Maximum width for text wrapping
    let y = 10; // Initial Y position

    // Title
    doc.setFontSize(16);
    doc.text("Patent Infringement Report", pageWidth / 2, y, {
      align: "center",
    });
    y += 10;

    // Add Patent ID and Company Name
    doc.setFontSize(12);
    doc.text(`Patent ID: ${patentID}`, margin, y);
    y += 7; // Adjust spacing
    doc.text(`Company Name: ${companyName}`, margin, y);
    y += 10; // Adjust spacing for next section

    result.forEach((result, index) => {
      const productText = `Product: ${result.product}`;
      const reasonText = `Reason: ${result.reason}`;

      // Wrap text for the product and reason
      const productLines = doc.splitTextToSize(productText, maxLineWidth);
      const reasonLines = doc.splitTextToSize(reasonText, maxLineWidth);

      // Add product details
      doc.text(productLines, margin, y);
      y += productLines.length * 10; // Adjust Y position for wrapped lines

      // Add reason details
      doc.text(reasonLines, margin, y);
      y += reasonLines.length * 10 + 10; // Adjust Y position for wrapped lines + spacing

      // Add a page break if close to bottom
      if (y > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        y = 10; // Reset Y position on new page
      }
    });

    // Save the PDF
    doc.save("report.pdf");
  };

  return (
    <div>
      <Header title="Patent Infridgement Checker" />
      <Search
        patentID={patentID}
        setPatentID={setPatentID}
        companyName={companyName}
        setCompanyName={setCompanyName}
        isLoading={loading}
        handleSubmit={handleCheckSubmit}
      />
      {loading ? (
        <div className="d-flex justify-content-center mt-4">
          <Spinner animation="border" variant="success" />
        </div>
      ) : typeof result === "string" && result !== "" ? (
        alert(result)
      ) : result != null && result.length > 0 ? (
        <Result results={result} handleDownload={downloadReport} />
      ) : null}
    </div>
  );
};

export default App;
