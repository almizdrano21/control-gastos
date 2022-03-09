import { useEffect, useState} from 'react'
import './App.css'
import {generarId} from "./helpers";
import Header from './components/Header'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from "./components/Modal.jsx"
import ListadoGastos from   "./components/ListadoGastos"
import Filtros from "./components/Filtros"

function App() {

    const [presupuesto, setPresupuesto] = useState("")

    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

    const [modal, setModal] = useState(false)

    const [gastos, setGastos] = useState([])

    const [gastoEditar, setGastoEditar] = useState({})

    const [filtro, setFiltro] = useState("")

    const [gastosFiltrados, setGastosFiltrados] = useState([])

    const handleNuevoGasto = () => {
        setModal(true)
        setGastoEditar({})
    }

    const guardarGasto = gasto => {
        if (gasto.id) {
            const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
            setGastos(gastosActualizados)
        } else {
            gasto.id = generarId();
            setGastos([...gastos, gasto])
            setModal(false)
        }
    }
    const eliminarGasto = id => {
        const gastosActualizados = gastos.filter( gasto => gasto.id !== id)

        setGastos(gastosActualizados)
    }

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0 ) {
            setModal(true)
        }
    }, [gastoEditar])

    useEffect( () => {
        localStorage.setItem("presupuesto", presupuesto ?? 0)
    }, [presupuesto])

    useEffect(() => {
       if (filtro) {
           const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
           setGastosFiltrados(gastosFiltrados)
       }
    }, [filtro])

    return (
      <div>
          <Header
            gastos={gastos}
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            isValidPresupuesto={isValidPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
          {isValidPresupuesto && (
              <>
              <main>
                  <Filtros
                      filtro={filtro}
                      setFiltro={setFiltro}
                  />
                  <ListadoGastos
                    gastos={gastos}
                    setGastoEditar={setGastoEditar}
                    eliminarGasto={eliminarGasto}
                    filtro={filtro}
                    gastosFiltrados={gastosFiltrados}
                  />
              </main>
              <div className={"nuevo-gasto"}>
                  <img src={IconoNuevoGasto} alt="icono nuevo gasto" onClick={handleNuevoGasto}/>
              </div>
              </>
          )}
          {modal && <Modal
            gastoEditar={gastoEditar}
            setModal={setModal}
            guardarGasto={guardarGasto}
          />}
      </div>
    )
}

export default App
