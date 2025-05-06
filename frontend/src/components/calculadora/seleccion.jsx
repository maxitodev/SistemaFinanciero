import React from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de usar react-router-dom para la navegación
import './seleccion.css';

function Seleccion() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Selecciona el cálculo que deseas realizar</h1>
      
      <div className="navigation">
        <button onClick={() => navigate('/da')}>Demanda Agregada</button>
        <button onClick={() => navigate('/is')}>Curva IS</button>
        <button onClick={() => navigate('/lm')}>Curva LM</button>
      </div>
    </div>
  );
}

export default Seleccion;