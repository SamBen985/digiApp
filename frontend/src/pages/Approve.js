import "../styles/approve.css";
function Approve() {
  return (
    <>
      <div className="approve-container">
        <h2 className="text-center">Transaction Approved!</h2>
        <div className="o-circle c-container__circle o-circle__sign--success">
          <div className="o-circle__sign"></div>
        </div>
        <div className="yellow">
          <h6 className="text-center con">
            <b>Congratulations!</b> your order has been received and your credit
            card authorization has been approved. One of our agents will review
            your order to ensure you have all the necessary documents. Only
            after your order has been approved by one of our agents, your card
            will be charged.
          </h6>
        </div>
      </div>
    </>
  );
}

export default Approve;
