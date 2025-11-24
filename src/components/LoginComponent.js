import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { username, password };
    console.log("Login Data:", data);
      navigate("/quiz");
    // TODO: Send to backend using axios
    // axios.post("http://localhost:5000/login", data)
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Official Login Portal</h2>
        <p style={styles.text}>
          Please enter your registered username and password to access the
          examination system. Unauthorized access is strictly prohibited.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button} onClick={handleSubmit}>Login</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    margin: "50px",
  },
  card: {
    width: "60%",
    padding: "50px",
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  heading: {
    marginBottom: "10px",
    textAlign: "center",
    color: "#0A3C6B",
  },
  text: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "20px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#0D5EA6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  }
};

export default LoginComponent;
