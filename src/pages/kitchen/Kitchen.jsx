import { useEffect, useState } from 'react';

const Kitchen = () => {
    const [pending, setPending] = useState([]);
    const [doing, setDoing] = useState([]);

    const observation = localStorage.getItem('observation')
    const token = localStorage.getItem('token');
    const getAllOrders = async (token) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `${token}`
            },
        };

        fetch('https://lab-api-bq.herokuapp.com/orders', options)
            .then(response => response.json())
            .then(result => {
                if (result) {
                    const allOrders = result;
                    setPending(allOrders.filter((item) =>
                        item.status.includes('pending')
                    ));
                    setDoing(allOrders.filter((item) =>
                        item.status.includes('doing')
                    ));
                }
            })
    }
    useEffect(() => {
        getAllOrders(token);
    }, [token]);

    setTimeout(() => { getAllOrders(token) }, 30000);

    const handleChange = (id, status, index) => {
        let statusOrder = '';
        let key = `/${id}`

        if (status === 'pending') {
            statusOrder = { 'status': 'doing' }
        }
        if (status === 'doing') {
            statusOrder = { 'status': 'done' }
        }

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(statusOrder),
        };

        fetch(`https://lab-api-bq.herokuapp.com/orders/${key}`, options)
            .then(response => response.json())
            .then((result) => {
                if (status === 'pending' && result.id === pending[index].id) {
                    pending.splice(index, 1)
                    setPending([...pending])
                    setDoing([...doing, result])
                }
                if (status === 'doing' && result.id === doing[index].id) {
                    doing.splice(index, 1)
                    setDoing([...doing])
                }
            })
    }

    return (
        <div>
            <h1>
                TAG Burger
            </h1>
            <section>
                <h2>Pedidos pendentes</h2>
                <div>
                    {pending
                        .map(({ id, client_name, table, status, createdAt, Products }, index) => (
                            <div key={Math.random()}> 
                                <div key={Math.random()}>
                                    <p>Pedido n°: {id}</p>
                                    <p>Clinte: {client_name}</p>
                                    <p>Table: {table}</p>
                                    <div> {Products && Products.map((product) => {
                                        const { name, flavor, complement } = product;
                                        const templateOrder = `
                                            ${name} 
                                            ${flavor || ""} 
                                            ${complement || ""}`
                                        return <p key={Math.random()}>{templateOrder}</p>
                                    })}
                                    </div>
                                    <p>Observação: {observation}</p>
                                    <p>Status do pedido: {status}</p>
                                    <p>Pedido realizdo em: {createdAt}</p>
                                </div>
                                <button
                                    onClick={() => handleChange(id, status, index)}
                                >Iniciar Pedido</button>
                            </div>
                        ))
                    }
                </div>
            </section>
            <section>
                {doing !== [] &&
                    <>
                        <h2>Pedidos em preparo</h2>
                        <div>
                            {doing
                                .map(({ id, client_name, table, status, createdAt, updatedAt, Products }, index) => (
                                    <div key={Math.random()}>
                                        <div key={Math.random()}>
                                            <p>Pedido n°: {id}</p>
                                            <p>Clinte: {client_name}</p>
                                            <p>Table: {table}</p>
                                            <div> 
                                                {Products && Products.map((product) => {
                                                    const { name, flavor, complement } = product;
                                                    const templateOrder = `
                                                        ${name} 
                                                        ${flavor || ""} 
                                                        ${complement || ""}`
                                                    return <p key={Math.random()}>{templateOrder}</p>
                                                })}
                                            </div>
                                            <p>Observação: {observation}</p>
                                            <p>Status do pedido: {status}</p>
                                            <p>Pedido realizdo em: {createdAt}</p>
                                            <p>Pedido atualizado em: {updatedAt}</p>
                                        </div>
                                        <button
                                            onClick={() => handleChange(id, status, index)}
                                        >Finalizar Pedido</button>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                }
            </section>
        </div>
    )
}
export default Kitchen;