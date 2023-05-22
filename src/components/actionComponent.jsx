import React, { useRef } from 'react';

import "./cssFile/availableWords.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function ActionComponent({ action }) {
  const liRef = useRef(null);

  const handleClick = () => {
    const linkElement = liRef.current.querySelector('.link');
    if (linkElement) {
      linkElement.click();
    }
  };
  return (
    
    <li ref={liRef} onClick={handleClick} className="link-li">
      <Link className="link" to={`/show-demo/${action}`}>{action}</Link>
    </li>
  );
}
export default ActionComponent;
