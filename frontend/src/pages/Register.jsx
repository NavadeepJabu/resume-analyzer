import { useState } from "react";
import axios from "axios";

export default function Register({ setLoggedIn }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    try {

      // Register API
      await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          name,
          email,
          password
        }
      );

      // Auto Login
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem("token", res.data.token);

      setLoggedIn(true);

    } catch (err) {
      alert("Registration failed");
    }
  }

  return (
    <div style={{ padding: "30px" }}>

      <h2>Register</h2>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">
          Register
        </button>

      </form>

    </div>
  );
}
