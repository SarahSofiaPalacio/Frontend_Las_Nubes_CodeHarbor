import React from "react";

function Toggler({ toggleSidebar }) {
    return (
      <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
      </button>
    );
  }
  
export default Toggler;