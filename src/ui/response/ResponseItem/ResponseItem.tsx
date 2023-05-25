import React, {FC, useEffect, useState} from 'react';
import {Like, Response} from "../../../redux/action-types";
import styles from "./ResponseItem.module.css";
import UserBlack_Icon from "../../../assets/icons/user_black.png";
import Like_Icon from "../../../assets/icons/like_black_icon.png";
import Response_Icon from "../../../assets/icons/response_icon.png";
import {useTypedSelector} from "../../../hooks/redux/useTypedSelector";
import {useAction} from "../../../hooks/redux/useAction";
import AddResponseOnResponse from "../AddResponeOnResponse/AddResponseOnResponse";

type ResponseItem_Props = {
    item: Response;
}

const ResponseItem: FC<ResponseItem_Props> = ({item}) => {

    const {likes, parent_child_comments, responses} = useTypedSelector(state => state.responseReducer);
    const {onAddLike, onDeleteLike} = useAction();
    const [responseOnResponseActive, setResponseOnResponseActive] = useState<boolean>(false);

    const [actualLikes, setActualLikes] = useState<Like[]>([]);
    const [actualResponses, setActualResponses] = useState<Response[]>([]);

    const user = {
      id: 4,
      name: "user",
    };

    useEffect(() => {
        const filtered = likes.filter(el => el.id_response === item.id_response);
        setActualLikes(filtered);
    }, [likes]);

    useEffect(() => {
        const actualResponsesOnResponse = parent_child_comments.filter(el => el.id_parent_response === item.id_response && el.id_parent_response);
        const filtered: Response[] = actualResponsesOnResponse.map(el => responses.find(item => item.id_response === el.id_parent_response)) as Response[];
        setActualResponses(filtered);
    }, [responses]);


    const handleAddLike = () => {
        const responseLikes = likes.filter(el => el.id_response === item.id_response);
        const userLiked = responseLikes.find(el => el.id_user === user.id);

        if(userLiked) {
            onDeleteLike(userLiked.id_like)
        }else{
            onAddLike({
                id_response: item.id_response,
                id_like: likes.length+1,
                id_user: user.id,
                date: new Date(),
            })
        }
    };

    return (

        <div style={{display: "flex", padding: "40px 0", borderBottom: "1px solid #d3d3d3"}}>
            <div style={{width: 60}}><img src={UserBlack_Icon} alt={"user-icon"} width={24}/></div>
            <div>
                <div className={styles.date}>{item.date.toLocaleString()}</div>
                {/* todo - I would inject and type username if I had made user-table in db (with authorisation etc) */}
                <div className={styles.userName}>User</div>
                <div className={styles.text}>{item.text}</div>
                <div style={{display: "flex", gap: 20, alignItems: "center"}}>
                    <div onClick={() => handleAddLike()}>
                        <img src={Like_Icon} alt={"like"} width={20}/>
                        <span style={{marginLeft: 4}}>{actualLikes.length}</span></div>
                    <div onClick={() => setResponseOnResponseActive(true)}>
                        <img src={Response_Icon} alt={"response"} width={19}/>
                        <span style={{marginLeft: 4}}>{actualResponses.length}</span>
                    </div>
                </div>
            </div>


            {
                responseOnResponseActive && <AddResponseOnResponse item={item} handleAddLike={handleAddLike} actualLikes={actualLikes} setResponseOnResponseActive={setResponseOnResponseActive}/>
            }
        </div>
    );
};

export default ResponseItem;