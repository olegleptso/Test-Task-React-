import React from "react";
import styles from "./Comment.module.css";

export default function Comment(props) {
    return (
        <div className={styles.Comment}>
            <p>{props.content}</p>
            <hr/>
            <div className={styles.DateDelete}>
                <p className={styles.Date}>{props.date}</p>
                <button onClick={props.deleteComment}>Delete</button>
            </div>
            
        </div>
    )
};