import React from 'react';
import Toggler from './TopbarToggler';
import UserInfo from './TopbarUserInfo';

function Topbar({toggleSidebar, userName, userImage}) {
    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <Toggler toggleSidebar={toggleSidebar}/>
            <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block"></div>
                <UserInfo userName={userName} userImage={userImage} />
            </ul>
        </nav>
    );
}

export default Topbar;