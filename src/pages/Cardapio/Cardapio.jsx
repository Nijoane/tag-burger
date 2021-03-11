/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import MenuCardapio from "../../containers/MenuCardapio";
import LogoWhite from '../../images/logoWhite.png';
import { USER } from "../../services/api";
import { LogoHall, BodyCardapio} from '../../components/stylesCardapio';
const Cardapio = () => {

    const [menuData, setMenuData] = useState({});
    useEffect(async function (token) {
        const { url, options } = USER(token);
        const response = await fetch(url, options);
        const json = await response.json();
        setMenuData(json);
    })
    return (
        <BodyCardapio>
            <LogoHall src={LogoWhite} alt='' width='250' />
            <div>
                <MenuCardapio
                    menu={menuData}
                />
            </div>
        </BodyCardapio>
    );
}
export default Cardapio;

