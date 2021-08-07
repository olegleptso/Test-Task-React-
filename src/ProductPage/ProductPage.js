import axios from "axios";
import React, { Component } from "react";
import styles from "./ProductPage.module.css";
import EditProduct from "../EditProduct/EditProduct";
import Comment from "../Comment/Comment";

export default class ProductPage extends Component {
    state = {
        id: null,
        name: "",
        imageUrl: "",
		count: 0,
		size: {
			width: 0,
			height: 0,
		},
		weight: "",
        comments: [],
		editing: false,
		comment: "",
    };

    componentDidMount() {
		this.getProduct();
        this.setState({id:this.props.match.params.productId})
	}

    getProduct = () => {
		axios
			.get(
				"https://react-test-task-6dee9-default-rtdb.europe-west1.firebasedatabase.app/products/" + this.props.match.params.productId + ".json"
			)
			.then(response => {
                let data = response.data;
				this.setState({
					name: data.name,
					count: data.count,
					comments: data.comments,
					imageUrl: data.imageUrl,
					size: data.size,
					weight: data.weight,
				});
			})
			.catch(error => {
				console.error(error);
			});
	}

    toggleEdit = () => {
        this.setState({editing: !this.state.editing});
        this.getProduct();
    };

    changeProduct = (id, changedProduct) => {
            axios
                .put("https://react-test-task-6dee9-default-rtdb.europe-west1.firebasedatabase.app/products/" + this.state.id + ".json", 
				{
                    name: changedProduct.name,
                    id: id,
                    count: changedProduct.count,
                    imageUrl: changedProduct.imageUrl,
                    size: {
                        width: changedProduct.size.width,
                        height: changedProduct.size.height,
                    },
                    comments: this.state.comments,
                    weight: changedProduct.weight,
                })
                .then(response => {
                    this.toggleEdit();
                });
        
    };

    leaveComment = () => {
		let newComments = [];
		if (this.state.comments) {
			newComments = [...this.state.comments];
		}
		
		newComments.push({
			content: this.state.comment,
			productId: this.props.match.params.productId,
			id: newComments.length,
			date: new Date().toString(),
		});

		axios
			.put(
				"https://react-test-task-6dee9-default-rtdb.europe-west1.firebasedatabase.app/products/" + this.state.id + "/comments.json",
				newComments
			)
			.then(response => {
				this.getProduct();
			})
			.catch(error => {
				console.error(error);
			});
	};

    deleteComment(commentId) {
		const newComments = this.state.comments.filter(comment => comment.id !== commentId);

		axios
			.put(
				"https://react-test-task-6dee9-default-rtdb.europe-west1.firebasedatabase.app/products/" + this.state.id+ "/comments.json",
				newComments
			)
			.then(response => {
				this.getProduct();
			})
			.catch(error => {
				console.error(error);
			});
	}

    render () {
        return (
            <div className={styles.ProductPage}>
                {this.state.editing ? (
					<EditProduct
						id={this.state.id}
						name={this.state.name}
                        imageUrl={this.state.imageUrl}
						count={this.state.count}
						width={this.state.size.width}
						height={this.state.size.height}
						weight={this.state.weight}
                        comments={this.state.comments}
						close={this.toggleEdit}
						edit={this.changeProduct}
					/>
				) : null}
                <div className={styles.ProductInfo}>
					
                    <img src={this.state.imageUrl} alt={this.state.name} /> 
					<h1>{this.state.name}</h1>
					<p>Count: {this.state.count}</p>
					<p>Width: {this.state.size.width}</p>
					<p>Height: {this.state.size.height}</p>
					<p>Weight: {this.state.weight}</p>
					<button onClick={this.toggleEdit}>Edit</button>
				</div>
                <div className={styles.Comments}>
					<h1>Comments:</h1>
					{this.state.comments
						? this.state.comments.map((comment, i) => {
								return (
									<Comment
										key={i}
                                        deleteComment={() => this.deleteComment(comment.id)}
										content={comment.content}
										date={comment.date}
									/>
								);
						  })
						: null}
					<textarea
						className={styles.CommentArea}
						placeholder="Enter comment..."
						onChange={event => {
							this.setState({ comment: event.target.value });
						}}
					/>
					<button onClick={this.leaveComment}>Comment</button>
				</div>
			</div>
		);
	}
}