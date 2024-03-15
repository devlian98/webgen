import React from "react";
import { useNavigate } from "react-router-dom";

function WebsiteItem({ business }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-website/${business.id}`);
  };

  // Assuming 'previewUrl' is a property of your business object that contains the URL for previewing the website
  const handlePreview = () => {
    if (business.previewUrl) {
      window.open(business.previewUrl, "_blank");
    } else {
      alert("Preview URL not available.");
    }
  };

  return (
    <div className="website-item">
      <h2>{business.name}</h2>
      {/* Check if description exists, display it. Otherwise, you might show 'No description available' or similar */}
      <p>{business.name || "No description available"}</p>
      <div className="actions">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handlePreview}>Preview</button>
        {/* Implement delete functionality if needed */}
      </div>
    </div>
  );
}

export default WebsiteItem;
