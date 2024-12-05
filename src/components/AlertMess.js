import React, { useEffect } from "react";
import { notification } from "antd";

const AlertMess = ({ message }) => {
  useEffect(() => {
    notification.info({
      message: message,
      placement: "top",
      duration: 2, // Duration in seconds
    });
  }, [message]);

  return null; // No need to render anything in the DOM
};

export default AlertMess;
