import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TablaCompleta.css';
import { Link, Routes, Route } from 'react-router-dom'; // Importar rutas
function TablaCompleta() {
	// Estado inicial con estructura unificada
	const [data, setData] = useState({
		ingresos: { ventasNetas: '', interesesGanados: '', ingresosArrendados: '', servicios: '', otrosIngresos: '', totalIncome: '' },
		costosGastos: { costoVentas: '', utilidadBruta: '', provisionPerdidas: '', gastosAdministracion: '', totalCostosGastos: '', utilidadOperacion: '', interesesCargo: '', perdidaCambiaria: '', costosFinancieros: '', utilidadCambiaria: '', rendimientosInversiones: '', ingresosFinancieros: '', participacionResultados: '', utilidadAntesImpuestos: '', impuestosUtilidad: '', utilidadNetaConsolidada: '' },
		otrasPartidas: { valuacionCoberturas: '', efectoConversion: '' },
		otrasPartidasNoReclasificadas: { cambiosValorRazonable: '', remedicionesPasivo: '', utilidadIntegralConsolidada: '' },
		utilidadNeta: { propietariosControladora: '', participacionNoControladora: '', utilidadNeta: '', utilidadPorAccionBasica: '' },
		utilidadIntegral: { propietariosControladora: '', participacionNoControladora: '', resultadoIntegralTotal: '', utilidadIntegralPorAccionBasica: '', ebitda: '' }
	});

	const navigate = useNavigate();

	// Al montar, se carga desde localStorage o se hace merge de los datos antiguos
	useEffect(() => {
		const storedData = localStorage.getItem('mergedTable');
		if (storedData) {
			setData(JSON.parse(storedData));
		} else {
			setData({
				ingresos: JSON.parse(localStorage.getItem('savedTable')) || {},
				costosGastos: JSON.parse(localStorage.getItem('savedCostosGastos')) || {},
				otrasPartidas: JSON.parse(localStorage.getItem('savedOtrasPartidas1')) || {},
				otrasPartidasNoReclasificadas: JSON.parse(localStorage.getItem('savedOtrasPartidasNoReclasificadas')) || {},
				utilidadNeta: JSON.parse(localStorage.getItem('savedUtilidadNeta')) || {},
				utilidadIntegral: JSON.parse(localStorage.getItem('savedUtilidadIntegral')) || {}
			});
		}
	}, []);

	// Actualiza la variable correspondiente
	const handleChange = (section, key, value) => {
		setData(prev => ({
			...prev,
			[section]: { ...prev[section], [key]: value }
		}));
	};

	// Guarda los datos en localStorage
	const handleSave = () => {
		// Nueva ventana de confirmación
		if (!window.confirm("¿Estás seguro? No podrás editar más tarde.")) {
			return;
		}
		try {
			localStorage.setItem('mergedTable', JSON.stringify(data));
			navigate('/razones-financieras'); // Ensure this matches the route in App.jsx
		} catch (error) {
			console.error('Error saving data:', error);
			alert('Hubo un error al guardar los datos. Por favor, inténtalo de nuevo.');
		}
	};

	return (
		<div className="tabla-completa">
			<div className="button-container">
        <Link to="/">
          <button className="top-left-button">Menú principal</button>
        </Link>
      </div>
			<h1>Estado de Resultados Consolidado</h1>
			<table>
				<tbody>
					{/* Ingresos de Operación */}
					<tr>
						<th colSpan="2">Ingresos de Operación</th>
					</tr>
					<tr>
						<td>Ventas netas de mercancía</td>
						<td>
							<input
								value={data.ingresos.ventasNetas || ''}
								onChange={e => handleChange('ingresos', 'ventasNetas', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Intereses ganados de clientes</td>
						<td>
							<input
								value={data.ingresos.interesesGanados || ''}
								onChange={e => handleChange('ingresos', 'interesesGanados', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Ingresos de propiedades arrendadas</td>
						<td>
							<input
								value={data.ingresos.ingresosArrendados || ''}
								onChange={e => handleChange('ingresos', 'ingresosArrendados', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Servicios</td>
						<td>
							<input
								value={data.ingresos.servicios || ''}
								onChange={e => handleChange('ingresos', 'servicios', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Otros ingresos</td>
						<td>
							<input
								value={data.ingresos.otrosIngresos || ''}
								onChange={e => handleChange('ingresos', 'otrosIngresos', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td><strong>Total de ingresos</strong></td>
						<td>
							<input
								value={data.ingresos.totalIncome || ''}
								onChange={e => handleChange('ingresos', 'totalIncome', e.target.value)}
							/>
						</td>
					</tr>
					{/* Costos y Gastos */}
					<tr>
						<th colSpan="2">Costos y Gastos</th>
					</tr>
					<tr>
						<td>Costo de ventas</td>
						<td>
							<input
								value={data.costosGastos.costoVentas || ''}
								onChange={e => handleChange('costosGastos', 'costoVentas', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Provisión para pérdidas crediticias</td>
						<td>
							<input
								value={data.costosGastos.provisionPerdidas || ''}
								onChange={e => handleChange('costosGastos', 'provisionPerdidas', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Gastos de administración</td>
						<td>
							<input
								value={data.costosGastos.gastosAdministracion || ''}
								onChange={e => handleChange('costosGastos', 'gastosAdministracion', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Total de costos y gastos</td>
						<td>
							<input
								value={data.costosGastos.totalCostosGastos || ''}
								onChange={e => handleChange('costosGastos', 'totalCostosGastos', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Utilidad de operación</td>
						<td>
							<input
								value={data.costosGastos.utilidadOperacion || ''}
								onChange={e => handleChange('costosGastos', 'utilidadOperacion', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Intereses a cargo</td>
						<td>
							<input
								value={data.costosGastos.interesesCargo || ''}
								onChange={e => handleChange('costosGastos', 'interesesCargo', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Pérdida cambiaria</td>
						<td>
							<input
								value={data.costosGastos.perdidaCambiaria || ''}
								onChange={e => handleChange('costosGastos', 'perdidaCambiaria', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Costos financieros</td>
						<td>
							<input
								value={data.costosGastos.costosFinancieros || ''}
								onChange={e => handleChange('costosGastos', 'costosFinancieros', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Utilidad cambiaria</td>
						<td>
							<input
								value={data.costosGastos.utilidadCambiaria || ''}
								onChange={e => handleChange('costosGastos', 'utilidadCambiaria', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Rendimientos sobre inversiones</td>
						<td>
							<input
								value={data.costosGastos.rendimientosInversiones || ''}
								onChange={e => handleChange('costosGastos', 'rendimientosInversiones', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Ingresos financieros</td>
						<td>
							<input
								value={data.costosGastos.ingresosFinancieros || ''}
								onChange={e => handleChange('costosGastos', 'ingresosFinancieros', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Participación en los resultados de asociadas</td>
						<td>
							<input
								value={data.costosGastos.participacionResultados || ''}
								onChange={e => handleChange('costosGastos', 'participacionResultados', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Utilidad antes de impuestos</td>
						<td>
							<input
								value={data.costosGastos.utilidadAntesImpuestos || ''}
								onChange={e => handleChange('costosGastos', 'utilidadAntesImpuestos', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Impuestos a la utilidad</td>
						<td>
							<input
								value={data.costosGastos.impuestosUtilidad || ''}
								onChange={e => handleChange('costosGastos', 'impuestosUtilidad', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td><strong>Utilidad neta consolidada</strong></td>
						<td>
							<input
								value={data.costosGastos.utilidadNetaConsolidada || ''}
								onChange={e => handleChange('costosGastos', 'utilidadNetaConsolidada', e.target.value)}
							/>
						</td>
					</tr>
					{/* Otras Partidas Reclasificadas */}
					<tr>
						<th colSpan="2">Otras Partidas de la Utilidad Integral (Reclasificadas)</th>
					</tr>
					<tr>
						<td>Valuación de instrumentos financieros contratados como coberturas</td>
						<td>
							<input
								value={data.otrasPartidas.valuacionCoberturas || ''}
								onChange={e => handleChange('otrasPartidas', 'valuacionCoberturas', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Efecto de conversión por inversión en asociadas</td>
						<td>
							<input
								value={data.otrasPartidas.efectoConversion || ''}
								onChange={e => handleChange('otrasPartidas', 'efectoConversion', e.target.value)}
							/>
						</td>
					</tr>
					{/* Otras Partidas No Reclasificadas */}
					<tr>
						<th colSpan="2">Otras Partidas de la Utilidad Integral (No Reclasificadas)</th>
					</tr>
					<tr>
						<td>Cambios en el valor razonable</td>
						<td>
							<input
								value={data.otrasPartidasNoReclasificadas.cambiosValorRazonable || ''}
								onChange={e => handleChange('otrasPartidasNoReclasificadas', 'cambiosValorRazonable', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Remediciones del pasivo</td>
						<td>
							<input
								value={data.otrasPartidasNoReclasificadas.remedicionesPasivo || ''}
								onChange={e => handleChange('otrasPartidasNoReclasificadas', 'remedicionesPasivo', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td><strong>Utilidad integral consolidada</strong></td>
						<td>
							<input
								value={data.otrasPartidasNoReclasificadas.utilidadIntegralConsolidada || ''}
								onChange={e => handleChange('otrasPartidasNoReclasificadas', 'utilidadIntegralConsolidada', e.target.value)}
							/>
						</td>
					</tr>
					{/* Utilidad Neta */}
					<tr>
						<th colSpan="2">Utilidad Neta</th>
					</tr>
					<tr>
						<td>Propietarios de la controladora</td>
						<td>
							<input
								value={data.utilidadNeta.propietariosControladora || ''}
								onChange={e => handleChange('utilidadNeta', 'propietariosControladora', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Participación no controladora</td>
						<td>
							<input
								value={data.utilidadNeta.participacionNoControladora || ''}
								onChange={e => handleChange('utilidadNeta', 'participacionNoControladora', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Utilidad Neta</td>
						<td>
							<input
								value={data.utilidadNeta.utilidadNeta || ''}
								onChange={e => handleChange('utilidadNeta', 'utilidadNeta', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Utilidad por acción básica</td>
						<td>
							<input
								value={data.utilidadNeta.utilidadPorAccionBasica || ''}
								onChange={e => handleChange('utilidadNeta', 'utilidadPorAccionBasica', e.target.value)}
							/>
						</td>
					</tr>
					{/* Utilidad Integral */}
					<tr>
						<th colSpan="2">Utilidad Integral</th>
					</tr>
					<tr>
						<td>Propietarios de la controladora</td>
						<td>
							<input
								value={data.utilidadIntegral.propietariosControladora || ''}
								onChange={e => handleChange('utilidadIntegral', 'propietariosControladora', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Participación no controladora</td>
						<td>
							<input
								value={data.utilidadIntegral.participacionNoControladora || ''}
								onChange={e => handleChange('utilidadIntegral', 'participacionNoControladora', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Resultado integral total</td>
						<td>
							<input
								value={data.utilidadIntegral.resultadoIntegralTotal || ''}
								onChange={e => handleChange('utilidadIntegral', 'resultadoIntegralTotal', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Utilidad bruta</td>
						<td>
							<input
								value={data.costosGastos.utilidadBruta || ''}
								onChange={e => handleChange('costosGastos', 'utilidadBruta', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Utilidad integral por acción básica</td>
						<td>
							<input
								value={data.utilidadIntegral.utilidadIntegralPorAccionBasica || ''}
								onChange={e => handleChange('utilidadIntegral', 'utilidadIntegralPorAccionBasica', e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>EBITDA</td>
						<td>
							<input
								value={data.utilidadIntegral.ebitda || ''}
								onChange={e => handleChange('utilidadIntegral', 'ebitda', e.target.value)}
							/>
						</td>
					</tr>
				</tbody>
			</table>
			<button onClick={handleSave}>Guardar y ver</button>
		</div>
	);
}

export default TablaCompleta;
