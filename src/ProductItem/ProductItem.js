import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ProductItem.module.css";

export default function ProductItem(props) {
    return (
            <div className={styles.ProductItem}>
                <img src={props.imageUrl} alt={props.name} />
                <h1>{props.name}</h1>
                <p>Count: {props.count}</p>
                <NavLink to={"/products/" + props.id} className={styles.link}>
                    <h3>Details</h3>
                </NavLink>
                <button onClick={event => {
                    event.preventDefault();
					props.delete();
                }}>
					Delete
				</button>   
            </div>
            
    );
}