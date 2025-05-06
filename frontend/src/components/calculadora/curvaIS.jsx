import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import './IS.css';

// Registrar los componentes de Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function ISCalculator() {
  const [params, setParams] = useState({
    C0: '20',  // Parte autónoma del consumo
    b: '0.6',  // Propensión marginal a consumir
    TR: '30',  // Transferencias del gobierno
    t: '0.4',  // Tasa impositiva
    G: '500',  // Gasto público
    I0: '600', // Parte autónoma de la inversión
    I1: '40',  // Sensibilidad de la inversión a la tasa de interés
  });

  const [graphData, setGraphData] = useState(null); // Datos para la gráfica
  const [explanation, setExplanation] = useState(''); // Explicación del cálculo

  const calculateIS = () => {
    try {
      const C0 = parseFloat(params.C0) || 0;
      const b = parseFloat(params.b) || 0;
      const TR = parseFloat(params.TR) || 0;
      const t = parseFloat(params.t) || 0;
      const G = parseFloat(params.G) || 0;
      const I0 = parseFloat(params.I0) || 0;
      const I1 = parseFloat(params.I1) || 0;

      // Generar valores para la gráfica
      const iValues = Array.from({ length: 11 }, (_, idx) => idx * 0.1); // Tasa de interés de 0% a 1%
      const yValues = iValues.map(i => {
        const Yd = (1 - t) * (C0 + b * TR); // Ingreso disponible
        const I = I0 - I1 * i; // Inversión dependiente de la tasa de interés
        const Y = C0 + b * Yd + I + G; // Demanda agregada en equilibrio
        return Y.toFixed(2);
      });

      setGraphData({
        labels: iValues.map(i => i.toFixed(2)),
        datasets: [
          {
            label: 'Curva IS',
            data: yValues,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            tension: 0.4,
          },
        ],
      });

      // Generar explicación detallada del cálculo
      const steps = iValues.map(i => {
        const Yd = ((1 - t) * (C0 + b * TR)).toFixed(2); // Ingreso disponible
        const I = (I0 - I1 * i).toFixed(2); // Inversión
        const Y = (C0 + b * Yd + parseFloat(I) + G).toFixed(2); // Ingreso en equilibrio
        return `Para i = ${i.toFixed(2)}:
          1. Ingreso disponible (Yd) = (1 - t) * (C0 + b * TR)
             Yd = (1 - ${t}) * (${C0} + ${b} * ${TR}) = ${Yd}
          2. Inversión (I) = I0 - I1 * i
             I = ${I0} - ${I1} * ${i.toFixed(2)} = ${I}
          3. Ingreso en equilibrio (Y) = C0 + b * Yd + I + G
             Y = ${C0} + ${b} * ${Yd} + ${I} + ${G} = ${Y}`;
      }).join('\n\n');

      setExplanation(`
        La curva IS se calculó utilizando la ecuación de equilibrio del mercado de bienes:
        Y = C + I + G

        Donde:
        - C: Consumo
        - I: Inversión
        - G: Gasto público

        Fórmulas utilizadas:
        1. Consumo (C):
           C = C0 + b * Yd
           Yd = Y(1 - t) + TR
           Donde:
           - C0: Consumo autónomo (${C0})
           - b: Propensión marginal a consumir (${b})
           - t: Tasa impositiva (${t})
           - TR: Transferencias del gobierno (${TR})

        2. Inversión (I):
           I = I0 - I1 * i
           Donde:
           - I0: Inversión autónoma (${I0})
           - I1: Sensibilidad de la inversión a la tasa de interés (${I1})
           - i: Tasa de interés (valores de 0 a 1)

        3. Demanda agregada (DA):
           DA = C + I + G
           Donde:
           - G: Gasto público (${G})

        Pasos generales:
        1. Se calcula el ingreso disponible (Yd) como:
           Yd = (1 - t) * (C0 + b * TR)
        2. Se calcula el consumo (C) utilizando:
           C = C0 + b * Yd
        3. Se calcula la inversión (I) para cada valor de la tasa de interés (i):
           I = I0 - I1 * i
        4. Finalmente, se calcula el ingreso (Y) en equilibrio para cada valor de i:
           Y = C + I + G

        Cálculos paso a paso para cada valor de i:
        ${steps}
      `);
    } catch (error) {
      console.error('Error en cálculo:', error);
      setExplanation('Error en los cálculos: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h2>Calculadora de la Curva IS</h2>

      {/* Sección de entrada de datos */}
      <div className="input-section">
        <h3>Ingrese los datos:</h3>
        <div className="input-list">
          {Object.keys(params).map(key => (
            <div key={key} className="input-group">
              <label>
                {key === 'C0' && 'C0 (Consumo autónomo):'}
                {key === 'b' && 'b (Propensión marginal a consumir):'}
                {key === 'TR' && 'TR (Transferencias del gobierno):'}
                {key === 't' && 't (Tasa impositiva):'}
                {key === 'G' && 'G (Gasto público):'}
                {key === 'I0' && 'I0 (Inversión autónoma):'}
                {key === 'I1' && 'I1 (Sensibilidad de la inversión a la tasa de interés):'}
              </label>
              <input
                type="number"
                value={params[key]}
                onChange={e => setParams({ ...params, [key]: e.target.value })}
              />
            </div>
          ))}
        </div>
        <button onClick={calculateIS}>Calcular IS</button>
      </div>

      {/* Sección de gráfica */}
      {graphData && (
  <div className="graph-section">
    <h3>Gráfica de la Curva IS</h3>
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
          text: 'Tasa de interés (i)', // Nombre del eje X
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
          text: 'Ingreso (Y)', // Nombre del eje Y
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
        borderColor: '#007bff', // Color de la línea
        tension: 0.4, // Suavizar la línea
      },
      point: {
        radius: 5, // Tamaño de los puntos
        backgroundColor: '#007bff', // Color de los puntos
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

export default ISCalculator;