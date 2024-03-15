import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css"; // Assuming you have a CSS file for styling

function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid.";
      formIsValid = false;
    }

    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("laude");

    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:8000/register/", {
          // Updated endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          console.log(jsonResponse);
          navigate("/login"); // Redirect on success
        } else {
          const jsonResponse = await response.json();
          // Handle backend validation errors (e.g., username already exists)
          if (jsonResponse.error) {
            setErrors({ form: jsonResponse.error });
          }
        }
      } catch (error) {
        console.error(error);
        setErrors({ form: "An error occurred. Please try again later." });
      }
    } else {
      console.log("Form has errors:", errors);
    }
  };

  return (
    <div className="sign-up-page">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {errors.form && <p className="error">{errors.form}</p>}{" "}
        {/* Display form-wide errors */}
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username || ""}
            onChange={handleInputChange}
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpPage;
