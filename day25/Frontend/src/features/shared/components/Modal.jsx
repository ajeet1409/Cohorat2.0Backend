import React from "react";
import "../style/modal.scss";

const Modal = ({ isOpen, title, children, onClose, actions, size = "md" }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__backdrop" onClick={onClose}></div>
      <div className={`modal__content modal__content--${size}`}>
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button className="modal__close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal__body">{children}</div>

        {actions && (
          <div className="modal__footer">
            {actions.map((action, idx) => (
              <button
                key={idx}
                className={`modal__action modal__action--${action.variant || "primary"}`}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
