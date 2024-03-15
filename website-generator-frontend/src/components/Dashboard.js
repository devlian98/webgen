import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import WebsiteItem from "./WebsiteItem";

function Dashboard() {
  console.log("Dashboard is rendering");

  const [business_types, setbusiness_types] = useState([]);

  useEffect(() => {
    // Placeholder for fetching user's websites from the backend
    axios
      .get("http://127.0.0.1:8000/api/business_types/")
      .then((response) => {
        console.log("API response:", response.data);
        setbusiness_types(response.data.business_types);
      })
      .catch((error) =>
        console.error("There was an error fetching the websites: ", error)
      );
  }, []);

  return (
    // In Dashboard.js, within the return statement
    <div className="website-list">
      {business_types.map((business) => (
        <WebsiteItem key={business.id} business={business} />
      ))}
    </div>
  );
}

export default Dashboard;
