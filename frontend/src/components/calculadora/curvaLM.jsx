import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import './LM.css';
import { Link } from 'react-router-dom'; // Importar rutas
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function LMCalculator() {
  const [params, setParams] = useState({
    M: '600',
    P: '1',
    k: '0.1625',
    h: '108',
  });

  const [graphData, setGraphData] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [LMResult, setLMResult] = useState('');
  const [tableData, setTableData] = useState([]);

  const calculateLM = () => {
    try {
      const M = parseFloat(params.M);
      const P = parseFloat(params.P);
      const k = parseFloat(params.k);
      const h = parseFloat(params.h);

      if (!M || !P || !k || !h) {
        throw new Error('Por favor, ingrese todos los valores necesarios (M, P, k, h).');
      }

      // Calcular los coeficientes de la ecuación LM
      const M_P = M / P; // M / P
      const LM_const = M_P / h; // Parte constante de la ecuación LM
      const LM_coef = -k / h; // Coeficiente de Y en la ecuación LM

      // Generar la ecuación de la curva LM
      const LM_equation = `i = ${LM_const.toFixed(2)} + (${LM_coef.toFixed(8)} * Y)`;

      // Generar una tabla de valores para Y e i
      const yValues = Array.from({ length: 11 }, (_, idx) => idx * 400); // Valores de ingreso (Y) de 0 a 4000
      const table = yValues.map(Y => {
        const i = LM_const + LM_coef * Y; // Calcular i para cada Y
        return { Y, i: i.toFixed(2) };
      });

      // Graficar la curva LM
      setGraphData({
        labels: table.map(row => row.Y), // Etiquetas del eje X (valores de Y)
        datasets: [
          {
            label: 'Curva LM',
            data: table.map(row => row.i), // Valores del eje Y (valores de i)
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            tension: 0.4,
          },
        ],
      });

      // Explicación detallada
      setExplanation(`
        **Pasos para encontrar la ecuación de la curva LM:**

        1. Partimos de la ecuación de equilibrio del mercado de dinero:
           M / P = kY + hi

        2. Despejamos la tasa de interés (i):
           i = (M / P - kY) / h

        3. Sustituimos los valores:
           M / P = ${M} / ${P} = ${M_P.toFixed(2)}
           i = (${M_P.toFixed(2)} - ${k} * Y) / ${h}

        4. Simplificamos:
           i = ${LM_const.toFixed(2)} + (${LM_coef.toFixed(2)} * Y)

        **Ecuación de la curva LM:**
        i = ${LM_const.toFixed(2)} + (${LM_coef.toFixed(2)} * Y)
      `);

      // Guardar la ecuación como resultado
      setLMResult(LM_equation);

      // Guardar los datos de la tabla
      setTableData(table);
    } catch (error) {
      console.error('Error en cálculo:', error);
      setExplanation('Error en los cálculos: ' + error.message);
    }
  };

  return (
    <div className="lm-calculator">
      <div className="button-container">
        <Link to="/seleccion">
          <button className="top-left-button">Ir a calculadora</button>
        </Link>
      </div>
      <div className="container">
        <h2>Calculadora de la Curva LM</h2>
        <p>Utiliza esta calculadora para ingresar parámetros y visualizar la relación entre ingreso y tasa de interés.</p>

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

        {/* Resultado de la ecuación */}
        {LMResult && (
          <div className="result-section">
            <h3>Ecuación de la curva LM:</h3>
            <p>{LMResult}</p>
          </div>
        )}

        {/* Explicación del cálculo */}
        {explanation && (
          <div className="explanation-section">
            <h3>Explicación del cálculo:</h3>
            <p style={{ whiteSpace: 'pre-line' }}>{explanation}</p>
          </div>
        )}

        {/* Gráfica de la curva LM */}
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
                      font: { size: 14, family: 'Arial' },
                      color: '#333',
                    },
                  },
                  tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleFont: { size: 14, family: 'Arial' },
                    bodyFont: { size: 12, family: 'Arial' },
                    bodyColor: '#fff',
                  },
                },
                layout: { padding: 20 },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Ingreso (Y)',
                      font: { size: 16, family: 'Arial', weight: 'bold' },
                      color: '#333',
                    },
                    grid: { color: 'rgba(200, 200, 200, 0.3)' },
                    ticks: { font: { size: 12, family: 'Arial' }, color: '#333' },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Tasa de interés (i)',
                      font: { size: 16, family: 'Arial', weight: 'bold' },
                      color: '#333',
                    },
                    grid: { color: 'rgba(200, 200, 200, 0.3)' },
                    ticks: { font: { size: 12, family: 'Arial' }, color: '#333' },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 3,
                    borderColor: '#28a745',
                    tension: 0.4,
                  },
                  point: {
                    radius: 5,
                    backgroundColor: '#28a745',
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

        {/* Tabla de valores */}
        {tableData.length > 0 && (
          <div className="table-section">
            <h3>Tabla de valores:</h3>
            <table>
              <thead>
                <tr>
                  <th>Ingreso (Y)</th>
                  <th>Tasa de interés (i)</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.Y}</td>
                    <td>{row.i}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default LMCalculator;