import React, { useEffect, useState } from 'react';

function TablaCompleta() {
  const [data, setData] = useState({
    ingresos: null,
    costosGastos: null,
    otrasPartidas: null,
    otrasPartidasNoReclasificadas: null,
    utilidadNeta: null,
    utilidadIntegral: null,
  });

  useEffect(() => {
    setData({
      ingresos: JSON.parse(localStorage.getItem('savedTable')),
      costosGastos: JSON.parse(localStorage.getItem('savedCostosGastos')),
      otrasPartidas: JSON.parse(localStorage.getItem('savedOtrasPartidas1')),
      otrasPartidasNoReclasificadas: JSON.parse(localStorage.getItem('savedOtrasPartidasNoReclasificadas')),
      utilidadNeta: JSON.parse(localStorage.getItem('savedUtilidadNeta')),
      utilidadIntegral: JSON.parse(localStorage.getItem('savedUtilidadIntegral')),
    });
  }, []);

  const formatCurrency = (value) => {
    if (isNaN(value)) return value;
    return parseFloat(value).toLocaleString('es-ES', { style: 'currency', currency: 'MEX' });
  };

  return (
    <div className="tabla-completa">
      <h1>Tabla Completa de Estado de Resultados</h1>

      {data.ingresos && (
        <div className="section ingresos">
          <h2>Ingresos de Operación</h2>
          <table>
            <tbody>
              <tr><td>Ventas netas de mercancía</td><td>{formatCurrency(data.ingresos.ventasNetas)}</td></tr>
              <tr><td>Intereses ganados de clientes</td><td>{formatCurrency(data.ingresos.interesesGanados)}</td></tr>
              <tr><td>Ingresos de propiedades arrendadas</td><td>{formatCurrency(data.ingresos.ingresosArrendados)}</td></tr>
              <tr><td>Servicios</td><td>{formatCurrency(data.ingresos.servicios)}</td></tr>
              <tr><td>Otros ingresos</td><td>{formatCurrency(data.ingresos.otrosIngresos)}</td></tr>
              <tr><td><strong>Total de ingresos</strong></td><td><strong>{formatCurrency(data.ingresos.totalIncome)}</strong></td></tr>
            </tbody>
          </table>
        </div>
      )}

      {data.costosGastos && (
        <div className="section costos-gastos">
          <h2>Costos y Gastos</h2>
          <table>
            <tbody>
              <tr><td>Costo de ventas</td><td>{formatCurrency(data.costosGastos.costoVentas)}</td></tr>
              <tr><td>Utilidad bruta</td><td>{formatCurrency(data.costosGastos.utilidadBruta)}</td></tr>
              <tr><td>Provisión para pérdidas crediticias</td><td>{formatCurrency(data.costosGastos.provisionPerdidas)}</td></tr>
              <tr><td>Gastos de administración</td><td>{formatCurrency(data.costosGastos.gastosAdministracion)}</td></tr>
              <tr><td>Total de costos y gastos</td><td>{formatCurrency(data.costosGastos.totalCostosGastos)}</td></tr>
              <tr><td>Utilidad de operación</td><td>{formatCurrency(data.costosGastos.utilidadOperacion)}</td></tr>
              <tr><td>Intereses a cargo</td><td>{formatCurrency(data.costosGastos.interesesCargo)}</td></tr>
              <tr><td>Pérdida cambiaria</td><td>{formatCurrency(data.costosGastos.perdidaCambiaria)}</td></tr>
              <tr><td>Costos financieros</td><td>{formatCurrency(data.costosGastos.costosFinancieros)}</td></tr>
              <tr><td>Utilidad cambiaria</td><td>{formatCurrency(data.costosGastos.utilidadCambiaria)}</td></tr>
              <tr><td>Rendimientos sobre inversiones</td><td>{formatCurrency(data.costosGastos.rendimientosInversiones)}</td></tr>
              <tr><td>Ingresos financieros</td><td>{formatCurrency(data.costosGastos.ingresosFinancieros)}</td></tr>
              <tr><td>Participación en los resultados de asociadas</td><td>{formatCurrency(data.costosGastos.participacionResultados)}</td></tr>
              <tr><td>Utilidad antes de impuestos</td><td>{formatCurrency(data.costosGastos.utilidadAntesImpuestos)}</td></tr>
              <tr><td>Impuestos a la utilidad</td><td>{formatCurrency(data.costosGastos.impuestosUtilidad)}</td></tr>
              <tr><td><strong>Utilidad neta consolidada</strong></td><td><strong>{formatCurrency(data.costosGastos.utilidadNetaConsolidada)}</strong></td></tr>
            </tbody>
          </table>
        </div>
      )}

      {data.otrasPartidas && (
        <div className="section otras-partidas">
          <h2>Otras Partidas de la Utilidad Integral (Reclasificadas)</h2>
          <table>
            <tbody>
              <tr>
                <td>Valuación de instrumentos financieros contratados como coberturas</td>
                <td>{formatCurrency(data.otrasPartidas.valuacionCoberturas)}</td>
              </tr>
              <tr>
                <td>Efecto de conversión por inversión en asociadas</td>
                <td>{formatCurrency(data.otrasPartidas.efectoConversion)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {data.otrasPartidasNoReclasificadas && (
        <div className="section otras-partidas-no-reclasificadas">
          <h2>Otras Partidas de la Utilidad Integral (No Reclasificadas)</h2>
          <table>
            <tbody>
              <tr>
                <td>Cambios en el valor razonable</td>
                <td>{formatCurrency(data.otrasPartidasNoReclasificadas.cambiosValorRazonable)}</td>
              </tr>
              <tr>
                <td>Remediciones del pasivo</td>
                <td>{formatCurrency(data.otrasPartidasNoReclasificadas.remedicionesPasivo)}</td>
              </tr>
              <tr>
                <td><strong>Utilidad integral consolidada</strong></td>
                <td><strong>{formatCurrency(data.otrasPartidasNoReclasificadas.utilidadIntegralConsolidada)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {data.utilidadNeta && (
        <div className="section utilidad-neta">
          <h2>Utilidad Neta</h2>
          <table>
            <tbody>
              <tr><td>Propietarios de la controladora</td><td>{formatCurrency(data.utilidadNeta.propietariosControladora)}</td></tr>
              <tr><td>Participación no controladora</td><td>{formatCurrency(data.utilidadNeta.participacionNoControladora)}</td></tr>
              <tr><td>Utilidad Neta</td><td>{formatCurrency(data.utilidadNeta.utilidadNeta)}</td></tr>
              <tr><td>Utilidad por acción básica</td><td>{data.utilidadNeta.utilidadPorAccionBasica}</td></tr>
            </tbody>
          </table>
        </div>
      )}

      {data.utilidadIntegral && (
        <div className="section utilidad-integral">
          <h2>Utilidad Integral</h2>
          <table>
            <tbody>
              <tr><td>Propietarios de la controladora</td><td>{formatCurrency(data.utilidadIntegral.propietariosControladora)}</td></tr>
              <tr><td>Participación no controladora</td><td>{formatCurrency(data.utilidadIntegral.participacionNoControladora)}</td></tr>
              <tr><td>Resultado integral total</td><td>{formatCurrency(data.utilidadIntegral.resultadoIntegralTotal)}</td></tr>
              <tr><td>Utilidad integral por acción básica</td><td>{data.utilidadIntegral.utilidadIntegralPorAccionBasica}</td></tr>
              <tr><td>EBITDA</td><td>{formatCurrency(data.utilidadIntegral.ebitda)}</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TablaCompleta;
