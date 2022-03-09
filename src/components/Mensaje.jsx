import React from "react";

const Mensaje = ({children, tipo}) => {
    return (
        <div className={"alerta error"}>
            {children}
        </div>
    )
}

export default Mensaje