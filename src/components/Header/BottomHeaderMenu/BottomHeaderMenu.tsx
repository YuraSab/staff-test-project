import React, {FC, useState} from 'react';
import styles from "./BottomHeaderMenu.module.css";
import StaffIcon from "../../../assets/pictures/staff_logo.png";
import ComebackAlive from "../../../assets/pictures/comeback_alive.svg";
import SearchIcon from "../../../assets/icons/search_icon.svg";
import UserIcon from "../../../assets/icons/person_icon.png";
import CartIcon from "../../../assets/icons/cart-icon.png";
import LikeIcon from "../../../assets/icons/like_icon.png";
import BurgerMenu from "../../../assets/icons/burger_menu.png";
import CrossIcon from "../../../assets/icons/cross_icon.png";
import {NavLink, useLocation} from "react-router-dom";
import GenderBar from "../HeaderElements/GenderBar/GenderBar.tsx";
import GenderBarMobile from "../HeaderElements/GenderBarMobile/GenderBarMobile";

const BottomHeaderMenu: FC = () => {

    const location = useLocation();

    const [burgerMenuActive, setBurgerMenuActive] = useState<boolean>(false)

    return (

        <div className={styles.overlay}>

            <div className={styles.main_block}>

                <div className={styles.burgerMenu} onClick={() => setBurgerMenuActive(prevState => !prevState)}>
                    {
                        burgerMenuActive ?
                            <img src={CrossIcon} alt={'burger-menu'} width={19}/>
                            :
                            <img src={BurgerMenu} alt={'burger-menu'} width={19}/>
                    }
                </div>

                <div className={styles.logo}>
                    <img src={StaffIcon} alt={"logo"}/>
                </div>

                <div className={styles.menu}>
                    <div className={styles.genderLinks}>

                        <NavLink
                            className={({isActive}) => (isActive ? styles.genderLinkActive : styles.genderLink)}
                            to={'/male'}
                            style={{paddingRight: 60}}
                        >
                            Для хлопців
                        </NavLink>
                        <NavLink
                            className={({isActive}) => (isActive ? styles.genderLinkActive : styles.genderLink)}
                            to={'/female'}
                        >
                            Для дівчат
                        </NavLink>
                    </div>

                    <div className={styles.icons_set}>
                        <img src={ComebackAlive} alt={""}/>
                        <img src={SearchIcon} alt={""} height={25}/>
                        <img src={UserIcon} alt={""} height={25}/>
                        <img src={LikeIcon} alt={""} height={25}/>
                        <img src={CartIcon} alt={""} height={25}/>
                    </div>
                </div>


                <div className={styles.submenu}>
                    {
                        location.pathname.includes("female")
                            ?
                            <GenderBar propGender={"female"}/>
                            :
                            <GenderBar propGender={"male"}/>
                    }
                </div>

                {
                    burgerMenuActive &&
                    <GenderBarMobile
                        propGender={location.pathname.includes("female") ? "female" : "male"}
                        setBurgerMenuActive={setBurgerMenuActive}
                    />

                }


            </div>
        </div>
    );
};

export default BottomHeaderMenu;
