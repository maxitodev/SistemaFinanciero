import React, { useEffect, useState } from 'react';
import './RazonesF.css'; 
import { Link, Routes, Route } from 'react-router-dom'; // Importar rutas

function RazonesFinancieras() {
	const [data, setData] = useState(null);
	const [originalData, setOriginalData] = useState(null);
	const [simulationData, setSimulationData] = useState(null); // NUEVO estado para guardar la simulación
	const [showSimulationForm, setShowSimulationForm] = useState(false);
	const [modifiedFields, setModifiedFields] = useState({});
	const [macroVariables, setMacroVariables] = useState({
		tasaInteres: '',
		inflacion: '',
		crecimientoPIB: '',
		tasaDesempleo: '',
		politicaFiscal: ''
	});

	// Load saved table data and store it as originalData on mount
	useEffect(() => {
		const storedData = localStorage.getItem('mergedTable');
		if (storedData) {
			const parsed = JSON.parse(storedData);
			setData(parsed);
			setOriginalData(parsed);
		}
	}, []);

	// Map variable names to user-friendly labels
	const labels = {
		ventasNetas: 'Ventas netas de mercancía',
		interesesGanados: 'Intereses ganados de clientes',
		ingresosArrendados: 'Ingresos de propiedades arrendadas',
		servicios: 'Servicios',
		otrosIngresos: 'Otros ingresos',
		totalIncome: 'Total de ingresos',
		costoVentas: 'Costo de ventas',
		utilidadBruta: 'Utilidad bruta',
		provisionPerdidas: 'Provisión para pérdidas crediticias',
		gastosAdministracion: 'Gastos de administración',
		totalCostosGastos: 'Total de costos y gastos',
		utilidadOperacion: 'Utilidad de operación',
		interesesCargo: 'Intereses a cargo',
		perdidaCambiaria: 'Pérdida cambiaria',
		costosFinancieros: 'Costos financieros',
		utilidadCambiaria: 'Utilidad cambiaria',
		rendimientosInversiones: 'Rendimientos sobre inversiones',
		ingresosFinancieros: 'Ingresos financieros',
		participacionResultados: 'Participación en los resultados de asociadas',
		utilidadAntesImpuestos: 'Utilidad antes de impuestos',
		impuestosUtilidad: 'Impuestos a la utilidad',
		utilidadNetaConsolidada: 'Utilidad neta consolidada',
		valuacionCoberturas: 'Valuación de instrumentos financieros contratados como coberturas de flujo de efectivo',
		efectoConversion: 'Efecto de conversión por inversión en asociadas - Netos de impuestos',
		cambiosValorRazonable: 'Cambios en el valor razonable de las inversiones de capital a valor razonable a través de otros resultados integrales - Netos de impuestos',
		remedicionesPasivo: 'Remediciones del pasivo por beneficios definidos - Netas de impuestos',
		utilidadIntegralConsolidada: 'Utilidad integral consolidada',
		propietariosControladora: 'Propietarios de la controladora',
		participacionNoControladora: 'Participación no controladora',
		utilidadNeta: 'Utilidad neta',
		utilidadPorAccionBasica: 'Utilidad por acción básica',
		resultadoIntegralTotal: 'Resultado integral total',
		utilidadIntegralPorAccionBasica: 'Utilidad integral por acción básica',
		ebitda: 'EBITDA'
	};

	const sectionTitles = {
		ingresos: 'Ingresos de Operación',
		costosGastos: 'Costos y Gastos',
		otrasPartidas: 'Otras Partidas de la Utilidad Integral (Reclasificadas)',
		otrasPartidasNoReclasificadas: 'Otras Partidas de la Utilidad Integral (No Reclasificadas)',
		utilidadNeta: 'Utilidad Neta',
		utilidadIntegral: 'Utilidad Integral'
	};

	function calculateFinancialRatios(data, previousData) {
		if (!data) return {};

		// Extract variables and convert to numbers
		const ventasNetas = parseFloat(data.ingresos?.ventasNetas) || 0;
		const utilidadNeta = parseFloat(data.utilidadNeta?.utilidadNeta) || 0;
		const ebitda = parseFloat(data.utilidadIntegral?.ebitda) || 0;
		const utilidadBruta = parseFloat(data.costosGastos?.utilidadBruta) || 0;
		const utilidadOperacion = parseFloat(data.costosGastos?.utilidadOperacion) || 0;
		const gastosFinancieros = parseFloat(data.costosGastos?.costosFinancieros) || 0;

		const financialRatios = {
			margenUtilidadNeta: ventasNetas ? (utilidadNeta / ventasNetas) * 100 : 0,
			margenEBITDA: ventasNetas ? (ebitda / ventasNetas) * 100 : 0,
			margenBruto: ventasNetas ? (utilidadBruta / ventasNetas) * 100 : 0,
			margenOperacion: ventasNetas ? (utilidadOperacion / ventasNetas) * 100 : 0,
			razonCoberturaIntereses: gastosFinancieros ? utilidadOperacion / gastosFinancieros : 0,
		};

		// Compare with previous ratios to detect changes
		const modifiedRatios = {};
		if (previousData) {
			const previousRatios = calculateFinancialRatios(previousData);
			Object.keys(financialRatios).forEach((key) => {
				if (financialRatios[key] !== previousRatios[key]) {
					modifiedRatios[key] = financialRatios[key] > previousRatios[key] ? 'increased' : 'decreased';
				}
			});
		}

		return { ...financialRatios, modifiedRatios };
	}
	
	// Cambiar la invocación para comparar la data simulada contra la original
	const financialRatios = calculateFinancialRatios(data, originalData);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setMacroVariables((prev) => ({ ...prev, [name]: value }));
	};

	const handleSimularClick = () => {
		setShowSimulationForm(true);
	};

	const handleVerSimulacionClick = () => {
		// Clone the current data
		const simulatedData = JSON.parse(JSON.stringify(data));
		const modified = {};
		// Nueva función para registrar las modificaciones con dirección
		const addModified = (section, field, originalValue, newValue) => {
			if (!modified[section]) modified[section] = {};
			modified[section][field] = newValue > originalValue ? 'increased' : 'decreased';
		};

		// Parse macroeconomic variables
		const tasaInteres = parseFloat(macroVariables.tasaInteres) || 0;
		const inflacion = parseFloat(macroVariables.inflacion) || 0;
		const crecimientoPIB = parseFloat(macroVariables.crecimientoPIB) || 0;
		const tasaDesempleo = parseFloat(macroVariables.tasaDesempleo) || 0;
		const politicaFiscal = parseFloat(macroVariables.politicaFiscal) || 0;

		if (tasaInteres) {
			// Adjust ingresosFinancieros
			if (simulatedData.ingresos && simulatedData.ingresos.ingresosFinancieros) {
				const original = parseFloat(simulatedData.ingresos.ingresosFinancieros) || 0;
				const nuevo = original * (1 + tasaInteres / 100 * 0.05);
				simulatedData.ingresos.ingresosFinancieros = nuevo.toFixed(2);
				addModified('ingresos', 'ingresosFinancieros', original, nuevo);
			}
			// Adjust costosFinancieros
			if (simulatedData.costosGastos && simulatedData.costosGastos.costosFinancieros) {
				const original = parseFloat(simulatedData.costosGastos.costosFinancieros) || 0;
				const nuevo = original * (1 + tasaInteres / 100 * 0.1);
				simulatedData.costosGastos.costosFinancieros = nuevo.toFixed(2);
				addModified('costosGastos', 'costosFinancieros', original, nuevo);
				// Adjust utilidadOperacion
				if (simulatedData.costosGastos.utilidadOperacion) {
					const originalOp = parseFloat(simulatedData.costosGastos.utilidadOperacion) || 0;
					const nuevoOp = originalOp - (nuevo - original);
					simulatedData.costosGastos.utilidadOperacion = nuevoOp.toFixed(2);
					addModified('costosGastos', 'utilidadOperacion', originalOp, nuevoOp);
				}
				// Adjust utilidadNeta
				if (simulatedData.utilidadNeta && simulatedData.utilidadNeta.utilidadNeta) {
					const originalNeta = parseFloat(simulatedData.utilidadNeta.utilidadNeta) || 0;
					const nuevoNeta = originalNeta - (nuevo - original);
					simulatedData.utilidadNeta.utilidadNeta = nuevoNeta.toFixed(2);
					addModified('utilidadNeta', 'utilidadNeta', originalNeta, nuevoNeta);
				}
			}
		}

		if (inflacion) {
			// Adjust ventasNetas
			if (simulatedData.ingresos && simulatedData.ingresos.ventasNetas) {
				const original = parseFloat(simulatedData.ingresos.ventasNetas) || 0;
				const nuevo = original * (1 + inflacion / 100 * 0.05);
				simulatedData.ingresos.ventasNetas = nuevo.toFixed(2);
				addModified('ingresos', 'ventasNetas', original, nuevo);
			}
			// Adjust otrosIngresos
			if (simulatedData.ingresos && simulatedData.ingresos.otrosIngresos) {
				const original = parseFloat(simulatedData.ingresos.otrosIngresos) || 0;
				const nuevo = original * (1 + inflacion / 100 * 0.05);
				simulatedData.ingresos.otrosIngresos = nuevo.toFixed(2);
				addModified('ingresos', 'otrosIngresos', original, nuevo);
			}
			// Adjust costoVentas
			if (simulatedData.costosGastos && simulatedData.costosGastos.costoVentas) {
				const original = parseFloat(simulatedData.costosGastos.costoVentas) || 0;
				const nuevo = original * (1 + inflacion / 100 * 0.07);
				simulatedData.costosGastos.costoVentas = nuevo.toFixed(2);
				addModified('costosGastos', 'costoVentas', original, nuevo);
			}
			// Adjust gastosAdministracion
			if (simulatedData.costosGastos && simulatedData.costosGastos.gastosAdministracion) {
				const original = parseFloat(simulatedData.costosGastos.gastosAdministracion) || 0;
				const nuevo = original * (1 + inflacion / 100 * 0.07);
				simulatedData.costosGastos.gastosAdministracion = nuevo.toFixed(2);
				addModified('costosGastos', 'gastosAdministracion', original, nuevo);
			}
		}

		if (crecimientoPIB || tasaDesempleo) {
			// Adjust ventasNetas
			if (simulatedData.ingresos && simulatedData.ingresos.ventasNetas) {
				const original = parseFloat(simulatedData.ingresos.ventasNetas) || 0;
				const nuevo = original * (1 + crecimientoPIB / 100 * 0.08) * (1 - tasaDesempleo / 100 * 0.05);
				simulatedData.ingresos.ventasNetas = nuevo.toFixed(2);
				addModified('ingresos', 'ventasNetas', original, nuevo);
			}
			// Adjust provisionPerdidas
			if (simulatedData.utilidadNeta && simulatedData.utilidadNeta.provisionPerdidas) {
				const original = parseFloat(simulatedData.utilidadNeta.provisionPerdidas) || 0;
				const nuevo = original * (1 - crecimientoPIB / 200) * (1 + tasaDesempleo / 100 * 0.05);
				simulatedData.utilidadNeta.provisionPerdidas = nuevo.toFixed(2);
				addModified('utilidadNeta', 'provisionPerdidas', original, nuevo);
			}
		}

		if (politicaFiscal) {
			// Adjust impuestosUtilidad y utilidadNeta
			if (simulatedData.utilidadNeta && simulatedData.utilidadNeta.utilidadAntesImpuestos) {
				const utilAntes = parseFloat(simulatedData.utilidadNeta.utilidadAntesImpuestos) || 0;
				// Almacenar valores originales antes de modificar
				const originalImpuestos = simulatedData.utilidadNeta.impuestosUtilidad ? parseFloat(simulatedData.utilidadNeta.impuestosUtilidad) : 0;
				const originalUtilNeta = simulatedData.utilidadNeta.utilidadNeta ? parseFloat(simulatedData.utilidadNeta.utilidadNeta) : 0;
				const nuevosImpuestos = utilAntes * (politicaFiscal / 100);
				simulatedData.utilidadNeta.impuestosUtilidad = nuevosImpuestos.toFixed(2);
				addModified('utilidadNeta', 'impuestosUtilidad', originalImpuestos, nuevosImpuestos);
				const nuevoUtilNeta = utilAntes - nuevosImpuestos;
				simulatedData.utilidadNeta.utilidadNeta = nuevoUtilNeta.toFixed(2);
				addModified('utilidadNeta', 'utilidadNeta', originalUtilNeta, nuevoUtilNeta);
			}
		}

		// En vez de sobreescribir "data", guardamos la simulación
		setSimulationData(simulatedData);
		setModifiedFields(modified);
		setShowSimulationForm(false);
	};

	const handleVolverResultados = () => {
		setSimulationData(null);
		setModifiedFields({});
	};

	// Utility function to format numbers with commas
	const formatNumber = (num) => {
		return new Intl.NumberFormat('es-MX').format(num);
	};

	// Nueva condición para mostrar la vista comparativa
	if (simulationData) {
		const originalRatios = originalData ? calculateFinancialRatios(originalData) : {};
		const simulationRatios = simulationData ? calculateFinancialRatios(simulationData, originalData) : {};

			// Se calculan los valores numéricos de las variables macroeconómicas para determinar aumento o disminución.
	const tasaInteresValue = parseFloat(macroVariables.tasaInteres) || 0;
	const inflacionValue = parseFloat(macroVariables.inflacion) || 0;
	const crecimientoPIBValue = parseFloat(macroVariables.crecimientoPIB) || 0;
	const tasaDesempleoValue = parseFloat(macroVariables.tasaDesempleo) || 0;
	const politicaFiscalValue = parseFloat(macroVariables.politicaFiscal) || 0;
	
	// Nueva variable para la explicación dinámica sin fórmulas, considerando tanto aumentos como disminuciones.
	const macroExplanation = (
		<div className="macro-explanation">
			<h2>Efecto de Variables Macroeconómicas</h2>
			{ tasaInteresValue !== 0 && (
				<div>
					<h3>Tasa de Interés:</h3>
					<p>
						{tasaInteresValue > 0 
							? "El incremento en la tasa de interés se refleja en un leve aumento de los ingresos financieros, pero genera un impacto mayor en los costos financieros. Esto provoca que, en la tabla, los valores correspondientes a estos conceptos se destaquen en rojo, indicando una posible reducción en la utilidad operativa y neta." 
							: "La disminución en la tasa de interés implica que los ingresos financieros crecen ligeramente a la baja y los costos financieros se reducen de manera más considerable. En la tabla notarás que estos rubros se resaltan en verde, evidenciando una mejora en la utilidad tanto operativa como neta."
						}
					</p>
				</div>
			)}
			{ inflacionValue !== 0 && (
				<div>
					<h3>Inflación:</h3>
					<p>
						{inflacionValue > 0 
							? "Un aumento en la inflación hace que los precios de venta y otros ingresos suban, pero también incrementa los costos como el de ventas y gastos administrativos. Esto repercute en una reducción de los márgenes de ganancia, los cuales se marcarán en rojo en la tabla, evidenciando el mayor impacto en los costos."
							: "Una disminución en la inflación favorece una menor elevación de los costos y puede moderar el incremento de los ingresos. En la tabla, esto se refleja con cifras que se muestran en verde, señalando una menor presión en los márgenes operativos."
						}
					</p>
				</div>
			)}
			{ (crecimientoPIBValue !== 0 || tasaDesempleoValue !== 0) && (
				<div>
					<h3>Crecimiento del PIB y Tasa de Desempleo:</h3>
					<p>
						{crecimientoPIBValue !== 0
							? (crecimientoPIBValue > 0 
								? "Un PIB en crecimiento indica que la actividad económica es fuerte, lo cual se traduce en mayores ventas y un mejor desempeño general de la empresa, reflejándose en un aumento de los ingresos en la tabla."
								: "Una caída en el crecimiento del PIB sugiere un entorno económico más débil, reduciendo la demanda y, por tanto, las ventas. Los ingresos se ven afectados negativamente, y esto se notará en la tabla con valores en rojo.")
							: ""
						}
						{tasaDesempleoValue !== 0 &&
							(tasaDesempleoValue > 0
								? " Además, una tasa de desempleo elevada reduce la capacidad de consumo, lo que disminuye los ingresos, y este efecto se marcará en rojo en la comparación de datos."
								: " Por el contrario, una disminución en la tasa de desempleo impulsa la demanda y favorece los ingresos, resaltándose en verde en la tabla.")
						}
					</p>
				</div>
			)}
			{ politicaFiscalValue !== 0 && (
				<div>
					<h3>Política Fiscal:</h3>
					<p>
						{ politicaFiscalValue > 0 
							? "Una política fiscal más estricta genera una mayor carga impositiva, lo que reduce directamente la utilidad neta. Esto se evidencia en la tabla, donde los valores de utilidad neta se muestran en rojo."
							: "Una política fiscal más laxa implica una menor carga impositiva, aumentando la utilidad neta. En la tabla, este efecto se resalta en verde, demostrando una mejora en la rentabilidad final."
						}
					</p>
				</div>
			)}
		</div>
	);
		
		return (
			<div className="razonesfinancieras">
				<div className="button-container">
						<Link to="/">
						  <button className="top-left-button">Menú principal</button>
						</Link>
				</div>
				<div className="container"> {/* Agregado para aplicar el mismo CSS */}
					<div className="simulation-results">
						<h1>Comparación de Estado de Resultados</h1>
						{ (macroVariables.tasaInteres || macroVariables.inflacion || macroVariables.crecimientoPIB || macroVariables.tasaDesempleo || macroVariables.politicaFiscal) && (
							<div className="simulation-macro-vars">
								<h2>Variables Macroeconómicas Utilizadas</h2>
								<ul>
									{macroVariables.tasaInteres && <li>Tasa de Interés: {macroVariables.tasaInteres}%</li>}
									{macroVariables.inflacion && <li>Inflación: {macroVariables.inflacion}%</li>}
									{macroVariables.crecimientoPIB && <li>Crecimiento del PIB: {macroVariables.crecimientoPIB}%</li>}
									{macroVariables.tasaDesempleo && <li>Tasa de Desempleo: {macroVariables.tasaDesempleo}%</li>}
									{macroVariables.politicaFiscal && <li>Política Fiscal: {macroVariables.politicaFiscal}%</li>}
								</ul>
							</div>
						)}
						<div className="financial-tables-container">
							<div>
								<h2>Datos Originales</h2>
								<table className="estado-resultados-table">
									<tbody>
										{Object.entries(originalData).map(([section, values]) => (
											<React.Fragment key={section}>
												<tr>
													<th colSpan="2">{sectionTitles[section] || section}</th>
												</tr>
												{Object.entries(values).map(([key, value]) => (
													<tr key={key}>
														<td>{labels[key] || key}</td>
														<td>{formatNumber(value)}</td>
													</tr>
												))}
											</React.Fragment>
										))}
									</tbody>
								</table>
							</div>
							<div>
								<h2>Datos Simulados</h2>
								<table className="estado-resultados-table">
									<tbody>
										{Object.entries(simulationData).map(([section, values]) => (
											<React.Fragment key={section}>
												<tr>
													<th colSpan="2">{sectionTitles[section] || section}</th>
												</tr>
												{Object.entries(values).map(([key, value]) => (
													<tr key={key}>
														<td>{labels[key] || key}</td>
														<td>
															{modifiedFields[section] && modifiedFields[section][key] ? 
																<u style={{ color: modifiedFields[section][key] === 'increased' ? 'green' : 'red' }}>
																	{formatNumber(value)}
																</u>
															: formatNumber(value)}
														</td>
													</tr>
												))}
											</React.Fragment>
										))}
									</tbody>
								</table>
							</div>
						</div>
						<h2>Razones Financieras</h2>
						<div className="financial-tables-container">
							<div>
								<h3>Originales</h3>
								<table className="razones-financieras-table">
									<thead>
										<tr>
											<th>Razón</th>
											<th>Resultado</th>
											<th>Parámetro de Referencia</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Margen de Utilidad Neta (%)</td>
											<td>{formatNumber(originalRatios.margenUtilidadNeta?.toFixed(2))}</td>
											<td>≥ 15%</td>
										</tr>
										<tr>
											<td>Margen EBITDA (%)</td>
											<td>{formatNumber(originalRatios.margenEBITDA?.toFixed(2))}</td>
											<td>≥ 15%</td>
										</tr>
										<tr>
											<td>Margen Bruto (%)</td>
											<td>{formatNumber(originalRatios.margenBruto?.toFixed(2))}</td>
											<td>≥ 25%</td>
										</tr>
										<tr>
											<td>Margen de Operación (%)</td>
											<td>{formatNumber(originalRatios.margenOperacion?.toFixed(2))}</td>
											<td>≥ 20%</td>
										</tr>
										<tr>
											<td>Razón de Cobertura de Intereses</td>
											<td>{formatNumber(originalRatios.razonCoberturaIntereses?.toFixed(2))}</td>
											<td>{'> 1'}</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div>
								<h3>Simuladas</h3>
								<table className="razones-financieras-table">
									<thead>
										<tr>
											<th>Razón</th>
											<th>Resultado</th>
											<th>Parámetro de Referencia</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Margen de Utilidad Neta (%)</td>
											<td>
												{simulationRatios.modifiedRatios?.margenUtilidadNeta ? (
													<u style={{ color: simulationRatios.modifiedRatios.margenUtilidadNeta === 'increased' ? 'green' : 'red' }}>
														{formatNumber(simulationRatios.margenUtilidadNeta.toFixed(2))}
													</u>
												) : (
													formatNumber(simulationRatios.margenUtilidadNeta.toFixed(2))
												)}
											</td>
											<td>≥ 15%</td>
										</tr>
										<tr>
											<td>Margen EBITDA (%)</td>
											<td>
												{simulationRatios.modifiedRatios?.margenEBITDA ? (
													<u style={{ color: simulationRatios.modifiedRatios.margenEBITDA === 'increased' ? 'green' : 'red' }}>
														{formatNumber(simulationRatios.margenEBITDA.toFixed(2))}
													</u>
												) : (
													formatNumber(simulationRatios.margenEBITDA.toFixed(2))
												)}
											</td>
											<td>≥ 15%</td>
										</tr>
										<tr>
											<td>Margen Bruto (%)</td>
											<td>
												{simulationRatios.modifiedRatios?.margenBruto ? (
													<u style={{ color: simulationRatios.modifiedRatios.margenBruto === 'increased' ? 'green' : 'red' }}>
														{formatNumber(simulationRatios.margenBruto.toFixed(2))}
													</u>
												) : (
													formatNumber(simulationRatios.margenBruto.toFixed(2))
												)}
											</td>
											<td>≥ 25%</td>
										</tr>
										<tr>
											<td>Margen de Operación (%)</td>
											<td>
												{simulationRatios.modifiedRatios?.margenOperacion ? (
													<u style={{ color: simulationRatios.modifiedRatios.margenOperacion === 'increased' ? 'green' : 'red' }}>
														{formatNumber(simulationRatios.margenOperacion.toFixed(2))}
													</u>
												) : (
													formatNumber(simulationRatios.margenOperacion.toFixed(2))
												)}
											</td>
											<td>≥ 20%</td>
										</tr>
										<tr>
											<td>Razón de Cobertura de Intereses</td>
											<td>
												{simulationRatios.modifiedRatios?.razonCoberturaIntereses ? (
													<u style={{ color: simulationRatios.modifiedRatios.razonCoberturaIntereses === 'increased' ? 'green' : 'red' }}>
														{formatNumber(simulationRatios.razonCoberturaIntereses.toFixed(2))}
													</u>
												) : (
													formatNumber(simulationRatios.razonCoberturaIntereses.toFixed(2))
												)}
											</td>
											<td>{'> 1'}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						{/* Se inserta la explicación dinámica */}
						{ macroExplanation }
						<button onClick={handleVolverResultados} className="simular-btn">
							Volver a resultados
						</button>
					</div>
				</div>
			</div>
		);
	}

	if (showSimulationForm) {
		return (
			
			<div className="simulacion-form">
				<div className="button-container">
						<Link to="/">
						  <button className="top-left-button">Menú principal</button>
						</Link>
					  </div>
				<h2>Ingrese Variables Macroeconómicas</h2>
				{/* Explicación de los efectos de cada variable */}
				<p className="macroeconomic-explanation">
					<strong>Explicación de Variables:</strong>
					<ul>
						<li>Tasa de Interés: Incrementa los ingresos financieros y eleva los costos financieros, lo que puede reducir la utilidad.</li>
						<li>Inflación: Aumenta ventas netas y otros ingresos, pero también eleva costos de ventas y gastos administrativos.</li>
						<li>Crecimiento del PIB: Incrementa las ventas netas y reduce la provisión para pérdidas.</li>
						<li>Tasa de Desempleo: Disminuye las ventas netas debido a la menor actividad del mercado.</li>
						<li>Política Fiscal: Ajusta los impuestos y repercute en la utilidad neta final.</li>
					</ul>
				</p>
				<form>
					<label>
						Tasa de Interés (%):
						<input
							type="number"
							name="tasaInteres"
							value={macroVariables.tasaInteres}
							onChange={handleInputChange}
						/>
					</label>
					<label>
						Inflación (%):
						<input
							type="number"
							name="inflacion"
							value={macroVariables.inflacion}
							onChange={handleInputChange}
						/>
					</label>
					<label>
						Crecimiento del PIB (%):
						<input
							type="number"
							name="crecimientoPIB"
							value={macroVariables.crecimientoPIB}
							onChange={handleInputChange}
						/>
					</label>
					<label>
						Tasa de Desempleo (%):
						<input
							type="number"
							name="tasaDesempleo"
							value={macroVariables.tasaDesempleo}
							onChange={handleInputChange}
						/>
					</label>
					<label>
						Política Fiscal (Tasa Impositiva, %):
						<input
							type="number"
							name="politicaFiscal"
							value={macroVariables.politicaFiscal}
							onChange={handleInputChange}
						/>
					</label>
				</form>
				<button onClick={handleVerSimulacionClick} className="ver-simulacion-btn">
					Ver Simulación
				</button>
			</div>
		);
	}

	if (!data) {
		return <p>Cargando datos...</p>;
	}

	return (
		<div className="razonesfinancieras">
			<div className="button-container">
				<Link to="/">
				  <button className="top-left-button">Menú principal</button>
				</Link>
			</div>
			<h1>Estado de Resultados</h1>
			<div className="financial-tables-container"> {/* Added container */}
				<table className="estado-resultados-table">
					<tbody>
						{/* Render saved data dynamically with user-friendly labels */}
						{Object.entries(data).map(([section, values]) => (
							<React.Fragment key={section}>
								<tr>
									<th colSpan="2">{sectionTitles[section] || section}</th>
								</tr>
								{Object.entries(values).map(([key, value]) => (
									<tr key={key}>
										<td>{labels[key] || key}</td>
										<td>
											{modifiedFields[section] && modifiedFields[section][key] ? 
												<u style={{ color: modifiedFields[section][key] === 'increased' ? 'green' : 'red' }}>
													{formatNumber(value)}
												</u>
											: formatNumber(value)}
										</td>
									</tr>
								))}
							</React.Fragment>
						))}
					</tbody>
				</table>

				<div className="razones-financieras-section"> {/* Added wrapper for title */}
					<h2>Razones Financieras</h2> {/* Added title */}
					<table className="razones-financieras-table"> {/* Added class */}
						<thead>
							<tr>
								<th>Razón</th>
								<th>Resultado</th>
								<th>Parámetro de Referencia</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Margen de Utilidad Neta (%)</td>
								<td>
									{financialRatios.modifiedRatios?.margenUtilidadNeta ? (
											<u style={{ color: financialRatios.modifiedRatios.margenUtilidadNeta === 'increased' ? 'green' : 'red' }}>
												{formatNumber(financialRatios.margenUtilidadNeta.toFixed(2))}
											</u>
										) : (
											formatNumber(financialRatios.margenUtilidadNeta.toFixed(2))
										)}
								</td>
								<td>≥ 15%</td>
							</tr>
							<tr>
								<td>Margen EBITDA (%)</td>
								<td>
									{financialRatios.modifiedRatios?.margenEBITDA ? (
											<u style={{ color: financialRatios.modifiedRatios.margenEBITDA === 'increased' ? 'green' : 'red' }}>
												{formatNumber(financialRatios.margenEBITDA.toFixed(2))}
											</u>
										) : (
											formatNumber(financialRatios.margenEBITDA.toFixed(2))
										)}
								</td>
								<td>≥ 15%</td>
							</tr>
							<tr>
								<td>Margen Bruto (%)</td>
								<td>
									{financialRatios.modifiedRatios?.margenBruto ? (
											<u style={{ color: financialRatios.modifiedRatios.margenBruto === 'increased' ? 'green' : 'red' }}>
												{formatNumber(financialRatios.margenBruto.toFixed(2))}
											</u>
										) : (
											formatNumber(financialRatios.margenBruto.toFixed(2))
										)}
								</td>
								<td>≥ 25%</td>
							</tr>
							<tr>
								<td>Margen de Operación (%)</td>
								<td>
									{financialRatios.modifiedRatios?.margenOperacion ? (
											<u style={{ color: financialRatios.modifiedRatios.margenOperacion === 'increased' ? 'green' : 'red' }}>
												{formatNumber(financialRatios.margenOperacion.toFixed(2))}
											</u>
										) : (
											formatNumber(financialRatios.margenOperacion.toFixed(2))
										)}
								</td>
								<td>≥ 20%</td>
							</tr>
							<tr>
								<td>Razón de Cobertura de Intereses</td>
								<td>
									{financialRatios.modifiedRatios?.razonCoberturaIntereses ? (
											<u style={{ color: financialRatios.modifiedRatios.razonCoberturaIntereses === 'increased' ? 'green' : 'red' }}>
												{formatNumber(financialRatios.razonCoberturaIntereses.toFixed(2))}
											</u>
										) : (
											formatNumber(financialRatios.razonCoberturaIntereses.toFixed(2))
										)}
								</td>
								<td>{'> 1'}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<button onClick={handleSimularClick} className="simular-btn">
				Simular
			</button>
		</div>
	);
}

export default RazonesFinancieras;
