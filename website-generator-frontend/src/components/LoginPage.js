import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Assuming you have CSS styles in this file

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    // Username validation
    if (!formData.username) {
      errors.username = "Username cannot be empty.";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.username)) {
      errors.username = "Username is invalid.";
      formIsValid = false;
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password cannot be empty.";
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      fetch("http://127.0.0.1:8000/login/", {
        // Update this URL to your actual login endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            // Convert non-2xx HTTP responses into errors
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Login successful:", data);
          // Assuming the backend sends back a token upon successful authentication
          localStorage.setItem("authToken", data.token);
          setErrors({}); // Clear any errors
          navigate("/dashboard"); // Adjust this to wherever you wish to redirect users upon login
        })
        .catch((error) => {
          console.error("Login failed:", error);
          setErrors({
            form: "Login failed. Please check your credentials and try again.",
          });
        });
    } else {
      console.log("Form has errors:", errors);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {errors.form && <p className="error">{errors.form}</p>}
        <div>
          <label>Username:</label>
          <input
            type="email"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
