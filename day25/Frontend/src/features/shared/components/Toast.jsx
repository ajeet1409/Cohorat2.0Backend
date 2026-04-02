import React, { useEffect, useState } from "react";
import "../style/toast.scss";

const Toast = ({ message, type = "info", duration = 3000, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onClose, 3000);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 3000);
  };

  const typeIcons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };

  return (
    <div className={`toast toast--${type} ${isExiting ? "toast--exit" : ""}`}>
      <span className="toast__icon">{typeIcons[type]}</span>
      <span className="toast__message">{message}</span>
      <button className="toast__close" onClick={handleClose}>
        ✕
      </button>
    </div>
  );
};

export default Toast;
