import React from "react";

function Brand() {
    return (
      <a className="sidebar-brand bg-white d-flex align-items-center justify-content-center" href="/#">
          <div className="sidebar-brand-icon">
              <img width="50" src="img/logo.svg" alt="las nubes" />
          </div>
          <div className="sidebar-brand-text">
              <img width="120" src="img/text.svg" alt="las nubes" />
          </div>
      </a>
    );
  }

export default Brand;