import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './MacroImpactSimulator.css';

function MacroImpactSimulator() {
  const navigate = useNavigate(); // Initialize navigation
  const [step, setStep] = useState(0); // Controla el paso actual del simulador
  const [inputs, setInputs] = useState({
    ventasNetas: '',
    interesesGanados: '',
    ingresosArrendados: '',
    servicios: '',
    otrosIngresos: '',
    totalIncome: '', // Add totalIncome to inputs
  });
  const [savedTable, setSavedTable] = useState(null); // Guarda la tabla generada
  const [costosGastos, setCostosGastos] = useState({
    costoVentas: '',
    utilidadBruta: '',
    provisionPerdidas: '',
    gastosAdministracion: '',
    totalCostosGastos: '', // Add totalCostosGastos to costosGastos
    utilidadOperacion: '',
    interesesCargo: '',
    perdidaCambiaria: '',
    costosFinancieros: '',
    utilidadCambiaria: '',
    rendimientosInversiones: '',
    ingresosFinancieros: '',
    participacionResultados: '',
    utilidadAntesImpuestos: '',
    impuestosUtilidad: '',
    utilidadNetaConsolidada: '',
  });
  const [savedCostosGastos, setSavedCostosGastos] = useState(null); // Guarda la tabla de costos y gastos generada
  const [otrasPartidas, setOtrasPartidas] = useState({
    valuacionCoberturas: '',
    efectoConversion: '',
  });
  const [savedOtrasPartidas, setSavedOtrasPartidas] = useState(null); // Guarda la tabla de otras partidas generada
  const [otrasPartidasNoReclasificadas, setOtrasPartidasNoReclasificadas] = useState({
    cambiosValorRazonable: '',
    remedicionesPasivo: '',
    utilidadIntegralConsolidada: '',
  });
  const [utilidadNeta, setUtilidadNeta] = useState({
    propietariosControladora: '',
    participacionNoControladora: '',
    utilidadNeta: '',
    utilidadPorAccionBasica: '',
  });
  const [savedUtilidadNeta, setSavedUtilidadNeta] = useState(null); // Guarda la tabla de utilidad neta generada
  const [utilidadIntegral, setUtilidadIntegral] = useState({
    propietariosControladora: '',
    participacionNoControladora: '',
    resultadoIntegralTotal: '',
    utilidadIntegralPorAccionBasica: '',
    ebitda: '',
  });
  const [savedUtilidadIntegral, setSavedUtilidadIntegral] = useState(null); // Guarda la tabla de utilidad integral generada

  const startCreatingIncomeStatement = () => {
    setStep(1); // Avanza al paso de creación de la tabla de ingresos de operación
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCostosGastosChange = (e) => {
    const { name, value } = e.target;
    setCostosGastos((prev) => ({ ...prev, [name]: value }));
  };

  const handleOtrasPartidasChange = (e) => {
    const { name, value } = e.target;
    setOtrasPartidas((prev) => ({ ...prev, [name]: value }));
  };

  const handleOtrasPartidasNoReclasificadasChange = (e) => {
    const { name, value } = e.target;
    setOtrasPartidasNoReclasificadas((prev) => ({ ...prev, [name]: value }));
  };

  const handleUtilidadNetaChange = (e) => {
    const { name, value } = e.target;
    setUtilidadNeta((prev) => ({ ...prev, [name]: value }));
  };

  const handleUtilidadIntegralChange = (e) => {
    const { name, value } = e.target;
    setUtilidadIntegral((prev) => ({ ...prev, [name]: value }));
  };

  const saveTable = () => {
    const tableData = {
      ...inputs,
      totalIncome: inputs.totalIncome, // Use the user-entered totalIncome
    };
    setSavedTable(tableData);
    localStorage.setItem('savedTable', JSON.stringify(tableData)); // Save to local storage
    setStep(2); // Avanza al paso de mostrar la tabla generada
  };

  const saveCostosGastosTable = () => {
    const tableData = {
      ...costosGastos,
      totalCostosGastos: costosGastos.totalCostosGastos, // Use the user-entered totalCostosGastos
    };
    setSavedCostosGastos(tableData); // Guarda la tabla en el estado
    localStorage.setItem('savedCostosGastos', JSON.stringify(tableData)); // Save to local storage
    setStep(4); // Avanza al paso de mostrar la tabla de costos y gastos
  };

  const saveOtrasPartidasTable = () => {
    const tableData = { ...otrasPartidas };
    setSavedOtrasPartidas(tableData); // Guarda la tabla en el estado
    localStorage.setItem('savedOtrasPartidas1', JSON.stringify(tableData)); // Save to local storage
    setStep(6); // Avanza al paso de mostrar la tabla de otras partidas
  };

  const saveOtrasPartidasNoReclasificadasTable = () => {
    const tableData = { ...otrasPartidasNoReclasificadas };
    setOtrasPartidasNoReclasificadas(tableData); // Guarda la tabla en el estado
    localStorage.setItem('savedOtrasPartidasNoReclasificadas', JSON.stringify(tableData)); // Save to local storage
    setStep(8); // Avanza al paso de mostrar la tabla de otras partidas no reclasificadas
  };

  const saveUtilidadNetaTable = () => {
    const tableData = { ...utilidadNeta };
    setSavedUtilidadNeta(tableData); // Guarda la tabla en el estado
    localStorage.setItem('savedUtilidadNeta', JSON.stringify(tableData)); // Save to local storage
    setStep(10); // Avanza al paso de mostrar la tabla de utilidad neta
  };

  const saveUtilidadIntegralTable = () => {
    const tableData = { ...utilidadIntegral };
    setSavedUtilidadIntegral(tableData); // Guarda la tabla en el estado
    localStorage.setItem('savedUtilidadIntegral', JSON.stringify(tableData)); // Save to local storage
    setStep(12); // Avanza al paso de mostrar la tabla de utilidad integral
  };

  return (
    <div className="macro-impact-simulator">
      {step === 0 && (
        <div className="introduction">
          <h1>Simulador de Impacto Macro-Financiero</h1>
          <p>
            Este simulador se basa en cómo las variables macroeconómicas afectan
            las razones financieras.{"\n"}
            Gracias a la modificación en el estado de resultados, podrás analizar
            el impacto macroeconómico.
          </p>
          <p>
            Para comenzar, deberás ingresar el estado de resultados y las
            variables necesarias.
          </p>
          <button onClick={startCreatingIncomeStatement}>
            Crear Estado de Resultados
          </button>
        </div>
      )}
      {step === 1 && (
        <div className="income-statement-creation">
          <h2>Crear Tabla de Ingresos de Operación</h2>
          <p>Por favor, ingresa los datos necesarios para la tabla de ingresos de operación.</p>
          <form>
            <label>
              Ventas netas de mercancía:  
              <input
                type="number"
                name="ventasNetas"
                value={inputs.ventasNetas}
                onChange={handleInputChange}
                style={{ marginLeft: '8px' }} // Ajusta el valor según sea necesario
              />
            </label>
            <br />
            <label>
              Intereses ganados de clientes:
              <input
                type="number"
                name="interesesGanados"
                value={inputs.interesesGanados}
                onChange={handleInputChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Ingresos de propiedades arrendadas:
              <input
                type="number"
                name="ingresosArrendados"
                value={inputs.ingresosArrendados}
                onChange={handleInputChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Servicios:
              <input
                type="number"
                name="servicios"
                value={inputs.servicios}
                onChange={handleInputChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Otros ingresos:
              <input
                type="number"
                name="otrosIngresos"
                value={inputs.otrosIngresos}
                onChange={handleInputChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Total de ingresos:
              <input
                type="number"
                name="totalIncome"
                value={inputs.totalIncome}
                onChange={handleInputChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
          </form>
          <h3>Total de ingresos: {inputs.totalIncome || 0}</h3>
          <button onClick={saveTable}>Guardar y Mostrar Tabla</button>
        </div>
      )}
      {step === 2 && savedTable && (
        <div className="generated-table">
          <h2>Ingresos de Operación</h2>
          <table>
            <thead>
              <tr>
                <th>Variable</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ventas netas de mercancía</td>
                <td>{parseFloat(savedTable.ventasNetas).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Intereses ganados de clientes</td>
                <td>{parseFloat(savedTable.interesesGanados).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Ingresos de propiedades arrendadas</td>
                <td>{parseFloat(savedTable.ingresosArrendados).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Servicios</td>
                <td>{parseFloat(savedTable.servicios).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Otros ingresos</td>
                <td>{parseFloat(savedTable.otrosIngresos).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td><strong>Total de ingresos</strong></td>
                <td><strong>{savedTable.totalIncome.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</strong></td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => setStep(3)}>Siguiente</button>
        </div>
      )}
      {step === 3 && (
        <div className="costos-gastos-creation">
          <h2>Costos y Gastos</h2>
          <p>Por favor, ingresa los datos necesarios para la tabla de costos y gastos.</p>
          <form>
            <label>
              Costo de ventas:
              <input
                type="number"
                name="costoVentas"
                value={costosGastos.costoVentas}
                onChange={handleCostosGastosChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Utilidad bruta:
              <input
                type="number"
                name="utilidadBruta"
                value={costosGastos.utilidadBruta}
                onChange={handleCostosGastosChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Provisión para pérdidas crediticias:
              <input
                type="number"
                name="provisionPerdidas"
                value={costosGastos.provisionPerdidas}
                onChange={handleCostosGastosChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Gastos de administración:
              <input
                type="number"
                name="gastosAdministracion"
                value={costosGastos.gastosAdministracion}
                onChange={handleCostosGastosChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Intereses a cargo:
              <input
                type="number"
                name="interesesCargo"
                value={costosGastos.interesesCargo}
                onChange={handleCostosGastosChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Pérdida cambiaria:
              <input
                type="number"
                name="perdidaCambiaria"
                value={costosGastos.perdidaCambiaria}
                onChange={handleCostosGastosChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Costos financieros:
              <input
                type="number"
                name="costosFinancieros"
                value={costosGastos.costosFinancieros}
                onChange={handleCostosGastosChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Utilidad cambiaria:
              <input
                type="number"
                name="utilidadCambiaria"
                value={costosGastos.utilidadCambiaria}
                onChange={handleCostosGastosChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Rendimientos sobre inversiones:
              <input
                type="number"
                name="rendimientosInversiones"
                value={costosGastos.rendimientosInversiones}
                onChange={handleCostosGastosChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Ingresos financieros:
              <input
                type="number"
                name="ingresosFinancieros"
                value={costosGastos.ingresosFinancieros}
                onChange={handleCostosGastosChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Participación en los resultados de asociadas:
              <input
                type="number"
                name="participacionResultados"
                value={costosGastos.participacionResultados}
                onChange={handleCostosGastosChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Utilidad antes de impuestos:
              <input
                type="number"
                name="utilidadAntesImpuestos"
                value={costosGastos.utilidadAntesImpuestos}
                onChange={handleCostosGastosChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Impuestos a la utilidad:
              <input
                type="number"
                name="impuestosUtilidad"
                value={costosGastos.impuestosUtilidad}
                onChange={handleCostosGastosChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Utilidad neta consolidada:
              <input
                type="number"
                name="utilidadNetaConsolidada"
                value={costosGastos.utilidadNetaConsolidada}
                onChange={handleCostosGastosChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Total de costos y gastos:
              <input
                type="number"
                name="totalCostosGastos"
                value={costosGastos.totalCostosGastos}
                onChange={handleCostosGastosChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
          </form>
          <h3>Total de costos y gastos: {costosGastos.totalCostosGastos || 0}</h3>
          <button onClick={saveCostosGastosTable}>Guardar y Mostrar Tabla</button>
        </div>
      )}
      {step === 4 && savedCostosGastos && (
        <div className="generated-table">
          <h2>Costos y Gastos</h2>
          <table>
            <thead>
              <tr>
                <th>Variable</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Costo de ventas</td>
                <td>{parseFloat(savedCostosGastos.costoVentas).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Utilidad bruta</td>
                <td>{parseFloat(savedCostosGastos.utilidadBruta).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Provisión para pérdidas crediticias</td>
                <td>{parseFloat(savedCostosGastos.provisionPerdidas).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Gastos de administración</td>
                <td>{parseFloat(savedCostosGastos.gastosAdministracion).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Total de costos y gastos</td>
                <td>{parseFloat(savedCostosGastos.totalCostosGastos).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Utilidad de operación</td>
                <td>{parseFloat(savedCostosGastos.utilidadOperacion).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Intereses a cargo</td>
                <td>{parseFloat(savedCostosGastos.interesesCargo).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Pérdida cambiaria</td>
                <td>{parseFloat(savedCostosGastos.perdidaCambiaria).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Costos financieros</td>
                <td>{parseFloat(savedCostosGastos.costosFinancieros).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Utilidad cambiaria</td>
                <td>{parseFloat(savedCostosGastos.utilidadCambiaria).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Rendimientos sobre inversiones</td>
                <td>{parseFloat(savedCostosGastos.rendimientosInversiones).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Ingresos financieros</td>
                <td>{parseFloat(savedCostosGastos.ingresosFinancieros).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Participación en los resultados de asociadas</td>
                <td>{parseFloat(savedCostosGastos.participacionResultados).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Utilidad antes de impuestos</td>
                <td>{parseFloat(savedCostosGastos.utilidadAntesImpuestos).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Impuestos a la utilidad</td>
                <td>{parseFloat(savedCostosGastos.impuestosUtilidad).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td><strong>Utilidad neta consolidada</strong></td>
                <td><strong>{parseFloat(savedCostosGastos.utilidadNetaConsolidada).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</strong></td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => setStep(5)}>Siguiente</button>
        </div>
      )}
      {step === 5 && (
        <div className="otras-partidas-creation">
          <h2>Otras Partidas de la Utilidad Integral</h2>
          <h3>Partidas que serán reclasificadas a resultados</h3>
          <p>Por favor, ingresa los datos necesarios para la tabla de otras partidas de la utilidad integral.</p>
          <form>
            <label>
              Valuación de instrumentos financieros contratados como coberturas de flujo de efectivo:
              <input
                type="number"
                name="valuacionCoberturas"
                value={otrasPartidas.valuacionCoberturas}
                onChange={handleOtrasPartidasChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Efecto de conversión por inversión en asociadas (Netos de impuestos):
              <input
                type="number"
                name="efectoConversion"
                value={otrasPartidas.efectoConversion}
                onChange={handleOtrasPartidasChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
          </form>
          <button onClick={saveOtrasPartidasTable}>Guardar y Mostrar Tabla</button>
        </div>
      )}
      {step === 6 && savedOtrasPartidas && (
        <div className="generated-table">
          <h2>Otras Partidas de la Utilidad Integral</h2>
          <h3>Partidas que serán reclasificadas a resultados</h3>
          <table>
            <thead>
              <tr>
                <th>Variable</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Valuación de instrumentos financieros contratados como coberturas de flujo de efectivo</td>
                <td>{parseFloat(savedOtrasPartidas.valuacionCoberturas).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Efecto de conversión por inversión en asociadas (Netos de impuestos)</td>
                <td>{parseFloat(savedOtrasPartidas.efectoConversion).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => setStep(7)}>Siguiente</button>
        </div>
      )}
      {step === 7 && (
        <div className="otras-partidas-no-reclasificadas-creation">
          <h2>Otras Partidas de la Utilidad Integral</h2>
          <h3>Partidas que no serán reclasificadas a resultados</h3>
          <p>Por favor, ingresa los datos necesarios para la tabla de otras partidas de la utilidad integral.</p>
          <form>
            <label>
              Cambios en el valor razonable de las inversiones de capital a valor razonable a través de otros resultados integrales (Netos de impuestos):
              <input
                type="number"
                name="cambiosValorRazonable"
                value={otrasPartidasNoReclasificadas.cambiosValorRazonable}
                onChange={handleOtrasPartidasNoReclasificadasChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Remediciones del pasivo por beneficios definidos (Netas de impuestos):
              <input
                type="number"
                name="remedicionesPasivo"
                value={otrasPartidasNoReclasificadas.remedicionesPasivo}
                onChange={handleOtrasPartidasNoReclasificadasChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Utilidad integral consolidada:
              <input
                type="number"
                name="utilidadIntegralConsolidada"
                value={otrasPartidasNoReclasificadas.utilidadIntegralConsolidada}
                onChange={handleOtrasPartidasNoReclasificadasChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
          </form>
          <button onClick={saveOtrasPartidasNoReclasificadasTable}>Guardar y Mostrar Tabla</button>
        </div>
      )}
      {step === 8 && (
        <div className="generated-table">
          <h2>Otras Partidas de la Utilidad Integral</h2>
          <h3>Partidas que no serán reclasificadas a resultados</h3>
          <table>
            <thead>
              <tr>
                <th>Variable</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cambios en el valor razonable de las inversiones de capital a valor razonable a través de otros resultados integrales (Netos de impuestos)</td>
                <td>{parseFloat(otrasPartidasNoReclasificadas.cambiosValorRazonable).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Remediciones del pasivo por beneficios definidos (Netas de impuestos)</td>
                <td>{parseFloat(otrasPartidasNoReclasificadas.remedicionesPasivo).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td><strong>Utilidad integral consolidada</strong></td>
                <td><strong>{parseFloat(otrasPartidasNoReclasificadas.utilidadIntegralConsolidada).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</strong></td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => setStep(9)}>Siguiente</button>
        </div>
      )}
      {step === 9 && (
        <div className="utilidad-neta-creation">
          <h2>Utilidad Neta</h2>
          <p>Por favor, ingresa los datos necesarios para la tabla de utilidad neta.</p>
          <form>
            <label>
              Propietarios de la controladora:
              <input
                type="number"
                name="propietariosControladora"
                value={utilidadNeta.propietariosControladora}
                onChange={handleUtilidadNetaChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Participación no controladora:
              <input
                type="number"
                name="participacionNoControladora"
                value={utilidadNeta.participacionNoControladora}
                onChange={handleUtilidadNetaChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Utilidad Neta:
              <input
                type="number"
                name="utilidadNeta"
                value={utilidadNeta.utilidadNeta}
                onChange={handleUtilidadNetaChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Utilidad por acción básica:
              <input
                type="number"
                name="utilidadPorAccionBasica"
                value={utilidadNeta.utilidadPorAccionBasica}
                onChange={handleUtilidadNetaChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
          </form>
          <button onClick={saveUtilidadNetaTable}>Guardar y Mostrar Tabla</button>
        </div>
      )}
      {step === 10 && savedUtilidadNeta && (
        <div className="generated-table">
          <h2>Utilidad Neta</h2>
          <h3>Atribuible a</h3> {/* Add subtitle */}
          <table>
            <thead>
              <tr>
                <th>Variable</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Propietarios de la controladora</td>
                <td>{parseFloat(savedUtilidadNeta.propietariosControladora).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Participación no controladora</td>
                <td>{parseFloat(savedUtilidadNeta.participacionNoControladora).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Utilidad Neta</td>
                <td>{parseFloat(savedUtilidadNeta.utilidadNeta).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Utilidad por acción básica</td>
                <td>{parseFloat(savedUtilidadNeta.utilidadPorAccionBasica).toLocaleString('es-ES')}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => setStep(11)}>Siguiente</button>
        </div>
      )}
      {step === 11 && (
        <div className="utilidad-integral-creation">
          <h2>Utilidad Integral</h2>
          <h3>Atribuible a</h3>
          <p>Por favor, ingresa los datos necesarios para la tabla de utilidad integral.</p>
          <form>
            <label>
              Propietarios de la controladora:
              <input
                type="number"
                name="propietariosControladora"
                value={utilidadIntegral.propietariosControladora}
                onChange={handleUtilidadIntegralChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Participación no controladora:
              <input
                type="number"
                name="participacionNoControladora"
                value={utilidadIntegral.participacionNoControladora}
                onChange={handleUtilidadIntegralChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Resultado integral total:
              <input
                type="number"
                name="resultadoIntegralTotal"
                value={utilidadIntegral.resultadoIntegralTotal}
                onChange={handleUtilidadIntegralChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              Utilidad integral por acción básica:
              <input
                type="number"
                name="utilidadIntegralPorAccionBasica"
                value={utilidadIntegral.utilidadIntegralPorAccionBasica}
                onChange={handleUtilidadIntegralChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>
              EBITDA:
              <input
                type="number"
                name="ebitda"
                value={utilidadIntegral.ebitda}
                onChange={handleUtilidadIntegralChange}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
          </form>
          <button onClick={saveUtilidadIntegralTable}>Guardar y Mostrar Tabla</button>
        </div>
      )}
      {step === 12 && savedUtilidadIntegral && (
        <div className="generated-table">
          <h2>Utilidad Integral</h2>
          <h3>Atribuible a</h3>
          <table>
            <thead>
              <tr>
                <th>Variable</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Propietarios de la controladora</td>
                <td>{parseFloat(savedUtilidadIntegral.propietariosControladora).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Participación no controladora</td>
                <td>{parseFloat(savedUtilidadIntegral.participacionNoControladora).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Resultado integral total</td>
                <td>{parseFloat(savedUtilidadIntegral.resultadoIntegralTotal).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
              <tr>
                <td>Utilidad integral por acción básica</td>
                <td>{parseFloat(savedUtilidadIntegral.utilidadIntegralPorAccionBasica).toLocaleString('es-ES')}</td>
              </tr>
              <tr>
                <td>EBITDA</td>
                <td>{parseFloat(savedUtilidadIntegral.ebitda).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => navigate('/tabla-completa')}>Ver Tabla Completa</button> {/* Redirect to the new component */}
        </div>
      )}
    </div>
  );
}

export default MacroImpactSimulator;
