import React from 'react';

function HomePage(props) {

    const showProduct = (productTab) => {
        props.history.push({ pathname: '/products', state: { activeProductTab: productTab } })
    }

    return (
        <>
            <section class="banner mb-5">
                <div class="container">
                    <div class="row mb-5 white-bg bShadow bShadow-16">
                        <div class="col">
                            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                <ol class="carousel-indicators">
                                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                                </ol>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img class="d-block w-100" src="https://res.cloudinary.com/dj0inalbr/image/upload/v1617438249/sabka-bazar/images/offer1_jz63vu.jpg" alt="First slide" />

                                    </div>
                                    <div class="carousel-item">
                                        <img class="d-block w-100" src="https://res.cloudinary.com/dj0inalbr/image/upload/v1617438249/sabka-bazar/images/offer2_gdvbjd.jpg" alt="Second slide" />

                                    </div>
                                    <div class="carousel-item">
                                        <img class="d-block w-100" src="https://res.cloudinary.com/dj0inalbr/image/upload/v1617438249/sabka-bazar/images/offer3_jlweii.jpg" alt="Third slide" />

                                    </div>
                                    <div class="carousel-item">
                                        <img class="d-block w-100" src="https://res.cloudinary.com/dj0inalbr/image/upload/v1617438249/sabka-bazar/images/offer4_k9el1f.jpg" alt="Fourth slide" />

                                    </div>
                                    <div class="carousel-item">
                                        <img class="d-block w-100" src="https://res.cloudinary.com/dj0inalbr/image/upload/v1617438249/sabka-bazar/images/offer5_wkofxx.jpg" alt="Fifth slide" />

                                    </div>
                                </div>
                                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div class="container">
                    <div class="row white-bg bShadow bShadow-16 mb-5 pb-4">
                        <div class="col-lg-4 col-md-4 col-sm-5 col-5 pb-4">
                            <a><img src="https://res.cloudinary.com/dj0inalbr/image/upload/v1617438428/sabka-bazar/images/fruits_wrg6rw.png" alt="" /></a>
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-7 col-7 text-center align-self-center"><h3 class="mb-3 p-0">Fruits & Vegetables</h3><p class="mb-4 p-0">Lorem ipsum dolor sit amet consectetur</p><a onClick={() => showProduct('fruitsVegetables')} class="btn btn-style-1">Explore Fruits and Vegetables</a></div>

                    </div>
                    <div class="row white-bg bShadow bShadow-16 mb-5 pb-4">
                        <div class="col-lg-8 col-md-8 col-sm-7 col-7 text-center align-self-center"><h3 class="mb-3 p-0">Bakery cakes Dairy</h3><p class="mb-4 p-0">Lorem ipsum dolor sit amet consectetur</p>
                            <a onClick={() => showProduct('bakeryItems')} class="btn btn-style-1">Explore Bakery cakes Dairy</a>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-5 col-5 pb-4 text-right"><a href=""><img src="https://res.cloudinary.com/dj0inalbr/image/upload/v1617438428/sabka-bazar/images/bakery_asibmk.png" alt="" /></a></div>

                    </div>
                    <div class="row white-bg bShadow bShadow-16 mb-5 pb-4">
                        <div class="col-lg-4 col-md-4 col-sm-5 col-5 pb-4"><a href=""><img src="https://res.cloudinary.com/dj0inalbr/image/upload/v1617438428/sabka-bazar/images/beverages_crm7zq.png" alt="" /></a></div>
                        <div class="col-lg-8 col-md-8 col-sm-7 col-7 text-center align-self-center"><h3 class="mb-3 p-0">Beverages</h3><p class="mb-4 p-0">Lorem ipsum dolor sit amet consectetur</p><a href="" class="btn btn-style-1">Explore Beverages</a></div>

                    </div>
                    <div class="row white-bg bShadow bShadow-16 mb-5 pb-4">

                        <div class="col-lg-8 col-md-8 col-sm-7 col-7 text-center align-self-center"><h3 class="mb-3 p-0">Beauty hygiene</h3><p class="mb-4 p-0">Lorem ipsum dolor sit amet consectetur</p><a href="" class="btn btn-style-1">Explore Beauty hygiene</a></div>
                        <div class="col-lg-4 col-md-4 col-sm-5 col-5 pb-4 text-right"><a href=""><img src="https://res.cloudinary.com/dj0inalbr/image/upload/v1617438428/sabka-bazar/images/beauty_vexb15.png" alt="" /></a></div>

                    </div>
                    <div class="row white-bg mb-5 pb-4">
                        <div class="col-lg-4 col-md-4 col-sm-5 col-5 pb-4"><a href=""><img src="https://res.cloudinary.com/dj0inalbr/image/upload/v1617438428/sabka-bazar/images/baby_n2zsb3.png" alt="" /></a></div>
                        <div class="col-lg-8 col-md-8 col-sm-7 col-7 text-center align-self-center"><h3 class="mb-3 p-0">Baby Care</h3><p class="mb-4 p-0">Lorem ipsum dolor sit amet consectetur</p><a onClick={() => showProduct('babyCare')} class="btn btn-style-1">Explore Baby Care</a></div>

                    </div>
                </div>
            </section>
        </>
    );
}

export default HomePage;