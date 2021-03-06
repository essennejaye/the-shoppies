import React, { useEffect } from "react";
import { FaTimes } from 'react-icons/fa';

const AlertModal = (props) => {
  useEffect(() => {
    return () => {
      let modal = document.querySelector('.modal-background');
      if (modal && modal.classList.contains('hide')) {
        setTimeout(() => {
          props.setShow('')
        }, 450)
      }
    }
  })
  return (
    <div className={`modal-background ${props.show}`}>
      <div className={`modal-container ${props.show}`}>
        <div className="modal-header">
          <h5 className="modal-title">Oops!</h5>
          <button
            type="button"
            className="btn btn-close"
            aria-label="Close"
            onClick={props.onClose}
          ><FaTimes></FaTimes></button>
        </div>
        <div className="modal-body">
          {props.children}
        </div>
        <div className="modal-foot">
          <button className="btn btn-close-secondary" onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
