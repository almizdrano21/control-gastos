import { useState, useEffect} from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({presupuesto, gastos}) => {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado;

        const nuevoPorcentaje = ( ( (presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2)

        setPorcentaje(nuevoPorcentaje)

        setDisponible(totalDisponible)
        setGastado(totalGastado)
    }, [gastos])


    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-EU', {
            style: "currency",
            currency: "EUR"
        })
    }

    return (
        <div className={"contenedor-presupuesto contenedor sombra dos-columnas"}>
            <div>
                <CircularProgressbar
                    value={porcentaje}
                    styles={buildStyles({
                        pathColor: "#3b82f6",
                        trailColor: "#f5f5f5",
                        textColor: "#3b82f6"
                    })}
                    text={porcentaje+"% Gastado"}
                />
            </div>
                <div className={"contenido-presupuesto"}>
                    <p>
                        <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                    </p>
                    <p>
                        <span>Disponible: </span> {formatearCantidad(presupuesto-gastado)}
                    </p>
                    <p>
                        <span>Gastado: </span> {formatearCantidad(gastado)}
                    </p>
                </div>
        </div>
    )
}

export default ControlPresupuesto