import React from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de usar react-router-dom para la navegación
import './seleccion.css';

function Seleccion() {
  const navigate = useNavigate();

  return (
    <div className="seleccion-container">
      <h1>Selecciona el cálculo que deseas realizar</h1>
      <p>Elige una de las opciones a continuación para explorar diferentes cálculos económicos.</p>
      
      <div className="seleccion-navigation">
        <button onClick={() => navigate('/da')}>Demanda Agregada</button>
        <button onClick={() => navigate('/is')}>Curva IS</button>
        <button onClick={() => navigate('/lm')}>Curva LM</button>
      </div>
    </div>
  );
}

export default Seleccion;