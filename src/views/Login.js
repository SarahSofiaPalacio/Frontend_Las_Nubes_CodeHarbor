import React from 'react';

function Login() {
  return (
    <div className="vh-100">
      {/* Contenedor de imagen de fondo fijada */}
      <div className="position-fixed top-0 start-0 bottom-0 end-0 d-md-block bg-light" style={{ zIndex: -1 }}>
        <img src={`${process.env.PUBLIC_URL}/img/section_hospital.jpg`} alt="Fondo" className="img-fluid h-100" />
      </div>

      <div className="h-100 d-flex align-items-center justify-content-center">
        <div className="bg-white p-4 shadow" style={{ zIndex: 2 }}>
          
          <h3 className="display-4">Bienvenido de Vuelta</h3>
          <p className="text-muted mb-4">Ingresa tus datos para continuar.</p>
          <form>
            <div className="form-group mb-3">
              <input id="inputEmail" type="email" placeholder="Cédula o Correo electrónico" required="" autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4" />
            </div>
            <div className="form-group mb-3">
              <input id="inputPassword" type="password" placeholder="Contraseña" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
            </div>
            <div className="custom-control custom-checkbox mb-3">
              <input id="customCheck1" type="checkbox" className="custom-control-input" />
              <label htmlFor="customCheck1" className="custom-control-label">Recordarme</label>
            </div>
            <div className="d-grid gap-2 mt-2">
              <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Ingresar</button>
            </div>
            <div className="text-center d-flex justify-content-between mt-4">
              <p>Si olvidaste tu contraseña debes ponerte en contacto con el centro médico.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

