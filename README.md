# 📊 MacroView

**Tu herramienta para cálculos macroeconómicos**

MacroView es una plataforma web diseñada para ayudar a estudiantes y profesionales de economía a calcular y analizar indicadores macroeconómicos clave como el PIB, tasas de interés, modelo IS-LM, inflación, y más.

## 🌟 Características Principales

### 🔧 Simulador de Impacto Macro-Financiero
- **Análisis de Variables Macroeconómicas**: Evalúa cómo las variables como tasa de interés, inflación, crecimiento del PIB, tasa de desempleo y política fiscal afectan las razones financieras de una empresa
- **Estados de Resultados Interactivos**: Crea y edita estados de resultados completos
- **Comparación en Tiempo Real**: Visualiza el impacto de cambios macroeconómicos con comparaciones lado a lado
- **Cálculo Automático de Ratios**: Margen EBITDA, Margen Bruto, Margen de Operación, Razón de Cobertura de Intereses
- **Indicadores Visuales**: Resaltado en verde/rojo para mostrar aumentos/disminuciones en los valores

### 📈 Calculadora IS-LM
- **Modelo IS-LM Completo**: Explora el equilibrio macroeconómico mediante el modelo IS-LM
- **Análisis de Demanda Agregada**: Herramientas para calcular y visualizar la demanda agregada
- **Calculadoras Especializadas**: Módulos separados para cálculos IS y LM

## 🛠️ Tecnologías

- **Frontend**: React 19.0.0 con Vite
- **Routing**: React Router DOM 7.5.3
- **Visualización**: Chart.js 4.4.9 con React-ChartJS-2
- **Estilos**: CSS moderno con animaciones y diseño responsivo
- **Lenguajes**: JavaScript (72.2%), CSS (27.5%), HTML (0.3%)

## 🚀 Instalación y Configuración

### Prerequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/maxitodev/SistemaFinanciero.git
   cd SistemaFinanciero
   ```

2. **Navega al directorio frontend**
   ```bash
   cd frontend
   ```

3. **Instala las dependencias**
   ```bash
   npm install
   ```

4. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador**
   - La aplicación estará disponible en `http://localhost:5173`

## 📱 Uso

### Simulador de Impacto Macro-Financiero

1. **Acceder al Simulador**
   - Desde la página principal, haz clic en "Simulador de Impacto Macro-Financiero"

2. **Crear Estado de Resultados**
   - Haz clic en "Crear Estado de Resultados"
   - Completa la tabla con los datos financieros de tu empresa

3. **Simular Variables Macroeconómicas**
   - Ingresa valores para las variables macroeconómicas:
     - **Tasa de Interés**: Afecta ingresos y costos financieros
     - **Inflación**: Impacta ventas y costos operativos
     - **Crecimiento del PIB**: Influye en las ventas netas
     - **Tasa de Desempleo**: Reduce la actividad del mercado
     - **Política Fiscal**: Ajusta la carga impositiva

4. **Análisis de Resultados**
   - Compara los datos originales vs simulados
   - Revisa los ratios financieros calculados automáticamente
   - Analiza las explicaciones detalladas del impacto de cada variable

### Calculadora IS-LM

1. **Acceder a las Herramientas**
   - Desde la página principal, selecciona "Cálculo de IS-LM"

2. **Elegir Tipo de Análisis**
   - **Demanda Agregada (DA)**: Para análisis de demanda agregada
   - **Modelo IS**: Para cálculos de la curva IS
   - **Modelo LM**: Para cálculos de la curva LM

## 📊 Ejemplos de Uso

### Caso de Estudio: Impacto de Inflación
```
Variables Macroeconómicas:
- Inflación: +3%
- Tasa de Interés: +1.5%

Resultados Esperados:
- ↗️ Aumento en ventas netas (efecto inflacionario)
- ↗️ Incremento en costos operativos
- ↗️ Mayor carga de intereses
- ↘️ Posible reducción en margen neto
```

## 🎯 Casos de Uso Ideales

- **Estudiantes de Economía**: Aprender conceptos macroeconómicos de forma práctica
- **Analistas Financieros**: Evaluar el impacto macroeconómico en empresas
- **Profesores**: Herramienta didáctica para explicar conceptos económicos
- **Consultores**: Realizar análisis de sensibilidad macroeconómica

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Compilación para producción
npm run build

# Linting del código
npm run lint

# Vista previa de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
SistemaFinanciero/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Simulador de Impacto/
│   │   │   │   ├── RazonesF/
│   │   │   │   └── ...
│   │   │   └── ...
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
└── README.md
```

## 👥 Equipo de Desarrollo

**MacroView** fue desarrollado por:
- **Max S** ([@maxitodev](https://github.com/maxitodev))
- **Álvaro R**
- **Irlanda L**
- **Alan L**

---
