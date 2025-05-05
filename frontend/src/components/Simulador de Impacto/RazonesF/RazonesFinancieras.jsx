import React, { useEffect, useState } from 'react';
import './RazonesF.css'; 

function RazonesFinancieras() {
	const [data, setData] = useState(null);

	// Load saved table data from localStorage on component mount
	useEffect(() => {
		const storedData = localStorage.getItem('mergedTable');
		if (storedData) {
			setData(JSON.parse(storedData));
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

	function calculateFinancialRatios(data) {
		if (!data) return {};

			// Extraer las variables desde las secciones correctas y convertir a números
			const ventasNetas = parseFloat(data.ingresos?.ventasNetas) || 0;
			const utilidadNeta = parseFloat(data.utilidadNeta?.utilidadNeta) || 0;
			const ebitda = parseFloat(data.utilidadIntegral?.ebitda) || 0;
			// Tomar desde "Costos y Gastos"
			const utilidadBruta = parseFloat(data.costosGastos?.utilidadBruta) || 0;
			const utilidadOperacion = parseFloat(data.costosGastos?.utilidadOperacion) || 0;
			const gastosFinancieros = parseFloat(data.costosGastos?.costosFinancieros) || 0;
		
			return {
				margenUtilidadNeta: ventasNetas ? (utilidadNeta / ventasNetas) * 100 : 0,
				margenEBITDA: ventasNetas ? (ebitda / ventasNetas) * 100 : 0,
				margenBruto: ventasNetas ? (utilidadBruta / ventasNetas) * 100 : 0,
				margenOperacion: ventasNetas ? (utilidadOperacion / ventasNetas) * 100 : 0,
				razonCoberturaIntereses: gastosFinancieros ? utilidadOperacion / gastosFinancieros : 0,
			};
	}
	
	const financialRatios = calculateFinancialRatios(data);

	if (!data) {
		return <p>Cargando datos...</p>;
	}

	return (
		<div className="razonesfinancieras">
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
										<td>{value}</td>
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
								<td>{financialRatios.margenUtilidadNeta.toFixed(2)}</td>
								<td>≥ 15%</td>
							</tr>
							<tr>
								<td>Margen EBITDA (%)</td>
								<td>{financialRatios.margenEBITDA.toFixed(2)}</td>
								<td>≥ 15%</td>
							</tr>
							<tr>
								<td>Margen Bruto (%)</td>
								<td>{financialRatios.margenBruto.toFixed(2)}</td>
								<td>≥ 25%</td>
							</tr>
							<tr>
								<td>Margen de Operación (%)</td>
								<td>{financialRatios.margenOperacion.toFixed(2)}</td>
								<td>≥ 20%</td>
							</tr>
							<tr>
								<td>Razón de Cobertura de Intereses</td>
								<td>{financialRatios.razonCoberturaIntereses.toFixed(2)}</td>
								<td>{'> 1'}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default RazonesFinancieras;
