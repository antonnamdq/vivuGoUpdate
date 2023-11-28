import { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [credentials, serCredentials] = useState({
    username: undefined,
    email: undefined,
    country: undefined,
    city: undefined,
    phone: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    serCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/register",
        credentials
      );
      // dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      // console.log("succes", res);
      navigate("/");
    } catch (err) {
      // dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="lInput"
        ></input>
        <input
          type="text"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="lInput"
        ></input>
        <input
          type="text"
          placeholder="Country"
          id="country"
          onChange={handleChange}
          className="lInput"
        ></input>
        <input
          type="text"
          placeholder="City"
          id="city"
          onChange={handleChange}
          className="lInput"
        ></input>
        <input
          type="text"
          placeholder="Phone"
          id="phone"
          onChange={handleChange}
          className="lInput"
        ></input>
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        ></input>
        <button onClick={handleClick} className="lButton">
          Register
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Register;
