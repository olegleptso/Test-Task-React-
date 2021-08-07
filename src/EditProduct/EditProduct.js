import React, { Component } from "react";
import styles from "../Modal.module.css";

export default class EditProduct extends Component {
	state = {
		name: this.props.name,
		imageUrl: this.props.imageUrl,
		count: this.props.count,
		width: this.props.width,
		height: this.props.height,
		weight: this.props.weight,
	};

	render() {
		return (
			<div className={styles.Backdrop}>
				<div className={styles.Modal}>
					<h3>Edit Product</h3>
					<h4>Change details</h4>
					<input
						placeholder="Name"
						value={this.state.name}
						onChange={event => {
							this.setState({ name: event.target.value});
						}}
					/>
					<input
						placeholder="Count"
						type="number"
						value={this.state.count}
						onChange={event => {
							this.setState({ count: event.target.value});
						}}
					/>
					<input
						placeholder="Image URL"
						value={this.state.imageUrl}
						onChange={event => {
							this.setState({ imageUrl: event.target.value});
						}}
					/>
					<input
						placeholder="Width"
						type="number"
						value={this.state.width}
						onChange={event => {
							this.setState({ width: event.target.value});
						}}
					/>
					<input
						placeholder="Height"
						type="number"
						value={this.state.height}
						onChange={event => {
							this.setState({ height: event.target.value});
						}}
					/>
					<input
						placeholder="Weight"
						value={this.state.weight}
						onChange={event => {
							this.setState({ weight: event.target.value});
						}}
					/>
					<button
						onClick={() =>
							this.props.edit(this.props.id, {
								id: this.props.id,
								name: this.state.name,
								count: this.state.count,
								imageUrl: this.state.imageUrl,
								size: {
									width: this.state.width,
									height: this.state.height,
								},
								weight: this.state.weight,
								comments: this.props.comments,
							})
						}
					>
						Save
					</button>
					<button onClick={this.props.close}>Close</button>
				</div>
			</div>
		);
	}
}