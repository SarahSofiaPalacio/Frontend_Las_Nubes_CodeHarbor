import React from "react";

function Header({ title, subTitle, labelButton }) {
    return (
        <div className="d-flex flex-column mb-3">
            <h1 className="h3 mb-0 text-gray-800">{title}</h1>
            {subTitle && <h1 className="h6 mb-0 text-gray-800 mt-1">{subTitle}</h1>}
        </div>
    );
}

export default Header;