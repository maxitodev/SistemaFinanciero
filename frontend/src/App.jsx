import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom'; // Importar rutas
import MacroImpactSimulator from './components/Simulador de Impacto/Simulador'; // Importar componente
import TablaCompleta from './components/Simulador de Impacto/CrearTabla/TablaCompleta';
import RazonesFinancieras from './components/Simulador de Impacto/RazonesF/RazonesFinancieras';
import Seleccion from './components/calculadora/seleccion'; // Importar Seleccion
import DACombined from './components/calculadora/DA'; // Importar DA
import ISCalculator from './components/calculadora/curvaIS'; // Importar IS
import LMCalculator from './components/calculadora/curvaLM'; // Importar LM
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">
      {isLoading ? (
        <div className="loading-screen">
          <div className="finance-loader">
            {/* Logo con GIF animado */}
            <div className="animated-logo">
              <img 
                src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTE3aWE1MWIzNGlmaWsxNTF0MjdoY29iZXZsbWhtNXd5bmZla3R5cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JtBZm3Getg3dqxK0zP/giphy.gif" 
                alt="Finanzas animation"
                className="lottie-animation"
              />
            </div>
            
            {/* Texto con efecto suave */}
            <h1 className="loading-text">
              Bienvenido a <span className="brand">MacroView</span>
            </h1>
            
            {/* Barra de progreso moderna */}
            <div className="modern-progress">
              <div className="progress-wave"></div>
            </div>
            
            <p className="status-text">Desarrollado por Max S, Álvaro R, Irlanda L y Alan L.</p>
          </div>
        </div>
      ) : (
        <>
          <Routes>
            {/* Ruta principal */}
            <Route
              path="/"
              element={
                <div className="main-page">
                  <header className="main-header">
                    <h1>MacroView</h1>
                    <p>Tu herramienta para cálculos macroeconómicos</p>
                  </header>
                  <section className="intro-section">
                    <h2>¿Qué es MacroView?</h2>
                    <p>
                      MacroView es una plataforma diseñada para ayudarte a calcular y analizar 
                      indicadores macroeconómicos clave como el PIB, tasas de interés, IS-LM, inflación, 
                      y más. Ideal para estudiantes y profesionales de economía.
                    </p>
                  </section>
                  <section className="tools-section">
                    <h2>Herramientas disponibles</h2>
                    <div className="tools-grid">
                      <div className="tool-card">
                        <h3>Simulador de Impacto Macro-Financiero</h3>
                        <p>Evalúa cómo las variables macroeconómicas afectan las razones financieras de una empresa.</p>
                        <Link to="/simulador">
                          <button>Ir a herramienta</button>
                        </Link>
                      </div>
                      <div className="tool-card">
                        <h3>Cálculo de IS-LM</h3>
                        <p>Explora el modelo IS-LM para equilibrio macroeconómico.</p>
                        <Link to="/seleccion">
                          <button>Ir a calculadora</button>
                        </Link>
                      </div>
                    </div>
                  </section>
                  <footer className="main-footer">
                    <p> Desarrollado por Max S, Álvaro R, Irlanda L y Alan L.

</p>
                  </footer>
                </div>
              }
            />
            {/* Rutas adicionales */}
            <Route path="/simulador" element={<MacroImpactSimulator />} />
            <Route path="/tabla-completa" element={<TablaCompleta />} />
            <Route path="/razones-financieras" element={<RazonesFinancieras />} />
            <Route path="/seleccion" element={<Seleccion />} />
            <Route path="/da" element={<DACombined />} />
            <Route path="/is" element={<ISCalculator />} />
            <Route path="/lm" element={<LMCalculator />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;