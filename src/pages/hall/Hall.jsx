import { useState, useEffect } from "react";

const Hall = () => {
    const [show, setShow] = useState(true)
    const [menu, setMenu] = useState([]);
    let token = localStorage.getItem("token");

    useEffect(() => {
        fetch('https://lab-api-bq.herokuapp.com/products', {
            method: 'GET',
            headers: {
                'access-control': 'allow-origin',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },

        })

        .then(response => response.json())
        .then((response) => {
                setMenu(response)
        }
    })

    const data = [];
    for (const menus of menu) {
        data.push(
            <div key={menus.id}>
                <p>{menus.name}</p>
            </div>
        )
    }
    return (
        <div>
            <h1>
                Aqui é Hall
            </h1>
            <div className='menus'>{data}</div>
            <div className='Cardapio'>

                <button onClick={() => setShow(true)}>Café da Manhã</button>
                <button onClick={() => setShow(false)}>Hamburgueria</button>
                {
                    show ?
                        <div>
                            café
                </div>
                        :
                        <div>
                            hamburguer
                </div>

                }
            </div>
        </div>
    )
}


export default Hall;
