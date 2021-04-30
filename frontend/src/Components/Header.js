import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'

const Header = (props) => {
    const [isShowCart, setIsShowCard] = useState(false);
    const [cartData, setCartData] = useState({});

    useEffect(() => {
        getCardItems();
    }, [])

    const signOutHandler = () => {
        delete localStorage.userId;
        props.history.push('/login')
    }

    const getCardItems = () => {
        axios.get(`http://localhost:3001/cartItems/${localStorage.userId}`).then(res => {
            setCartData(res.data)
        }).catch(e => {
            console.log(e);
        })
    }

    const openCartModalHandler = () => {
        getCardItems()
        setIsShowCard(true)
    }

    const getTotalAmount = () => {
        let totalAmount = 0;
        for(let i =0; i< cartData.items.length; i++) {
            console.log(cartData.items.price)
            totalAmount = totalAmount + parseInt(cartData.items[i].price * cartData.items[i].quantityAdded);
        }
        return totalAmount;
    }

    const quatityChangeHandler = (item, key) => {
        let cartDataTemp = JSON.parse(JSON.stringify(cartData));
        let findIndex = cartDataTemp.items.findIndex(el => el.id == item.id);
        if (key === "plus") {
            cartDataTemp.items[findIndex].quantityAdded = cartDataTemp.items[findIndex].quantityAdded + 1;
            axios.put(`http://localhost:3001/cartItems/${localStorage.userId}`, cartDataTemp).then(res => {
                getCardItems()
            })
        } else {
            if (item.quantityAdded == 1) {
                cartDataTemp.items = cartDataTemp.items.filter((el, index) => index !== findIndex);
            } else {
                cartDataTemp.items[findIndex].quantityAdded = cartDataTemp.items[findIndex].quantityAdded - 1;
            }

            axios.put(`http://localhost:3001/cartItems/${localStorage.userId}`, cartDataTemp).then(res => {
                getCardItems()
            })
        }
    }

    return (
        <>
            <header class="header shadow-sm mb-5">
                <div class="container">
                    <div class="row">
                        <nav class="d-flex navbar navbar-expand-md navbar-light w-100 p-0">
                            <a class="navbar-brand p-2 logo" href="#"><img src='https://res.cloudinary.com/dj0inalbr/image/upload/v1617438018/sabka-bazar/images/logo_zkjhwd.png' alt="" /></a>

                            <div class="right-nav pr-2 align-self-end order-lg-3 order-md-3 order-sm-2">
                                <button class="navbar-toggler d-md-none align-self-end" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="mb-2 d-xl-inline-block d-lg-inline-block  d-md-inline-block d-none text-right">
                                    {/* <a href="" class="p-2">SignIn</a> */}
                                    {localStorage.userId ?
                                        <a onClick={signOutHandler} class="p-2">Sign Out</a>
                                        :
                                        <>
                                            <Link to="/login" class="p-2">SignIn</Link>
                                            <Link to="/registration" class="py-2">Registration</Link>
                                        </>
                                    }
                                    {/* <a href="" class="py-2">Register</a> */}
                                </div>

                                {localStorage.userId &&
                                    <div class="d-md-block d-lg-block d-lx-block d-inline-block">
                                        <a class="p-3 light-bg d-block" onClick={openCartModalHandler}>
                                            {/* <svg width="30px" height="30px" version="1.1" id="Layer_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"
                                > */}
                                            {/* <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" /> */}
                                            {/* </svg> */}
                                            <span class="ml-2">Cart Items</span></a>
                                    </div>
                                }
                            </div>

                            <div class="collapse d-md-block navbar-collapse align-self-end pb-3 pl-5 order-lg-2 order-md-2 order-sm-3" id="navbarSupportedContent">
                                <ul class="navbar-nav mr-auto pt-3">
                                    <li class="nav-item active">
                                        <Link to="/" class="nav-link strong">Home</Link>
                                        {/* <a class="nav-link strong" href="#">Home <span class="sr-only">(current)</span></a> */}
                                    </li>
                                    <li class="nav-item">
                                        {/* <a class="nav-link strong" href="#">Product</a> */}
                                        <Link to="/products" class="nav-link strong">Products</Link>
                                    </li>
                                    <li class="nav-item d-xl-none d-lg-none d-md-none">
                                        <a class="nav-link strong" href="#">SignIn</a>
                                    </li>
                                    <li class="nav-item d-xl-none d-lg-none d-md-none">
                                        <a class="nav-link strong" href="#">Register</a>
                                    </li>
                                </ul>
                            </div>


                        </nav>
                    </div>
                </div>
            </header>

            {isShowCart &&
                <div class="modal show d-block cart-modal" id="cart-modal" tabindex="-1" role="dialog" aria-labelledby="cart-modalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header black-bg">
                                <h5 class="modal-title" id="cart-modalLabel strong">My Cart <small>({Object.keys(cartData).length > 0 ? cartData.items.length : 0} item)</small></h5>
                                <button type="button" class="close white" onClick={() => setIsShowCard(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body light-bg">
                                <div class="cart-wrp">
                                    {Object.keys(cartData).length > 0 && cartData.items.map(item =>
                                        <div class="cart-block row my-2 white-bg">
                                            <div class="cart-item-pic col-3"><a href="">
                                                <img src={item.image} alt="" /></a></div>
                                            <div class="cart-item-info col-9">
                                                <h4 class="mt-3"><a href="" class="black">{item.name}, {item.quantity}</a></h4>
                                                <div class="cart-actions">
                                                    <button class="theme-bg btn rounded-circle white p-0" type="button" onClick={() => quatityChangeHandler(item, "minus")}>-</button>
                                                    <input type="text" value={item.quantityAdded} class="border-0 text-center" />
                                                    <button class="theme-bg btn rounded-circle white p-0" type="button" onClick={() => quatityChangeHandler(item, "plus")}>+</button>
                                                    <span class="mx-3">x</span> <span class="">Rs. {item.price}</span> <strong class="d-inline-block float-right">Rs. {item.price * item.quantityAdded}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* <div class="cart-block row my-2 white-bg">
                                        <div class="cart-item-pic col-3"><a href="">
                                            <img src="images/products/fruit-n-veg/kiwi-green.jpg" alt="" /></a></div>
                                        <div class="cart-item-info col-9">
                                            <h4 class="mt-3"><a href="" class="black">Kiwi - Green, 3 pcs</a></h4>
                                            <div class="cart-actions">
                                                <button class="theme-bg btn rounded-circle white p-0">-</button>
                                                <input type="text" value="1" class="border-0 text-center" /><button class="theme-bg btn rounded-circle white p-0">+</button> <span class="mx-3">x</span> <span class="">Rs. 187</span> <strong class="d-inline-block float-right">Rs. 187</strong>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                <div class="info-w white-bg p-2">
                                    <div class="row">
                                        <div class="col">
                                            <img src="images/lowest-price.png" alt="" />
                                            <span class="ml-3">You won'd find it cheaper anywhere</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer dropright">

                                <button type="button" class="btn btn-primary btn-style-1 btn-block text-left rounded dropdown-toggle">Proceed to checkout  <span class="float-right">Rs. {getTotalAmount()}</span></button>
                                <p class="text-center d-block w-100">Promo code can be applied on payment page</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Header;