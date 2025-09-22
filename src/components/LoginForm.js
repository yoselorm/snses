import React, { useState, useEffect } from 'react';
import flame1 from '../assets/flame1.jpg';
import flame2 from '../assets/flame2.jpg';
import flame3 from '../assets/flame3.jpg';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({username,setUsername,password,setPassword}) => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  // Sample images - replace with your actual candle images
  const images = [
        flame1,flame2,flame3
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  const handleSubmit = () => {
    navigate('/dashboard')
    // console.log('Login attempt:', { username, password });
    // Add your login logic here
  };

  return (
    <div className="h-screen flex w-full bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="flex w-full h-full shadow-2xl bg-white overflow-hidden">
        {/* Left side - Image carousel */}
        <div className="w-1/2 hidden lg:block h-full relative overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              >
                {/* Dark overlay */}
                <div className="bg-gradient-to-t from-black via-black/40 to-transparent w-full h-full flex flex-col justify-center items-center p-8">
                  {/* Text content */}
                  <div className="text-center">
                    <h2 className="text-white text-5xl font-bold mb-4 tracking-wide">
                      SNSES
                    </h2>
                    <p className="text-amber-100 text-xl mb-2 font-light">
                      Hand-crafted premium scented candles
                    </p>
                    <p className="text-white/80 text-center text-lg leading-relaxed max-w-lg">
                      Transform your space with our artisanal collection of luxury candles, carefully crafted with natural soy wax and premium fragrances
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation dots */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-amber-300 scale-110' : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="lg:w-1/2 w-full h-full flex flex-col justify-center items-center p-8 lg:p-16 bg-gradient-to-br from-white to-amber-50">
          <div className="w-full max-w-md">
            {/* Logo/Header */}
            <div className="text-center mb-10">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-3">
                Welcome Admin
              </h1>
              <p className="text-gray-600 text-lg">Sign in to your dashboard</p>
            </div>

            {/* Login Form */}
            <div className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username or Email
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all duration-200 bg-white/80"
                  placeholder="Enter your username or email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all duration-200 pr-12 bg-white/80"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-800"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-amber-600 bg-gray-100 border-amber-300 rounded focus:ring-amber-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                {/* <a href="#" className="text-sm text-amber-600 hover:text-amber-800 transition-colors font-medium">
                  Forgot password?
                </a> */}
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-4 rounded-lg hover:from-amber-600 hover:to-orange-600 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg transform hover:scale-[1.02]"
              >
                Sign In
              </button>

             
            </div>

            {/* Mobile version - Show candle brand info */}
            <div className="lg:hidden mt-8 text-center">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-3">
                SNSES
              </h3>
              <p className="text-gray-600">
                Premium hand-crafted scented candles for your perfect ambiance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;