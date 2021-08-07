import React, { Component } from "react";
import axios from "axios";
import styles from "./ProductListPage.module.css";
import ProductItem from "../ProductItem/ProductItem";
import NewProduct from "../NewProduct/NewProduct";

export default class ProductListPage extends Component {

    state = {                 //state for holding products array and addingActive to toggle modal window
        products:[],
        addingActive: false,
    };

    componentDidMount() {    
		this.getProducts();
		
	}

    getProducts = () => { //Filling products array from Firebase
        axios
			.get("https://react-test-task-6dee9-default-rtdb.europe-west1.firebasedatabase.app/products.json")
			.then(response => {
				this.setState({ products: response.data });
			})
			.catch(error => {
				console.error(error);
			});
	    };

	toggleNew = () => { 										//toggiling modal window
		this.setState({ addingActive: !this.state.addingActive });
	};
	
    sortByName = () => {   										//Sorting by Name
		const sorted = this.state.products.sort((a, b) => {
			return a.name > b.name ? 1 : -1;
		});
		this.setState({ products: sorted });
	};

	sortByCount = () => { 										//Sorting by Count
		const sorted = this.state.products.sort((a, b) => {
			return a.count > b.count ? 1 : -1;
		});
		this.setState({ products: sorted });
	};

    newProduct = (id, newProduct) => {							//Creating new product on firebase
		const newProducts = [...this.state.products];
		newProducts.push({ ...newProduct, id: newProducts.length });
		axios
			.put("https://react-test-task-6dee9-default-rtdb.europe-west1.firebasedatabase.app/products.json", newProducts)
			.then(() => {
				this.getProducts();
				this.toggleNew();								
			})
			.catch(error => {
				console.error(error);
			});
	};

    deleteProduct = (productId) => {							//Deleting product
        const newProducts = this.state.products.filter(product => product.id !== productId);
		axios
			.put("https://react-test-task-6dee9-default-rtdb.europe-west1.firebasedatabase.app/products.json", newProducts)
			.then(response => {
				this.getProducts();
			})
			.catch(error => {
				console.error(error);
			});
    }

    render () {
        return (
            <div className={styles.ProductListPage}>
                {this.state.addingActive ? <NewProduct create={this.newProduct} close={this.toggleNew}/> : null} 
				<header>
                    <h1>Products</h1>
                    <button onClick={this.toggleNew}>New Product</button>
                    <button onClick={() => this.sortByName()}>Sort(Name)</button>
                    <button onClick={() => this.sortByCount()}>Sort(Count)</button>
                </header>
                {this.state.products.map((product, i) => {
					return (
						<ProductItem
							key={i}
							id={product.id}
							name={product.name}
							imageUrl={product.imageUrl}
							count={product.count}
							size={product.size}
							weight={product.weight}
                            delete={() => this.deleteProduct(product.id)}
						/>
					);
				})}
            </div>
        )
    }
}