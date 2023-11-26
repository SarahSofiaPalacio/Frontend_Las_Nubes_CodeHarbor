import React from "react";

function Header({ title, subTitle, addButton=null }) {
    return (
        <div className="d-flex flex-column mb-3">
            <h1 className="h3 mb-2 text-gray-800">{title}</h1>
            <div className="d-sm-flex align-items-start justify-content-between">
                <h1 className="h6 mb-0 text-gray-800 mt-1">{subTitle}</h1>
                {addButton}
            </div>
        </div>
    );
}

export default Header;