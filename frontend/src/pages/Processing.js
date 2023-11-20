import { useNavigate } from "react-router-dom";
import "../styles/processing.css";
import { useEffect } from "react";
import { baseUrl } from "../constants";

function Processing({ email }) {
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => {
      fetch(
        `${baseUrl}/email/registration-approve/${encodeURIComponent(email)}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.isApproved) {
            navigate("/approve");
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });

      // Make the second fetch request separately
      fetch(
        `${baseUrl}/email/registration-decline/${encodeURIComponent(email)}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.isDeclined) {
            navigate("/decline");
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }, 5000);

    return () => {
      clearInterval(id);
    };
  }, [email, navigate]);

  return (
    <>
      <div className="text-center mt-5">
        <h2 class="animate">Processing</h2>
      </div>
      <div className="spinner-box">
        <div className="configure-border-1">
          <div className="configure-core"></div>
        </div>
        <div className="configure-border-2">
          <div className="configure-core"></div>
        </div>
      </div>
    </>
  );
}

export default Processing;
