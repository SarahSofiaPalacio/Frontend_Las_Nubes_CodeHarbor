import React from 'react';

function Login() {
  return (
    <div className="container-fluid">
      <div className="row no-gutter">
        {/* La mitad izquierda con la imagen */}
        <div className="col-md-6 d-none d-md-flex bg-image">
          {/* Asegúrate de tener una clase CSS para establecer la imagen de fondo */}
        </div>

        {/* La mitad derecha con el formulario */}
        <div className="col-md-6">
          <div className="login d-flex align-items-center py-5">
            {/* Contenedor del formulario */}
            <div className="container">
              <div className="row">
                <div className="col-lg-10 col-xl-7 mx-auto">
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
                      <p>¿Olvidaste tu contraseña?</p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
