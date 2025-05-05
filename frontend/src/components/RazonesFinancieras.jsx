import React, { useEffect, useState } from 'react';

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
	
		const ventasNetas = data.ingresos?.ventasNetas || 0;
		const utilidadNeta = data.utilidadNeta?.utilidadNeta || 0;
		const ebitda = data.utilidadIntegral?.ebitda || 0;
		const activoTotal = data.balance?.activoTotal || 0;
		const capitalContable = data.balance?.capitalContable || 0;
	
		return {
			margenUtilidadNeta: (utilidadNeta / ventasNetas) * 100 || 0,
			margenEBITDA: (ebitda / ventasNetas) * 100 || 0,
			rendimientoActivo: (utilidadNeta / activoTotal) * 100 || 0,
			produccionActivos: (ventasNetas / activoTotal) * 100 || 0,
			rendimientoCapital: (utilidadNeta / capitalContable) * 100 || 0,
		};
	}
	
	const financialRatios = calculateFinancialRatios(data);

	if (!data) {
		return <p>Cargando datos...</p>;
	}

	return (
		<div>
			<h1>Estado de Resultados</h1>
			<table>
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

			<h2>Razones Financieras</h2>
			<table>
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
						<td>Rendimiento del Activo (ROA) (%)</td>
						<td>{financialRatios.rendimientoActivo.toFixed(2)}</td>
						<td>≥ 15%</td>
					</tr>
					<tr>
						<td>Producción de los Activos (%)</td>
						<td>{financialRatios.produccionActivos.toFixed(2)}</td>
						<td>≥ 20%</td>
					</tr>
					<tr>
						<td>Rendimiento del Capital (ROE) (%)</td>
						<td>{financialRatios.rendimientoCapital.toFixed(2)}</td>
						<td>≥ 15%</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default RazonesFinancieras;
