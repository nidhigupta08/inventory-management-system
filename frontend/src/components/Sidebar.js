import React from "react";
import { FaTachometerAlt, FaBox, FaCog } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>IMS</h2>
      <p><FaTachometerAlt /> Dashboard</p>
      <p><FaBox /> Products</p>
      <p><FaCog /> Settings</p>
    </div>
  );
}

export default Sidebar;