import CerrarBtn from "../img/cerrar.svg"
import {useEffect, useState} from "react"
import Mensaje from "../components/Mensaje"

const Modal = ({setModal, gastoEditar, guardarGasto}) => {


    const [mensaje, setMensaje] = useState("")
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState(0);
    const [categoria, setCategoria] = useState("");
    const [id, setId] = useState("")


    const ocultarModal = () => {
        setModal(false)

    }

    const handleSubmit = e => {
        e.preventDefault()

        if ([nombre, cantidad, categoria].includes("")) {
            setMensaje("Todos los campos son obligatorios")
            return;
        }

        guardarGasto({nombre, cantidad, categoria, id})
    }
    useEffect( () => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
        }
    }, [])

    return (
        <div className={"modal"}>
            <div className={"cerrar-modal"}>
                <img src={CerrarBtn} alt="cerrar modal" onClick={ocultarModal}/>
            </div>
            <h1>A</h1>
            <form
                className={"formulario animar"}
                onSubmit={handleSubmit}
            >
                <legend>{gastoEditar.nombre ? "EDITAR GASTO" : "AÑADIR GASTO"}</legend>
                {mensaje && <Mensaje>{mensaje}</Mensaje>}
                <div className={"campo"}>
                    <label htmlFor="nombre">
                        Nombre gasto
                    </label>
                    <input
                        id={"nombre"}
                        type="text"
                        placeholder={"Añade el nombre del gasto"}
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className={"campo"}>
                    <label htmlFor="nombre">
                        Cantidad
                    </label>
                    <input
                        id={"cantidad"}
                        type="text"
                        placeholder={"Añade una cantidad"}
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className={"campo"}>
                    <label htmlFor="categoria">
                        Categoría
                    </label>
                    <select
                        name="cateoria"
                        id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="casa">Casa</option>
                        <option value="comida">Comida</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input type="submit" value={gastoEditar.nombre ? "EDITAR GASTO" : "AÑADIR GASTO"}/>
            </form>
        </div>
    )
}
export default Modal