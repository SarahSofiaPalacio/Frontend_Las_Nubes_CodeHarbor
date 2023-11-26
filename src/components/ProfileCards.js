import React from 'react';
import LoadingSpinner from './LoadingSpinner';

function ProfileCards({ loading, profilePicture, profileForm }) {
    if (loading) return <LoadingSpinner />;

    return (
        <div className="row">
            {/* Columna para la foto de perfil */}
            <div className="col-lg-4">
                <div className="card shadow mb-4">
                    <div className="card-header text-center py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Foto de Perfil</h6>
                    </div>
                    <div className="card-body text-center">
                        {profilePicture}
                    </div>
                </div>
            </div>

            {/* Columna para la información personal */}
            <div className="col-lg-8">
                <div className="card shadow mb-4">
                    <div className="card-header text-center py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Información Personal</h6>
                    </div>
                    <div className="card-body">
                        {profileForm}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCards;