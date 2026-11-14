import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";
import "./SignupForm.css";

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="signupButtonContainer">
        <button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Create new account
        </button>
      </div>
      {showModal && (
        <Modal>
          <i
            onClick={() => setShowModal(false)}
            id="closeSignUpForm"
            className="fa-solid fa-xmark close-icon"
            role="button"
            tabIndex={0}
            aria-label="Close"
          ></i>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
