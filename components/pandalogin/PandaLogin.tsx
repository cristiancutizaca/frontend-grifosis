'use client'
import axios from "axios";
import { useState } from 'react';
import './panda-login.css';

export default function PandaLogin() {
  const [focused, setFocused] = useState(false);
  const [wrongEntry, setWrongEntry] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setWrongEntry(false);
    try {
      console.log("🟢 Enviando:", form);
      const response = await axios.post("http://localhost:8000/auth/login", {
        username: form.username,
        password: form.password,
      });

      console.log("🔵 Respuesta:", response.data);

      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        window.location.href = "/grifo";
      } else {
        setWrongEntry(true);
      }
    } catch (error) {
      console.error("🔴 Error de login:", error);
      setWrongEntry(true);
    } finally {
      setLoading(false);
      setTimeout(() => setWrongEntry(false), 3000);
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
            />
            <p className="alert">{wrongEntry && "Invalid Credentials..!!"}</p>
            <button
              type="submit"
              className="btn mt-6 px-4 py-2 border border-blue-500 text-white bg-blue-500 hover:bg-white hover:text-blue-500 transition-all w-full rounded-md"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
