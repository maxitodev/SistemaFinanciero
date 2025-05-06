import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import './LM.css';

// Registrar los componentes de Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function LMCalculator() {
  const [params, setParams] = useState({
    M: '50',  // Oferta monetaria
    P: '1',     // Nivel de precios
    k: '1',   // Sensibilidad de la demanda de dinero al ingreso
    h: '50',    // Sensibilidad de la demanda de dinero a la tasa
  });

  const [graphData, setGraphData] = useState(null); // Datos para la gráfica
  const [explanation, setExplanation] = useState(''); // Explicación del cálculo

  const calculateLM = () => {
    try {
      const M = parseFloat(params.M);
      const P = parseFloat(params.P);
      const k = parseFloat(params.k);
      const h = parseFloat(params.h);
  
      if (!M || !P || !k || !h) {
        throw new Error('Por favor, ingrese todos los valores necesarios (M, P, k, h).');
      }
  
      const yValues = Array.from({ length: 11 }, (_, idx) => idx * 20); // Valores de ingreso (Y) de 0 a 100
      const steps = yValues.map(Y => {
        const M_P = M / P; // M / P
        const term_kY = k * Y; // k * Y
        const adjustedDifference = M_P - term_kY; // M / P - k * Y
        const i = adjustedDifference / h; // (M / P - k * Y) / h
        return {
          Y,
          M_P: M_P.toFixed(2),
          term_kY: term_kY.toFixed(2),
          adjustedDifference: adjustedDifference.toFixed(2),
          i: i.toFixed(2),
        };
      });
  
      const iValues = steps.map(step => step.i);
  
      setGraphData({
        labels: steps.map(step => step.i), // Ahora las etiquetas son los valores de i (eje X)
        datasets: [
          {
            label: 'Curva LM',
            data: steps.map(step => step.Y), // Los valores de Y estarán en el eje Y
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            tension: 0.4,
          },
        ],
      });
  
      setExplanation(`
        La curva LM se calculó utilizando la ecuación de equilibrio del mercado de dinero:
        M / P = kY + hi
      
        Donde:
        - M: Oferta monetaria (${M})
        - P: Nivel de precios (${P})
        - k: Sensibilidad de la demanda de dinero al ingreso (${k})
        - h: Sensibilidad de la demanda de dinero a la tasa (${h})
        - Y: Ingreso (valores de 0 a 100)
        - i: Tasa de interés (calculada para cada valor de Y)
      
        Fórmula para calcular la tasa de interés (i):
        i = (M / P - kY) / h
      
        Pasos generales:
        1. Se calcula la cantidad real de dinero disponible dividiendo M entre P:
           M / P = ${M} / ${P} = ${(M / P).toFixed(2)}
        2. Para cada valor de ingreso (Y), se calcula el término k * Y.
        3. Se resta el término k * Y del resultado de M / P.
        4. El resultado se divide entre h para obtener la tasa de interés (i).
      
        Cálculos paso a paso para cada valor de Y:
        ${steps.map(step => `
          Para Y = ${step.Y}:
          1. M / P = ${step.M_P}
          2. k * Y = ${step.term_kY}
          3. M / P - k * Y = ${step.adjustedDifference}
          4. i = ${step.adjustedDifference} / ${h} = ${step.i}
        `).join('\n\n')}
      `);
  
    } catch (error) {
      console.error('Error en cálculo:', error);
      setExplanation('Error en los cálculos: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h2>Calculadora de la Curva LM</h2>

      {/* Sección de entrada de datos */}
      <div className="input-section">
        <h3>Ingrese los datos:</h3>
        <div className="input-list">
          {Object.keys(params).map(key => (
            <div key={key} className="input-group">
              <label>
                {key === 'M' && 'M (Oferta monetaria):'}
                {key === 'P' && 'P (Nivel de precios):'}
                {key === 'k' && 'k (Sensibilidad de la demanda de dinero al ingreso):'}
                {key === 'h' && 'h (Sensibilidad de la demanda de dinero a la tasa):'}
              </label>
              <input
                type="number"
                value={params[key]}
                onChange={e => setParams({ ...params, [key]: e.target.value })}
              />
            </div>
          ))}
        </div>
        <button onClick={calculateLM}>Calcular LM</button>
      </div>

      {/* Sección de gráfica */}
      {graphData && (
        <div className="graph-section">
          <h3>Gráfica de la Curva LM</h3>
          <Line
  data={graphData}
  options={{
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14, // Tamaño de la fuente de la leyenda
            family: 'Arial', // Fuente de la leyenda
          },
          color: '#333', // Color del texto de la leyenda
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo del tooltip
        titleFont: {
          size: 14,
          family: 'Arial',
        },
        bodyFont: {
          size: 12,
          family: 'Arial',
        },
        bodyColor: '#fff', // Color del texto del tooltip
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tasa de interés (i)', // Ahora i está en el eje X
          font: {
            size: 16, // Tamaño de la fuente
            family: 'Arial', // Fuente del título
            weight: 'bold', // Negrita
          },
          color: '#333', // Color del texto
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.3)', // Color de las líneas de la cuadrícula
        },
        ticks: {
          font: {
            size: 12,
            family: 'Arial',
          },
          color: '#333', // Color de las etiquetas
        },
      },
      y: {
        title: {
          display: true,
          text: 'Ingreso (Y)', // Ahora Y está en el eje Y
          font: {
            size: 16, // Tamaño de la fuente
            family: 'Arial', // Fuente del título
            weight: 'bold', // Negrita
          },
          color: '#333', // Color del texto
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.3)', // Color de las líneas de la cuadrícula
        },
        ticks: {
          font: {
            size: 12,
            family: 'Arial',
          },
          color: '#333', // Color de las etiquetas
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3, // Grosor de la línea
        borderColor: '#28a745', // Color de la línea (verde profesional)
        tension: 0.4, // Suavizar la línea
      },
      point: {
        radius: 5, // Tamaño de los puntos
        backgroundColor: '#28a745', // Color de los puntos
        borderWidth: 2, // Grosor del borde de los puntos
        borderColor: '#fff', // Color del borde de los puntos
      },
    },
    animation: {
      duration: 1000, // Duración de la animación en milisegundos
      easing: 'easeInOutQuad', // Tipo de animación
    },
    responsive: true, // Ajuste automático al tamaño del contenedor
    maintainAspectRatio: true, // Mantener la relación de aspecto
  }}
/>
        </div>
      )}

      {/* Sección de explicación */}
      {explanation && (
        <div className="explanation-section">
          <h3>Explicación del cálculo:</h3>
          <p style={{ whiteSpace: 'pre-line' }}>{explanation}</p>
        </div>
      )}
    </div>
  );
}

export default LMCalculator;