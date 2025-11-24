import React, { useEffect, useState } from "react";

const Timer = ({ minutes = 30 }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        console.log(prev)
        if(prev === 0){
          clearInterval(interval);
          alert("Time's up!");
        }
        return prev > 0 ? prev - 1 : 0
      }
    );
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
    <div style={styles.timer} >
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