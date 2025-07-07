'use client';
import axios from "axios";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import './panda-login.css';

export default function PandaLogin() {
  const [focused, setFocused] = useState(false);
  const [wrongEntry, setWrongEntry] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setWrongEntry(false);
    
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        username: form.username,
        password: form.password,
      });

      if (response.data.access_token) {
        const token = response.data.access_token;
        
        // Guardar el token ANTES de decodificar y redirigir
        localStorage.setItem("token", token);
        
        try {
          const decoded: any = jwtDecode(token);
          const userRole = decoded.role || decoded.rol || "seller";
          
          console.log('Rol del usuario:', userRole); // Para debugging
          
          // Usar router.push en lugar de window.location.href para mejor manejo de Next.js
          router.push('/grifo');
          
        } catch (decodeError) {
          console.error('Error al decodificar el token:', decodeError);
          // Aún así redirigir al dashboard, el Layout manejará la validación
          router.push('/grifo');
        }
        
      } else {
        setWrongEntry(true);
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setWrongEntry(true);
    } finally {
      setLoading(false);
      // Limpiar el error después de 3 segundos
      if (wrongEntry) {
        setTimeout(() => setWrongEntry(false), 3000);
      }
    }
  };

  return (
    <div className="text-center py-12 min-h-screen bg-blue-200 font-sans flex items-center justify-center">
      <div className="grifo relative">
        {/* Grifo visual */}
        <div className="grifo-cuerpo"></div>
        <div className="grifo-tubo"></div>
        <div className="grifo-mango"></div>
        <div className="grifo-salida"></div>
        <div className="gota-agua"></div>

        {/* Formulario */}
        <form
          className={`absolute left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
            focused ? 'translate-y-[-30px]' : ''
          } ${wrongEntry ? 'wrong-entry' : ''}`}
          onSubmit={handleSubmit}
        >
          <h1 className="text-blue-600 font-dancing text-2xl mb-4">Grifo Login</h1>

          <div className="form-group mb-6 relative">
            <input
              required
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="form-control peer w-full border-b border-blue-400 focus:outline-none focus:border-blue-600 bg-transparent"
              onFocus={() => setFocused(true)}
              disabled={loading}
            />
          </div>

          <div className="form-group relative">
            <input
              type="password"
              required
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="form-control peer w-full border-b border-blue-400 focus:outline-none focus:border-blue-600 bg-transparent"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              disabled={loading}
            />
            {wrongEntry && (
              <p className="alert text-red-500 text-sm mt-2">
                Credenciales inválidas. Por favor, intenta de nuevo.
              </p>
            )}
            <button
              type="submit"
              className="btn mt-6 px-4 py-2 border border-blue-500 text-white bg-blue-500 hover:bg-white hover:text-blue-500 transition-all w-full rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Cargando...
                </div>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

