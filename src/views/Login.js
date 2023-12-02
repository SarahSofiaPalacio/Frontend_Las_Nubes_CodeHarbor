import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/login';
import { useAuth } from '../auth/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

function Login() {
  const navigate = useNavigate();
  const { token, role, username, handleLogin } = useAuth();
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (token && role && username) {
      console.log("(Login) Usuario ya ha iniciado sesión. Redireccionando a dashboard...")
      navigate('/dashboard');
    } else {
      setIsLoadingContent(false);
    }
  }, [token, role, username, navigate]);
  
  if (isLoadingContent) return <LoadingSpinner />;

  const validateForm = () => {
    if (!formData.username || !formData.username.trim()) {
      return false;
    } else if (!/^\d{7,10}$/.test(formData.username.trim())) {
      return false;
    }
    if (!formData.password || !formData.password.trim()) {
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoadingForm(true);
      try {
        const response = await login(formData);
        console.log('(Login) Inicio de sesión exitoso: ', response);
        await handleLogin(response.token, response.role, formData.username); 
        navigate('/dashboard');
      } catch (error) {
        console.error('(Login) Error en el inicio de sesión: ', error);
        if (error.response && error.response.status === 400) {
          setError('Credenciales inválidas. Por favor intenta de nuevo.');
        } else {
          setError('Error en el inicio de sesión. Por favor intenta de nuevo.');
        }
      } finally {
        setIsLoadingForm(false);
      }
    } else {
      setError('Por favor valida los datos ingresados.');
    }
  };  

  return (
    <div
      className="vh-100 vw-100"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/section_hospital2.svg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="h-100 d-flex align-items-center justify-content-center">
        <div className="bg-white p-4 shadow" style={{ zIndex: 2, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
          {/* Formulario de login */}
          <div className="d-flex justify-content-center align-items-center">
            <img src={`${process.env.PUBLIC_URL}/img/logo.svg`} alt="Logo" className="img-fluid mb-4" style={{ width: '100px' }} />
          </div>
          <h3 className="display-5 text-dark text-center">Bienvenido de Vuelta</h3>
          <p className="text-muted mb-4 text-dark text-center">Ingresa tus datos para continuar.</p>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                name="username"
                type="number"
                placeholder="Número de documento"
                required
                autoFocus
                className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                onChange={handleChange}
                value={formData.username}
                disabled={isLoadingForm}
              />
            </div>
            <div className="form-group mb-4">
              <input
                name="password"
                type="password"
                placeholder="Contraseña"
                required
                className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                onChange={handleChange}
                value={formData.password}
                disabled={isLoadingForm}
              />
            </div>
            <div className="d-grid gap-2 mt-2">
              <button
                type="submit"
                className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                disabled={isLoadingForm}
              >
                {isLoadingForm ? 'Cargando...' : 'Ingresar'}
              </button>
            </div>
            <div className="text-center d-flex justify-content-between mt-4">
              <p className='small'>Si olvidaste tu contraseña debes ponerte en contacto con el centro médico.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
