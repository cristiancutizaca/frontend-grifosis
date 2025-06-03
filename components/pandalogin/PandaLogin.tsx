'use client'
import { useState, useEffect } from 'react'
import './panda-login.css'

export default function PandaLogin() {
  const [focused, setFocused] = useState(false)
  const [wrongEntry, setWrongEntry] = useState(false)
  const [eyeSize, setEyeSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dw = window.innerWidth / 15
      const dh = window.innerHeight / 15
      setEyeSize({ width: e.pageX / dw, height: e.pageY / dh })
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleClick = () => {
    setWrongEntry(true)
    setTimeout(() => setWrongEntry(false), 3000)
  }

  return (
    <div className="text-center py-12 min-h-screen bg-pink-400 font-sans flex items-center justify-center">
      <div className="panda relative w-[300px]">
        {/* Orejas */}
        <div className="ear"></div>

        {/* Cara */}
        <div className="face relative w-[200px] h-[200px] bg-white rounded-full shadow-md mx-auto z-10">
          <div className="eye-shade"></div>
          <div className="eye-shade rgt"></div>

          <div className="eye-white">
            <div
              className="eye-ball"
              style={{ width: eyeSize.width, height: eyeSize.height }}
            />
          </div>
          <div className="eye-white rgt">
            <div
              className="eye-ball"
              style={{ width: eyeSize.width, height: eyeSize.height }}
            />
          </div>

          <div className="nose"></div>
        </div>

        {/* Formulario dentro del panda */}
        <form
          className={`absolute top-[120px] left-1/2 -translate-x-1/2 z-50 bg-white px-8 py-6 w-[270px] rounded-xl shadow-xl border border-gray-200 transition-all duration-300 ${
            focused ? 'translate-y-[-60px]' : ''
          } ${wrongEntry ? 'wrong-entry' : ''}`}
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Manos */}
          <div className="hand"></div>
          <div className="hand rgt"></div>

          <h1 className="text-pink-500 font-dancing text-2xl mb-4">Panda Login</h1>

          <div className="form-group mb-6 relative">
            <input
              required
              className="form-control peer w-full border-b border-gray-500 focus:outline-none focus:border-pink-500 bg-transparent"
              onFocus={() => setFocused(true)}
            />
            <label className="form-label">Username</label>
          </div>

          <div className="form-group relative">
            <input
              type="password"
              required
              className="form-control peer w-full border-b border-gray-500 focus:outline-none focus:border-pink-500 bg-transparent"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
            <label className="form-label">Password</label>
            <p className="alert">Invalid Credentials..!!</p>
            <button
              className="btn mt-6 px-4 py-2 border border-pink-500 text-white bg-pink-500 hover:bg-white hover:text-pink-500 transition-all w-full rounded-md"
              onClick={handleClick}
            >
              Login
            </button>
          </div>
        </form>

        {/* Cuerpo y pies */}
        <div className="body z-0"></div>
        <div className="foot z-10">
          <div className="finger"></div>
        </div>
        <div className="foot rgt z-10">
          <div className="finger"></div>
        </div>
      </div>
    </div>
  )
}
