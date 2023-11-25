import React from "react";

function SidebarBrand() {
    return (
      <div className="sidebar-brand bg-white d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-icon">
              <img width="50" src={`${process.env.PUBLIC_URL}/img/logo.svg`} alt="Las Nubes" />
          </div>
          <div className="sidebar-brand-text">
              <img width="120" src={`${process.env.PUBLIC_URL}/img/text.svg`} alt="Las Nubes" />
          </div>
      </div>
    );
  }

export default SidebarBrand;