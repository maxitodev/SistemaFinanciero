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
  const [tableData, setTableData] = useState([]); // Datos para la tabla
  const [explanation, setExplanation] = useState(''); // Explicación del cálculo
  const [ISResult, setISResult] = useState('');

  const calculateIS = () => {
    try {
      const C0 = parseFloat(params.C0) || 0;
      const b = parseFloat(params.b) || 0;
      const TR = parseFloat(params.TR) || 0;
      const t = parseFloat(params.t) || 0;
      const G = parseFloat(params.G) || 0;
      const I0 = parseFloat(params.I0) || 0;
      const I1 = parseFloat(params.I1) || 0;
  
      // Calcular los coeficientes de la ecuación IS
      const Yd_const = (1 - t) * (C0 + b * TR); // Parte constante del ingreso disponible
      const C_const = C0 + b * Yd_const; // Parte constante del consumo
      const IS_const = (C0 + I0 + G) / (1 - b);
      const IS_coef = -I1 / (1 - b);
  
      // Generar la ecuación de la curva IS
      const IS_equation = `Y = ${IS_const.toFixed(2)} + (${IS_coef.toFixed(2)} * i)`;
  
      // Generar una tabla de valores para i y Y
      const iValues = Array.from({ length: 11 }, (_, idx) => idx * 0.1); // Tasa de interés de 0 a 1
      const table = iValues.map(i => {
        const Y = IS_const + IS_coef * i; // Calcular Y para cada i
        return { i: i.toFixed(2), Y: Y.toFixed(2) };
      });
  
      // Graficar la curva IS
      setGraphData({
        labels: table.map(row => row.i), // Etiquetas del eje X (valores de i)
        datasets: [
          {
            label: 'Curva IS',
            data: table.map(row => row.Y), // Valores del eje Y (valores de Y)
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            tension: 0.4,
          },
        ],
      });
  
      // Mostrar los pasos para encontrar la ecuación
      setExplanation(`
        **Pasos para encontrar la ecuación de la curva IS:**
        
        1. Partimos del equilibrio del mercado de bienes:
           Y = C + I + G
        
        2. Sustituimos las funciones de consumo e inversión:
           C = C₀ + bY
           I = I₀ - I₁i
        
           Entonces:
           Y = (C₀ + bY) + (I₀ - I₁i) + G
        
        3. Agrupamos términos:
           Y - bY = C₀ + I₀ + G - I₁i
           Y(1 - b) = C₀ + I₀ + G - I₁i
        
        4. Despejamos Y:
           Y = (C₀ + I₀ + G) / (1 - b) - (I₁ / (1 - b)) * i
        
        5. Sustituimos valores:
           Y = (${C0} + ${I0} + ${G}) / (1 - ${b}) - (${I1} / (1 - ${b})) * i
           Y = ${(IS_const).toFixed(2)} + (${IS_coef.toFixed(2)} * i)
        
        **Ecuación de la curva IS:**
        Y = ${IS_const.toFixed(2)} + (${IS_coef.toFixed(2)} * i)
        `);
  
      // Guardar los datos de la tabla en el estado
      setTableData(table);
  
      // Mostrar la ecuación como resultado
      setISResult(IS_equation);
    } catch (error) {
      console.error('Error en cálculo:', error);
      setExplanation('Error en los cálculos: ' + error.message);
    }
  };

  return (
    <div className="is-calculator">
      <div className="container">
        <h2>Calculadora de la Curva IS</h2>
        <p>Utiliza esta calculadora para ingresar parámetros y visualizar el equilibrio del mercado de bienes.</p>

        {/* Sección de entrada de datos */}
        <div className="input-section">
          <h3>Ingrese los datos:</h3>
          <div className="input-list">
            {Object.keys(params).map(key => (
              <div key={key} className="input-group">
                <label>
                  {key === 'C0' && 'C0 (Consumo autónomo = c en la variable C):'}
                  {key === 'b' && 'b (Propensión marginal a consumir = y de la variable C):'}
                  {key === 'TR' && 'TR (Transferencias del gobierno ):'}
                  {key === 't' && 't (Tasa impositiva):'}
                  {key === 'G' && 'G (Gasto público):'}
                  {key === 'I0' && 'I0 (Inversión autónoma = al primer valor en la variable I):'}
                  {key === 'I1' && 'I1 (Sensibilidad de la inversión a la tasa de interés = al segundo valor en la variable I):'}
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
          {ISResult !== '' && (
            <div className="result-section">
              <h3>Resultado IS: {ISResult}</h3>
            </div>
          )}
        </div>

        {/* Sección de explicación */}
        {explanation && (
          <div className="explanation-section">
            <h3>Explicación del cálculo:</h3>
            <p style={{ whiteSpace: 'pre-line' }}>{explanation}</p>
          </div>
        )}


        {/* Sección de tabla */}
        {tableData.length > 0 && (
          <div className="table-section">
            <h3>Tabla de valores:</h3>
            <table>
              <thead>
                <tr>
                  <th>Tasa de interés (i)</th>
                  <th>Ingreso (Y)</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.i}</td>
                    <td>{row.Y}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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
                        size: 14,
                        family: 'Arial',
                      },
                      color: '#333',
                    },
                  },
                  tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleFont: {
                      size: 14,
                      family: 'Arial',
                    },
                    bodyFont: {
                      size: 12,
                      family: 'Arial',
                    },
                    bodyColor: '#fff',
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
                      text: 'Tasa de interés (i)',
                      font: {
                        size: 16,
                        family: 'Arial',
                        weight: 'bold',
                      },
                      color: '#333',
                    },
                    grid: {
                      color: 'rgba(200, 200, 200, 0.3)',
                    },
                    ticks: {
                      font: {
                        size: 12,
                        family: 'Arial',
                      },
                      color: '#333',
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Ingreso (Y)',
                      font: {
                        size: 16,
                        family: 'Arial',
                        weight: 'bold',
                      },
                      color: '#333',
                    },
                    grid: {
                      color: 'rgba(200, 200, 200, 0.3)',
                    },
                    ticks: {
                      font: {
                        size: 12,
                        family: 'Arial',
                      },
                      color: '#333',
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 3,
                    borderColor: '#007bff',
                    tension: 0.4,
                  },
                  point: {
                    radius: 5,
                    backgroundColor: '#007bff',
                    borderWidth: 2,
                    borderColor: '#fff',
                  },
                },
                animation: {
                  duration: 1000,
                  easing: 'easeInOutQuad',
                },
                responsive: true,
                maintainAspectRatio: true,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ISCalculator;