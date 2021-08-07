import React, { Component } from "react";
import styles from "../Modal.module.css";

export default class NewProduct extends Component {
	state = {
		name: "",
		imageUrl: "",
		count: 0,
		width: 0,
		height: 0,
		weight: "",
	};

	render() {
		return (
			<div className={styles.Backdrop}>
				<div className={styles.Modal}>
					<h3>New Product</h3>
					<h4>Enter details</h4>
					<input
						placeholder="Name"
						onChange={event => {
							this.setState({ name: event.target.value});
						}}
					/>
					<input
						placeholder="Count"
						type="number"
						onChange={event => {
							this.setState({ count: event.target.value});
						}}
					/>
					<input
						placeholder="Image URL"
						onChange={event => {
							this.setState({ imageUrl: event.target.value});
						}}
					/>
					<input
						placeholder="Width"
						type="number"
						onChange={event => {
							this.setState({ width: event.target.value});
						}}
					/>
					<input
						placeholder="Height"
						type="number"
						onChange={event => {
							this.setState({ height: event.target.value});
						}}
					/>
					<input
						placeholder="Weight"
						onChange={event => {
							this.setState({ weight: event.target.value});
						}}
					/>
					<button
						onClick={() =>
							this.props.create(
								this.props.id, {
									id: this.props.id,
									name: this.state.name,
									count: this.state.count,
									imageUrl: this.state.imageUrl,
									size: {
										width: this.state.width,
										height: this.state.height,
									},
									weight: this.state.weight,
								}
							)
						}
					>
						Create	
					</button>
					<button onClick={this.props.close}>Close</button>
				</div>
			</div>
		);
	}
}