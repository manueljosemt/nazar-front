import React from "react";
import { Router } from "@reach/router";
import Totem from "./views/Totem";
import "antd/dist/antd.css";
import "./globalStyles.css";

function App() {
  return (
    <Router>
      <Totem path="/totem" />
    </Router>
  );
}

export default App;
