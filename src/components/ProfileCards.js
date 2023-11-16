import React from 'react';
import LoadingSpinner from './LoadingSpinner';

function ProfleCards({ picture, children, loading }) {

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
                        <img
                            src="path_to_profile_picture.jpg"
                            alt="Foto de perfil"
                            className="rounded-circle mb-3"
                            style={{ width: '150px', height: '150px' }}
                        />
                        <p>JPG o PNG no mayor a 5 MB</p>
                        <button className="btn btn-primary">Cambiar foto</button>
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
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfleCards;