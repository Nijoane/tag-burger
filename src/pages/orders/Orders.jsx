import { useEffect, useState } from 'react';

const Orders = () => {
    const [done, setDone] = useState([]);
    const [delivered, setDelivered] = useState([]);

    const observation = localStorage.getItem('observation');
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
                    setDone(allOrders.filter((item) =>
                        item.status.includes('done')
                    ));
                    setDelivered(allOrders.filter((item) =>
                        item.status.includes('delivered')
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

        if (status === 'doing') {
            statusOrder = { 'status': 'done' }
        }
        if (status === 'done') {
            statusOrder = { 'status': 'delivered' }
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
                if (status === 'done' && result.id === done[index].id) {
                    done.splice(index, 1)
                    setDone([...done])
                    setDelivered([...delivered, result])
                }
                if (status === 'delivered' && result.id === delivered[index].id) {
                    delivered.splice(index, 1)
                    setDelivered([...delivered])
                }
            })
    }

    return (
        <div>
            <h1>
                TAG Burger
            </h1>
            <section>
                <h2>Pedidos prontos</h2>
                <div>
                    {done
                        .map(({id, client_name, table, status, createdAt, updatedAt, Products }, index) => (
                            <div key={Math.random()}>
                                <div key={Math.random()}>
                                    <p>Pedido n°:{id}</p>
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
                                    <p>Pedido realizado em: {createdAt}</p>
                                    <p>Pedido atualizado em: {updatedAt}</p>
                                </div>
                                <button
                                    onClick={() => handleChange(id, status, index)}
                                >Entregue</button>
                            </div>
                        ))
                    }
                </div>
            </section>
            <section>
                {delivered !== [] &&
                    <>
                        <h2>Pedidos entregues</h2>
                        <div>
                            {delivered
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

export default Orders;

