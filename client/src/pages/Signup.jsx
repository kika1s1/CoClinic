import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/coclinic.png"; // Update the path to your logo image

const questions = [
  {
    key: "username",
    label: "Username",
    description: "Please enter a unique username for your account.",
    icon: "👤",
  },
  {
    key: "email",
    label: "Email",
    description: " Please enter a valid email address, example name@domain.com.",
    icon: "✉️",
  },
  {
    key: "name",
    label: "Name",
    description: "What is your full name?",
    icon: "📝",
  },
  {
    key: "password",
    label: "Password",
    type: "password",
    description: "Enter a strong password to secure your account.",
    icon: "🔒",
  },
  {
    key: "age",
    label: "Age",
    type: "number",
    description: "How old are you?",
    icon: "🎂",
  },
  {
    key: "gender",
    label: "Gender",
    type: "select",
    options: ["male", "female", "other"],
    description: "What is your gender?",
    icon: "⚥",
  },
];

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const emptyFields = questions.filter((q) => !formData[q.key]);
    if (emptyFields.length > 0) {
      setOpenAlert(true);
    } else {
      setOpenAlert(false);
      try {
        const response = await axios.post("/api/v1/auth/signup", formData);
        console.log(response.data);
        setSnackbarMessage("Registration successful!");
        setSnackbarSeverity("success");
        setRegistrationSuccess(true);
      } catch (error) {
        console.log(error.response.data.error);
        setSnackbarMessage(error.response.data.error);
        setSnackbarSeverity("error");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Logo" className="h-16 w-16 mb-4" />
          <h1 className="text-3xl font-bold text-green-500">CoClinic</h1>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg text-center mb-8">
          <p className="text-gray-700">
            Embark on a transformative journey with our AI-powered personalized recovery plans and habit-building strategies.
          </p>
        </div>

        {openAlert && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
            <p>Please fill in all the fields before submitting.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {questions.map((question) => (
            <div key={question.key}>
              <label className="block text-sm font-medium text-gray-700">
                {question.icon} {question.label}
              </label>
              <p className="text-xs text-gray-500 mb-2">{question.description}</p>
              {question.type === "select" ? (
                <select
                  name={question.key}
                  value={formData[question.key] || ""}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  <option value="">Select</option>
                  {question.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={question.type || "text"}
                  name={question.key}
                  value={formData[question.key] || ""}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Signup
        </button>

        {registrationSuccess && (
          <Link to="/signin">
            <button className="w-full mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Go to Login
            </button>
          </Link>
        )}

        {snackbarMessage && (
          <div
            className={`mt-4 p-4 rounded-md text-center ${
              snackbarSeverity === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {snackbarMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
