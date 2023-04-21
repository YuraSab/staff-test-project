import React, {FC} from 'react';
import styles from "./DropDownMenu.module.css";
import {DropMenuListSubItem} from "../BottomHeaderMenu/ElementList_DropDownMenu";


interface DropItemProps {
    subItem: DropMenuListSubItem
}

const DropItem: FC<DropItemProps> = ({subItem}) => {

    function replaceWithBr() {
        return subItem.name.replace(/\n/g, "<br />")
    }

    return (
        <div className={subItem.type === "category" ? styles.category : styles.subCategory} dangerouslySetInnerHTML={{__html: replaceWithBr()}}></div>
    );
};

export default DropItem;