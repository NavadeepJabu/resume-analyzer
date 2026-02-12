import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {

  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [showRegister, setShowRegister] = useState(false);

  if (loggedIn) {
    return <Dashboard />;
  }

  return showRegister ? (

    <Register setLoggedIn={setLoggedIn} />

  ) : (

    <div>

      <Login setLoggedIn={setLoggedIn} />

      <p style={{ marginLeft: "30px" }}>
        New user?{" "}
        <button onClick={() => setShowRegister(true)}>
          Register here
        </button>
      </p>

    </div>

  );
}

export default App;
