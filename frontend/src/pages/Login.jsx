import { useState } from "react";
import axios from "axios";

export default function Login({ setLoggedIn }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password
        }
      );

      // Save token
      localStorage.setItem("token", res.data.token);

      // Redirect to dashboard
      setLoggedIn(true);

    } catch (err) {
      alert("Login failed");
    }
  }

  return (
    <div style={{ padding: "30px" }}>

      <h2>Login</h2>

      <form onSubmit={handleLogin}>

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
          Login
        </button>

      </form>

    </div>
  );
}
