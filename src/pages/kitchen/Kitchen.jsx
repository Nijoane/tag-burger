// import { useState } from "react";
// import { GET_ORDER } from "../../components/api";

const Kitchen = () => {
    // const [request, setRequest] = useState([])
    // const [status, setStatus] = useState('')
    const showClient = localStorage.getItem('client');
    const showTable = localStorage.getItem('table');
    const showOrder = localStorage.getItem('order');
    const showObservation = localStorage.getItem('observation');
    
    
//  const getOrder = async (date) => {
//     const {url, options} = GET_ORDER({
//         client: showClient,
//         table: showTable,
//         order: showOrder,
//         observation: showObservation,
//         status: status
//     })

//     const response = await fetch(url, options)
//     const json = await response.json()
//     setRequest(json)
// } 



    //acessar a api e pegar todos os pedidos com status pedding
    //setar os pedidos pelo setrequest
    //reques.map
    //button pedidos prontos onclic update status done
    //useeffect

    return (
        <div>
            <h1>
                Pagina de Pedidos
            </h1>
            <div> 
                <p>Client: {showClient}</p>
                <p>Mesa: {showTable}</p>
                <p>Pedido: {showOrder}</p>
                <p>Observações: {showObservation}</p>
            </div>
        </div>
    )
}

export default Kitchen;

