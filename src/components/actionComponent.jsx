import React from "react";
import "./cssFile/availableWords.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function ActionComponent({ action }) {
  return (
    <li>
      <Link className="link" to={`/show-demo/${action}`}>{action}</Link>
    </li>
  );
}
export default ActionComponent;
