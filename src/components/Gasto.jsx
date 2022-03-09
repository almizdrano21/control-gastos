import IconoAhorro from "../img/icono_ahorro.svg"
import IconoCasa from "../img/icono_casa.svg"
import IconoComida from "../img/icono_comida.svg"
import IconoGastos from "../img/icono_gastos.svg"
import IconoOcio from "../img/icono_ocio.svg"
import IconoSalud from "../img/icono_salud.svg"
import IconoSuscripciones from "../img/icono_suscripciones.svg"

import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from "react-swipeable-list"

import "react-swipeable-list/dist/styles.css"

const diccionarioIconos = {
    ahorro : IconoAhorro,
    casa : IconoCasa,
    comida : IconoComida,
    gastos : IconoGastos,
    ocio : IconoOcio,
    salud : IconoSalud,
    suscripciones : IconoSuscripciones
}

const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => { setGastoEditar(gasto) }}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => { eliminarGasto(gasto.id) }}>
                Borrar
            </SwipeAction>
        </TrailingActions>
    )
    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className={"gasto sombra"}>
                    <div className={"contenido-gasto"}>
                        <img
                            src={diccionarioIconos[gasto.categoria]}
                            alt="Icono gasto"/>
                        <div className={"descripcion-gasto"}>
                            <p className={"categoria"}>
                                {gasto.categoria}
                            </p>
                            <p className={"nombre-gasto"}>
                                {gasto.nombre}
                            </p>
                        </div>
                    </div>
                    <p className={"cantidad-gasto"}>
                        {gasto.cantidad} €
                    </p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Gasto

