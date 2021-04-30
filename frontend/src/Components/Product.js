import React, { useEffect, useState } from 'react';
import produce from 'immer';
import axios from 'axios';

function Product(props) {

    const [productData, setProductData] = useState({});
    const [activeTab, setActiveTab] = useState((props.location.state && props.location.state.activeProductTab) ? props.location.state.activeProductTab : 'fruitsVegetables');
    const [filteredData, setFilteredData] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [cartData, setCartData] = useState({});



    useEffect(() => {
        getProductList();
        getCartItems();
    }, []);

    const getCartItems = () => {
        axios.get(`http://localhost:3001/cartItems/${localStorage.userId}`).then(res => {
            setCartData(res.data)
            localStorage.setItem("cartCount", res.data.items.length)
        }).catch(e => {
            console.log(e);
        })
    }

    const getProductList = () => {
        axios.get('http://localhost:3001/products').then(res => {
            let data = JSON.parse(JSON.stringify(res.data))
            let filteredDataTemp = data[activeTab]
            setProductData(data)
            setFilteredData(filteredDataTemp)
        })
    }

    useEffect(() => {
        setIsFetching(false)
    }, [filteredData])

    useEffect(() => {
        if (Object.keys(productData).length) {
            let data = JSON.parse(JSON.stringify(productData))
            let filteredDataTemp = data[activeTab];
            setFilteredData(filteredDataTemp);
        }
    }, [activeTab]);

    const addCartHandler = (product) => {
        console.log(product, 'product')
        if(localStorage.userId) {
        let cartDataTemp = JSON.parse(JSON.stringify(cartData));
        if (Object.keys(cartData).length > 0) {
            let findExistingCartItem = cartDataTemp.items.findIndex(el => el.id == product.id);
            if (findExistingCartItem !== -1) {
                cartDataTemp.items[findExistingCartItem]["quantityAdded"] = cartDataTemp.items[findExistingCartItem]["quantityAdded"] + 1;
            } else {
                product["quantityAdded"] = 1
                cartDataTemp.items.push(product);
            }
            axios.put(`http://localhost:3001/cartItems/${localStorage.userId}`, cartDataTemp).then(res => {
                getCartItems()
            })

        } else {
            product["quantityAdded"] = 1
            let cartItem = {
                id: localStorage.userId,
                items: [product]
            }


            axios.post(`http://localhost:3001/cartItems`, cartItem).then(res => {
                getCartItems()
            })
        }
    }
    else {
        alert('Please log in to add item in cart');
        setTimeout(()=>{
            props.history.push('/login');
        },3000)
        
    }
    }

    return (
        <section class="product-listing">
            <div class="container">
                <div class="row sidebar-nav">
                    <div class="col-12 d-lg-none d-md-none d-block mt-4"><a href="" class="btn btn-style-1 btn-block text-left dropdown-toggle side-bar-btn">Fruits & Vegetables <span></span></a></div>
                    <div class="col-lg-3 col-md-3 light-bg side-bar-menu">

                        <ul class="p-0 m-0 list-unstyled mt-3">
                            <li onClick={() => setActiveTab('fruitsVegetables')}><a class="p-2 border-bottom d-block">Fruits & Vegetables</a></li>
                            <li onClick={() => setActiveTab('bakeryItems')}><a class="p-2 border-bottom d-block">Bakery cakes Dairy</a></li>
                            <li><a class="p-2 border-bottom d-block">Beverages</a></li>
                            <li><a class="p-2 border-bottom d-block">Beauty hygiene</a></li>
                            <li onClick={() => setActiveTab('babyCare')}><a class="p-2 border-bottom d-block">Baby Care</a></li>
                        </ul>
                    </div>
                    <div class="col-lg-9 col-md-9 pt-md-5 pt-lg-5 pt-sm-4">
                        <div class="row product-list-wrp">
                            {isFetching ?
                                "Fetching Products"
                                :
                                filteredData.map((product, index) =>
                                    <div key={index} class="col-lg-3 col-md-6 col-sm-6 col-6 product-list px-1">
                                        <div class="white-bg mb-5 bShadow bShadow-2 p-2">
                                            <div class="product-name mt-2 mb-2 mb-lg-4"><h3>{product.name}, {product.quantity}</h3></div>
                                            <div class="product-img"><a href=""><img src={product.image} alt="" /></a></div>
                                            <div class="product-details p-2 light-bg my-4"><p class="m-0 p-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum praesentium asperiores natus nemo cum.</p></div>
                                            <div class="product-actions pb-2"><div class="row align-items-center"> <div class="col pr-0 d-lg-block d-md-none d-sm-none d-none">MRP Rs. {product.price}</div>
                                                <div class="col pl-0">
                                                    <a onClick={() => addCartHandler(product)} class="btn btn-style-1 px-0">Buy Now
                                                        <span class="d-md-inline-block d-lg-none d-sm-inline-block">@ Rs. 87</span>
                                                    </a>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Product;