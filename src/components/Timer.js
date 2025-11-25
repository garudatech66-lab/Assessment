import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Timer = ({ minutes = 30 }) => {
  const navigate = useNavigate();

  // Load saved timer or use default
  const savedTime = localStorage.getItem("timeLeft");
  const initialTime = savedTime ? parseInt(savedTime) : minutes * 60;

  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          localStorage.removeItem("timeLeft");
          navigate("/"); // Auto submit or redirect
          return 0;
        }

        const newTime = prev - 1;
        localStorage.setItem("timeLeft", newTime); // Persist
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div style={styles.timer}>
      ⏳ Time Left: <b>{formatTime()}</b>
    </div>
  );
};

const styles = {
  timer: {
    borderRadius: "25px",
    background: "#0D5EA6",
    color: "white",
    padding: "10px",
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
    position: "sticky",
    top: 0,
    zIndex: 999,
  },
};

export default Timer;
