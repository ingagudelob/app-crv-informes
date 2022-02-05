import { Link } from "react-router-dom"

const ListItemEmisoras = ({name, url}) => {

  const getId = () => url.split("/")[6];

    return (
        <>
            <p>{name}</p>
                <button> 
                    <Link
                        style={{textDecoration: "none", color: "black"}} 
                        to={`/listarInformes/${getId()}`}>Ver detalles</Link>
                </button>
        </>
    )
}

export default ListItemEmisoras
