import { useState, useRef } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../utils/hooks/useDebounce";
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
  const [error, setError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const debouncedFormData = useDebounce(formData, 2000);

  const handleOnChange = (event, field) => {
    setIsFieldsDirty(true);
    setFormData((prevData) => ({
      ...prevData,
      [field]: event.target.value,
    }));
  };

  const handleRegister = async () => {
    setStatus("loading");
    setError("");

    try {
      const response = await axios.post("/admin/register", formData, {
        headers: { "Access-Control-Allow-Origin": "*" },
      });

      localStorage.setItem("accessToken", response.data.access_token);
      navigate("/");
    } catch (e) {
      setError(e.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setStatus("idle");
    }
  };

  const validateFields = () => {
    const requiredFields = ["email", "password", "firstName", "lastName", "contactNo"];
    const invalidField = requiredFields.find((field) => !formData[field]);

    if (invalidField) {
      setIsFieldsDirty(true);
      return false;
    }

    return true;
  };

  const handleShowPassword = () => setIsShowPassword((prev) => !prev);

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-title">Register</h1>
        <form className="register-form">
          {error && <span className="error-message">{error}</span>}

          {[
            { label: "First Name", field: "firstName" },
            { label: "Middle Name", field: "middleName" },
            { label: "Last Name", field: "lastName" },
            { label: "Contact Number", field: "contactNo" },
            { label: "Email", field: "email", type: "email" },
          ].map(({ label, field, type = "text" }) => (
            <div className="input-group" key={field}>
              <label>{label}</label>
              <input
                type={type}
                value={formData[field]}
                onChange={(e) => handleOnChange(e, field)}
                placeholder={`Enter your ${label.toLowerCase()}`}
              />
              {isFieldsDirty && !formData[field] && (
                <span className="error-message">This field is required.</span>
              )}
            </div>
          ))}

          <div className="input-group password-container">
            <label>Password</label>
            <input
              type={isShowPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleOnChange(e, "password")}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={handleShowPassword}
            >
              {isShowPassword ? "Hide" : "Show"}
            </button>
            {isFieldsDirty && !formData.password && (
              <span className="error-message">This field is required.</span>
            )}
          </div>

          <button
            type="button"
            className="register-btn"
            disabled={status === "loading"}
            onClick={() => {
              if (validateFields()) handleRegister();
            }}
          >
            {status === "loading" ? "Loading..." : "Register"}
          </button>

          <div className="login-link">
            Already have an account? <a href="/">Login</a>.
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
