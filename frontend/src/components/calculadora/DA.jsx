import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from 'chart.js';
import './DA.css';

// Registrar los componentes de Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

function DACombined() {
  const [params, setParams] = useState({
    C0: '20',  // Parte autónoma del consumo
    b: '0.6',  // Propensión marginal a consumir
    TR: '30',  // Transferencias del gobierno
    t: '0.4',  // Tasa impositiva
    G: '500',  // Gasto público
    I0: '600', // Parte autónoma de la inversión
    I1: '40',  // Sensibilidad de la inversión a la tasa de interés
    i: '0.2',  // Tasa de interés
    DA: ''     // Resultado de la Demanda Agregada
  });

  const [graphData, setGraphData] = useState(null);
  const [explanation, setExplanation] = useState('');

  const calculateDA = () => {
    try {
      const C0 = parseFloat(params.C0) || 0;
      const b = parseFloat(params.b) || 0;
      const TR = parseFloat(params.TR) || 0;
      const t = parseFloat(params.t) || 0;
      const G = parseFloat(params.G) || 0;
      const I0 = parseFloat(params.I0) || 0;
      const I1 = parseFloat(params.I1) || 0;
      const i = parseFloat(params.i) || 0;
  
      // Función para redondear a 2 decimales
      const roundToTwo = (num) => Math.round(num * 100) / 100;
  
      // Calcular valores intermedios con redondeo
      const simplified_C = roundToTwo(C0 + b * TR);
      const coef_Y = roundToTwo(b * (1 - t));
      const DA_const = roundToTwo(simplified_C + I0 - I1 * i + G);
      const DA_Ycoef = coef_Y;
  
      // Calcular Y con redondeo
      const Y_eq = roundToTwo(DA_const / (1 - DA_Ycoef));
  
      // Generar valores para la gráfica
      const iValues = Array.from({ length: 21 }, (_, idx) => roundToTwo(idx * 0.1));
      const yValues = iValues.map(iVal => {
        const I = roundToTwo(I0 - I1 * iVal);
        const Y = roundToTwo((C0 + b * ((1 - t) * 1 + TR) + I + G) / (1 - b * (1 - t)));
        return Y;
      });
  
      // Configurar datos de la gráfica
      setGraphData({
        labels: iValues.map(i => i.toFixed(2)),
        datasets: [
          {
            label: 'Demanda Agregada (DA) vs i',
            data: yValues,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            tension: 0.4,
          },
        ],
      });
  
      // Explicación del cálculo
      setExplanation(`
  Fórmulas utilizadas:
  
  C = C0 + b * Yd
  Yd = Y(1 - t) + TR
  I = I0 - I1 * i
  DA = C + I + G
  
  Sustituyendo:
  C = ${C0} + ${b} * Yd
  Yd = Y(1 - ${t}) + ${TR}
  I = ${I0} - ${I1} * i
  G = ${G}
  
  DA = ${DA_const.toFixed(2)} + ${DA_Ycoef.toFixed(2)}Y
  
  Si DA = Y:
  Y = ${DA_const.toFixed(2)} / (1 - ${DA_Ycoef.toFixed(2)}) = ${Y_eq}
      `);
  
      // Actualizar el estado con el resultado de DA
      setParams({ ...params, DA: Y_eq });
    } catch (error) {
      console.error('Error en el cálculo:', error);
      setExplanation('Error: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h2>Calculadora de Demanda Agregada (DA)</h2>

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
                {key === 'i' && 'i (Tasa de interés):'}
              </label>
              <input
                type="number"
                value={params[key]}
                onChange={e => setParams({ ...params, [key]: e.target.value })}
              />
            </div>
          ))}
        </div>
        <button onClick={calculateDA}>Calcular DA</button>
      </div>

      {graphData && (
        <div className="graph-section">
          <h3>Gráfica de la Demanda Agregada vs Tasa de interés (i)</h3>
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
          text: 'Ingreso (Y)', // Nombre del eje X
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
          text: 'Tasa de interés (i)', // Nombre del eje Y
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

      {explanation && (
        <div className="explanation-section">
          <h3>Explicación del cálculo:</h3>
          <p style={{ whiteSpace: 'pre-line' }}>{explanation}</p>
        </div>
      )}
    </div>
  );
}

export default DACombined;