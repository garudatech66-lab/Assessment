import React from "react";

const PdfPrintButton = () => {

  const handlePrint = async () => {
    try {
      // API call to get the PDF URL (adjust as needed)
      const response = await fetch("/download-pdf", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to download PDF");
      }

      // Assuming backend returns: { url: "https://..." }
      const data = await response.json();

      // Open the PDF in a new browser tab
      window.open(data.url, "_blank");
      
    } catch (err) {
      console.error("Error downloading PDF:", err);
    }
  };

  return (
    <button onClick={handlePrint}>
      Print PDF
    </button>
  );
};

export default PdfPrintButton;
