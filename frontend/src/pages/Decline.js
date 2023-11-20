import "../styles/approve.css";
function Decline() {
  return (
    <>
      <div className="approve-container">
        <h2 className="text-center mb-5">Transaction Declined!</h2>
        <div className="o-circle c-container__circle o-circle__sign--failure">
          <div className="o-circle__sign"></div>
        </div>
      </div>
    </>
  );
}

export default Decline;
