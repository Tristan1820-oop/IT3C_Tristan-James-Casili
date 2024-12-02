import { useState, useRef } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
    contactNo: "",
  });
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const [status, setStatus] = useState("idle");

  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const contactNoRef = useRef();

  const navigate = useNavigate();

  const handleOnChange = (event, field) => {
    setIsFieldsDirty(false);
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleRegister = async () => {
    setStatus("loading");

    try {
      const response = await axios.post("/admin/register", formData, {
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      alert("Registration successful! Please log in.");
      navigate("/login");
      setStatus("idle");
    } catch (error) {
      console.error(error);
      setStatus("idle");
      alert(error.response?.data?.message || "An error occurred.");
    }
  };

  const handleSubmit = () => {
    const { email, password, firstName, lastName, contactNo } = formData;

    if (!email || !password || !firstName || !lastName || !contactNo) {
      setIsFieldsDirty(true);
      if (!email) emailRef.current.focus();
      else if (!password) passwordRef.current.focus();
      else if (!firstName) firstNameRef.current.focus();
      else if (!lastName) lastNameRef.current.focus();
      else if (!contactNo) contactNoRef.current.focus();
      return;
    }

    handleRegister();
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-title">Register</h1>
        <p className="register-subtitle">Create a new account</p>
        <form className="register-form">
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              ref={emailRef}
              value={formData.email}
              onChange={(e) => handleOnChange(e, "email")}
            />
            {isFieldsDirty && !formData.email && (
              <span className="error-message">This field is required</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              ref={passwordRef}
              value={formData.password}
              onChange={(e) => handleOnChange(e, "password")}
            />
            {isFieldsDirty && !formData.password && (
              <span className="error-message">This field is required</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              ref={firstNameRef}
              value={formData.firstName}
              onChange={(e) => handleOnChange(e, "firstName")}
            />
            {isFieldsDirty && !formData.firstName && (
              <span className="error-message">This field is required</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="middleName">Middle Name (Optional)</label>
            <input
              id="middleName"
              type="text"
              placeholder="Enter your middle name"
              value={formData.middleName}
              onChange={(e) => handleOnChange(e, "middleName")}
            />
          </div>

          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              ref={lastNameRef}
              value={formData.lastName}
              onChange={(e) => handleOnChange(e, "lastName")}
            />
            {isFieldsDirty && !formData.lastName && (
              <span className="error-message">This field is required</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="contactNo">Contact Number</label>
            <input
              id="contactNo"
              type="text"
              placeholder="Enter your contact number"
              ref={contactNoRef}
              value={formData.contactNo}
              onChange={(e) => handleOnChange(e, "contactNo")}
            />
            {isFieldsDirty && !formData.contactNo && (
              <span className="error-message">This field is required</span>
            )}
          </div>

          <button
            className="register-btn"
            type="button"
            disabled={status === "loading"}
            onClick={handleRegister}
          >
            {status === "idle" ? "Register" : "Registering..."}
          </button>

          <div className="login-link">
              Already have an account? <a href="/">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
