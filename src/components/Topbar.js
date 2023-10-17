import React from 'react';
import Toggler from './Toggler';
import UserInfo from './UserInfo';

function Topbar({toggleSidebar}) {
    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <Toggler toggleSidebar={toggleSidebar}/>
            <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block"></div>
                <UserInfo userName="Brandon Sanderson" userImage="img/profile.svg" />
            </ul>
        </nav>
    );
}

export default Topbar;