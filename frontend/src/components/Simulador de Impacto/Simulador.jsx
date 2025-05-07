import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Simulador.css';
import { Link, Routes, Route } from 'react-router-dom'; // Importar rutas

function MacroImpactSimulator() {
  const navigate = useNavigate();
  return (
    <div className="macro-impact-simulator">
      <div className="button-container">
        <Link to="/">
          <button className="top-left-button">Menú principal</button>
        </Link>
      </div>
      <h1>Simulador de Impacto Macro-Financiero</h1>
      <p>
        Este simulador se basa en cómo las variables macroeconómicas afectan las razones financieras.
        Al darle a "Crear Estado de Resultados" se abrirá la tabla completa donde podrás editar los valores y guardar para ver los resultados.
      </p>
      <button onClick={() => navigate('/tabla-completa')}>Crear Estado de Resultados</button>
    </div>
  );
}

export default MacroImpactSimulator;
