import { useEffect, useState } from 'react';
const Kitchen = () => {
    const [pending, setPending] = useState([]);
    const [doing, setDoing] = useState([]);
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
            if(result) {
                const allOrders = result;
                console.log(allOrders)
                setPending(allOrders.filter((order) => 
                    order.status.includes('pending')
                ));
                setDoing(allOrders.filter((order) => 
                    order.status.includes('doing')
                ));
            }
            })
    }
    useEffect(() => {
        getAllOrders(token);
    }, [token]);
    setTimeout(() => {getAllOrders(token)},30000);
    const handleChange = (id, status, index) => {
        let statusOrder = '';
        let key=`/${id}`
        console.log(key);
        if(status === 'pending') {
            statusOrder = {'status' : 'doing'}
        }
        if(status ===  'doing') {
            statusOrder = {'status' : 'done'}
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
            if(status === 'pending' && result.id === pending[index].id){
                pending.splice(index, 1)
                setPending([...pending])
                setDoing([...doing, result])
            }
            if(status === 'doing' && result.id === doing[index].id){
                doing.splice(index, 1)
                console.log(setDoing([...doing]))
            }
        })
    }
    return (
        <div>
            <h1>
                TAG Burger
            </h1>
            <section>
                <h2>Pending</h2>
                <div>
                    {pending
                        .sort((a, b) => (a.id > b.id ? 1 : -1))
                        .map(({id, client, table, status, createdAt, updatedAt, Products}, index) => (
                        <div key={id}>
                            <div>
                               <p>id={id}</p> 
                               <p>client={client}</p> 
                               <p>table={table}</p> 
                               <p> status={status}</p> 
                               <p>create={createdAt} </p>  
                               <p>ordersProducts = {Products}</p> 
                            
                            </div>
                            <button
                                className="comanda-button"
                                onClick={() => handleChange(id, status, index)} 
                            >Iniciar Pedido</button>
                        </div>
                        ))
                    }
                </div>
            </section>
            <section className="pedidos-andamento">
                {doing !== [] &&
                    <>
                        <h2>Doing</h2>
                        <div>
                            {doing
                                .sort((a, b) => (a.id > b.id ? 1 : -1))
                                .map(({id, client, table, status, createdAt, updatedAt, Products}, index) => (
                                    <div key={id}>
                                            <div 
                                                id={id}
                                                client={client}
                                                table={table}
                                                status={status}
                                                create={createdAt}
                                                update={createdAt}
                                                ordersProducts = {Products}
                                            >
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