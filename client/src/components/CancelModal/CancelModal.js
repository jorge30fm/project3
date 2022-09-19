import React from "react";
import { Link } from "react-router-dom";
import "./CancelModal.css";

const CancelModal = (props) => {
  const { setModalOpen } = props;
  return (
    <div className="flex-column justify-content-center">
      <h2>Are you sure you want to cancel your reservation?</h2>
      <div className="btn-container">
        <Link to="/cancel-confirm">
          <button className="btn">Cancel</button>
        </Link>
      </div>
      <div className="btn-container">
        <button
          className="btn btn-faded"
          onClick={() => {
            setModalOpen(false);
          }}
        >
          Go back
        </button>
      </div>
    </div>
  );
};
export default CancelModal;
