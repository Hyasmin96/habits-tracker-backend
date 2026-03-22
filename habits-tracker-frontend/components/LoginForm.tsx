"use client";

import { useState } from "react";

type LoginFormProps = {
  onLogin: () => void; 
};

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // LOGIN
  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "Respuesta del servidor no es JSON. ¿Está corriendo el backend?"
        );
      }

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        onLogin(); 
        alert("Login exitoso!");
      } else {
        alert(data.message || "Error en login");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error de conexión al servidor");
    }
  };

  // REGISTER
  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registro exitoso! Ahora haz login.");
      } else {
        alert(data.error || "Error en registro");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error de conexión al servidor");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login / Register</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <div style={styles.buttonContainer}>
        <button
          onClick={handleLogin}
          style={{ ...styles.button, backgroundColor: "#0070f3" }}
        >
          Login
        </button>

        <button
          onClick={handleRegister}
          style={{ ...styles.button, backgroundColor: "#21ba45" }}
        >
          Register
        </button>
      </div>
    </div>
  );
}


const styles = {
  container: {
    maxWidth: "300px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center" as "center",
    backgroundColor: "#f9f9f9",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    margin: "5px",
    padding: "10px",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};