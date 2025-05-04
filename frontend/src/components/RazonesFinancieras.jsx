import React, { useEffect, useState } from 'react';

function RazonesFinancieras() {
	const [data, setData] = useState(null);
	const [ratios, setRatios] = useState({});

	useEffect(() => {
		// Load data from localStorage
		const storedData = JSON.parse(localStorage.getItem('mergedTable'));
		if (storedData) {
			setData(storedData);

			// Calculate financial ratios
			const ventasNetas = parseFloat(storedData.ingresos.ventasNetas) || 0;
			const utilidadNeta = parseFloat(storedData.utilidadNeta.utilidadNeta) || 0;
			const ebitda = parseFloat(storedData.utilidadIntegral.ebitda) || 0;
			const activoTotal = parseFloat(localStorage.getItem('activoTotal')) || 0; // Assuming activoTotal is stored in localStorage
			const capitalContable = parseFloat(localStorage.getItem('capitalContable')) || 0; // Assuming capitalContable is stored in localStorage

			setRatios({
				margenUtilidadNeta: (utilidadNeta / ventasNetas) * 100 || 0,
				margenEBITDA: (ebitda / ventasNetas) * 100 || 0,
				rendimientoActivo: (utilidadNeta / activoTotal) * 100 || 0,
				produccionActivos: (ventasNetas / activoTotal) * 100 || 0,
				rendimientoCapital: (utilidadNeta / capitalContable) * 100 || 0,
			});
		}
	}, []);

	return (
			<div className="razones-financieras">
			<h1>Razones Financieras</h1>
			{/* Display the table from localStorage */}
			{data ? (
				<div>
					<h2>Tabla Consolidada</h2>
					<table border="1">
						<tbody>
							{Object.entries(data).map(([section, values]) => (
								<React.Fragment key={section}>
									<tr>
										<th colSpan="2">{section}</th>
									</tr>
									{Object.entries(values).map(([key, value]) => (
										<tr key={key}>
											<td>{key}</td>
											<td>{value}</td>
										</tr>
									))}
								</React.Fragment>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<p>Cargando datos...</p>
			)}

			{/* Display financial ratios */}
			<h2>Razones Financieras</h2>
			<table border="1">
				<tbody>
					<tr>
						<td>19. Margen de Utilidad Neta (%)</td>
						<td>{ratios.margenUtilidadNeta.toFixed(2)}</td>
					</tr>
					<tr>
						<td>20. Margen EBITDA (%)</td>
						<td>{ratios.margenEBITDA.toFixed(2)}</td>
					</tr>
					<tr>
						<td>21. Rendimiento del Activo (ROA) (%)</td>
						<td>{ratios.rendimientoActivo.toFixed(2)}</td>
					</tr>
					<tr>
						<td>22. Producción de los Activos (%)</td>
						<td>{ratios.produccionActivos.toFixed(2)}</td>
					</tr>
					<tr>
						<td>23. Rendimiento del Capital (ROE) (%)</td>
						<td>{ratios.rendimientoCapital.toFixed(2)}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default RazonesFinancieras;