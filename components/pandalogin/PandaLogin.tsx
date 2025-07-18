'use client';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { Wifi, WifiOff } from 'lucide-react';
import { APP_CONFIG, isOnlineMode, isOfflineMode, setAppMode, initializeAppMode } from '@/src/config/appConfig';
import { turnoAutoStart } from '../../src/utils/turnoAutoStart';
import './panda-login.css';

export default function PandaLogin() {
  const [focused, setFocused] = useState(false);
  const [wrongEntry, setWrongEntry] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [appMode, setAppModeState] = useState<string>('offline');
  const router = useRouter();

  useEffect(() => {
    // Inicializar el modo de la aplicación desde sessionStorage
    initializeAppMode();
    setAppModeState(APP_CONFIG.mode);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOfflineLogin = () => {
    // En modo offline, crear un token simulado
    const mockToken = btoa(JSON.stringify({
      username: form.username || APP_CONFIG.auth.defaultUser.username,
      role: APP_CONFIG.auth.defaultUser.role,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 1), // Expira en 8 horas
      iat: Math.floor(Date.now() / 1000)
    }));
    
    sessionStorage.setItem("token", mockToken);
    sessionStorage.setItem("app_mode", "offline");
    router.push('/grifo');
    
    // Procesar auto-inicio de turno para modo offline también
    setTimeout(() => {
      turnoAutoStart.procesarAutoInicio({
        montoInicialDefault: 0,
        showModal: false,
        onTurnoIniciado: (turno) => {
          console.log('✅ Turno iniciado automáticamente (modo offline):', turno);
        },
        onError: (error) => {
          console.error('❌ Error en auto-inicio de turno (modo offline):', error);
        }
      });
    }, 1000);
  };

  const handleOnlineLogin = async () => {
    try {
      const response = await axios.post(`${APP_CONFIG.backendUrl}/auth/login`, {
        username: form.username,
        password: form.password,
      });

      if (response.data.access_token) {
        const token = response.data.access_token;
        
        // Guardar el token en sessionStorage para que se pierda al recargar la página
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("app_mode", "online");
        
        try {
          const decoded: any = jwtDecode(token);
          const userRole = decoded.role || decoded.rol || "seller";
          
          console.log('Rol del usuario:', userRole); // Para debugging
          
          // Usar router.push en lugar de window.location.href para mejor manejo de Next.js
          router.push('/grifo');
          
          // Procesar auto-inicio de turno después de un breve delay
          setTimeout(() => {
            turnoAutoStart.procesarAutoInicio({
              montoInicialDefault: 0,
              showModal: false,
              onTurnoIniciado: (turno) => {
                console.log('✅ Turno iniciado automáticamente:', turno);
              },
              onError: (error) => {
                console.error('❌ Error en auto-inicio de turno:', error);
              }
            });
          }, 1000);
          
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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setWrongEntry(false);
    
    try {
      if (isOfflineMode()) {
        // En modo offline, permitir cualquier credencial o usar las por defecto
        if (!APP_CONFIG.auth.requireAuth || 
            (form.username && form.password) || 
            (!form.username && !form.password)) {
          handleOfflineLogin();
        } else {
          setWrongEntry(true);
        }
      } else {
        // En modo online, usar autenticación real
        await handleOnlineLogin();
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

  const toggleAppMode = () => {
    const newMode = appMode === 'online' ? 'offline' : 'online';
    setAppMode(newMode);
    setAppModeState(newMode);
  };

  return (
    <div className="text-center py-12 min-h-screen bg-blue-200 font-sans flex items-center justify-center relative">
      {/* Indicador de modo y botón para cambiar */}
      <div className="absolute top-4 right-4 z-60">
        <div className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center mb-2 ${
          appMode === 'online' 
            ? 'bg-green-500 text-white' 
            : 'bg-orange-500 text-white'
        }`}>
          {appMode === 'online' ? <Wifi size={16} className="mr-2" /> : <WifiOff size={16} className="mr-2" />}
          {appMode === 'online' ? 'MODO ONLINE' : 'MODO DEMO'}
        </div>
        <button
          onClick={toggleAppMode}
          className="w-full px-3 py-1 bg-gray-700 text-white text-xs rounded hover:bg-gray-600 transition-colors"
        >
          Cambiar a {appMode === 'online' ? 'Demo' : 'Online'}
        </button>
      </div>

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
          <h1 className="text-blue-600 font-dancing text-2xl mb-4">
            Grifo Login {appMode === 'offline' && '(Demo)'}
          </h1>

          {appMode === 'offline' && !APP_CONFIG.auth.requireAuth && (
            <p className="text-sm text-gray-600 mb-4">
              Modo demo: puedes usar cualquier credencial o dejar en blanco
            </p>
          )}

          <div className="form-group mb-6 relative">
            <input
              required={appMode === 'online' || APP_CONFIG.auth.requireAuth}
              name="username"
              placeholder={appMode === 'offline' ? "Username (opcional)" : "Username"}
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
              required={appMode === 'online' || APP_CONFIG.auth.requireAuth}
              name="password"
              placeholder={appMode === 'offline' ? "Password (opcional)" : "Password"}
              value={form.password}
              onChange={handleChange}
              className="form-control peer w-full border-b border-blue-400 focus:outline-none focus:border-blue-600 bg-transparent"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              disabled={loading}
            />
            {wrongEntry && (
              <p className="alert text-red-500 text-sm mt-2">
                {appMode === 'online' 
                  ? "Credenciales inválidas. Por favor, intenta de nuevo."
                  : "Error en el modo demo. Intenta de nuevo."
                }
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
                `Iniciar Sesión ${appMode === 'offline' ? '(Demo)' : ''}`
              )}
            </button>
          </div>
        </form>

        {/* Información adicional para modo demo */}
        {appMode === 'offline' && (
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center">
            <p className="text-xs text-gray-600 bg-white/80 px-3 py-1 rounded-full">
              Modo demo activo - Datos de prueba disponibles
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

