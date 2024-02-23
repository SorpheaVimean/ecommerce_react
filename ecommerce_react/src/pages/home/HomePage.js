import React, { useState, useEffect } from "react";
import HeroPage from "./hero/HeroPage";
import rog1 from "../../img/rog1.gif";
import rog2 from "../../img/rog2.gif";
import rog from "../home/img/rog.png";
import aorus from "../home/img/aorus.png";
import Asus from "../home/img/Asus.png";
import dell from "../home/img/dell.png";
import razer from "../home/img/razer.png";
import msi from "../home/img/msi.png";

// Icon from react icon
import { IoIosLaptop } from "react-icons/io";
import { IoHardwareChipOutline } from "react-icons/io5";
import { FaRegKeyboard } from "react-icons/fa";
import { AiOutlineUsb } from "react-icons/ai";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

import { Button, Card, Col, Row, message } from "antd";
// import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { request } from "../../share/request";
import { configImage, getUser, isLogin } from "../../share/help";
import { Link } from "react-router-dom";
import { Btncompo } from "../../components/buttons/Buttons";
const { Meta } = Card;
const HomePage = () => {
  const user = getUser();
  // const [isFilled, setIsFilled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [getProducts, setGetProducts] = useState([]);
  // const handleHeartClick = () => {
  //   setIsFilled(!isFilled);
  // };

  useEffect(() => {
    getProduct();
  }, []);

  const redirectToCategory = (categoryId) => {
    window.location.href = `productCategory/${categoryId}`;
  };

  const handleCategoryClick = (categoryId) => {
    redirectToCategory(categoryId);
  };


  const getProduct = async () => {
    setLoading(true);
    const res = await request("product/latest", "get");
    console.log(res);
    setLoading(false);
    if (res) {
      setGetProducts(res.list);
    }
  };
  const addToCart = async (productId) => {
    if(!isLogin()){
      window.location.href = "/login";
    }else{
    const params = {
      customer_id: user.id,
      product_id: productId,
    };

    const res = await request("cart", "POST", params);
    if (res) {
      message.success(res.message);
    }
  }
  };
  const addToWishlist = async (productId) => {
    if(!isLogin()){
      window.location.href = "/login";
    }else{
    const params = {
      customer_id: user.id,
      product_id: productId,
    };
    const res = await request("wishlist", "POST", params);
    if (res) {
      message.success(res.message);
      // setWishlistIds((prevIds) => [...prevIds, productId]);
    }
  }
  };
  const viewDetail = (productId) => {
    window.location.href = `/quickview/${productId}`;
  };
  return (
    <div>
      <HeroPage className="z-0" />
      <div className=" flex justify-center mt-[-20px] md:mt-[-50px] z-10 items-center ">
        <div className="bg-white rounded-xl z-10  text-white py-5 flex justify-center items-center gap-4 md:gap-16 lg:gap-24 px-10 cursor-pointer">
          <div
            className=" flex flex-col justify-center items-center text-BgBtn hover:text-BgBtnHover  hover:scale-105 duration-300 ease-in-out "
            onClick={() => handleCategoryClick(1)}
          >
            <IoIosLaptop className="text-2xl  md:text-5xl  lg:text-7xl" />
            <p className="text-xs">LAPTOP</p>
          </div>

          <div
            className=" flex flex-col justify-center items-center text-BgBtn hover:text-BgBtnHover hover:scale-105 duration-300 ease-in-out"
            onClick={() => handleCategoryClick(2)}
          >
            <IoHardwareChipOutline className="text-2xl md:text-5xl lg:text-7xl" />
            <p className="text-xs">PC HARDWARE</p>
          </div>
          <div
            className=" flex flex-col justify-center items-center text-BgBtn hover:text-BgBtnHover hover:scale-105 duration-300 ease-in-out"
            onClick={() => handleCategoryClick(3)}
          >
            <FaRegKeyboard className="text-2xl md:text-5xl lg:text-7xl" />
            <p className="text-xs">PERIPHARALS</p>
          </div>
          <div
            className=" flex flex-col justify-center items-center text-BgBtn hover:text-BgBtnHover hover:scale-105 duration-300 ease-in-out"
            onClick={() => handleCategoryClick(4)}
          >
            <AiOutlineUsb className="text-2xl md:text-5xl lg:text-7xl" />
            <p className="text-xs">ACCESSORIES</p>
          </div>
        </div>
      </div>

      <div className="  mx-[20px] xs:mx-[30px] xl:mx-[70px]">
        {/* New Laptop */}
        <section>
          <div className="text-black font-bold text-2xl md:text-4xl text-center mt-10">
            Hot Products
          </div>
          <div className="flex flex-col md:flex-row justify-between mt-10 gap-20">
            <div className=" flex flex-col justify-center gap-3">
              <div className="text-xl font-bold">Laptop</div>
              <div className=" text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga
                beatae reiciendis iure dolorem nulla expedita maiores placeat
                suscipit, quidem veritatis non ratione, error ullam facilis
                inventore vitae nisi repellat facere consequuntur nesciunt. Sed
                neque laboriosam tempora inventore, numquam necessitatibus error
                perspiciatis. Qui, exercitationem aliquam. Iusto pariatur sequi
                omnis reprehenderit, commodi nam asperiores libero quia impedit
                voluptatum quisquam vitae! Exercitationem, iusto fugiat
                doloremque architecto similique itaque, veritatis soluta quidem
                illo eos officiis asperiores molestias temporibus numquam est a
                omnis quis dolor provident aliquam libero modi harum laudantium?
                Modi fugiat, quae praesentium odit veniam quidem asperiores
                incidunt, illo unde labore magni dolores!
              </div>
              <div className="">
                <Link to={"/product"}>
                  <Btncompo type="primary" label="Shop Now" />
                </Link>
              </div>
            </div>
            <div className="flex gap-7">
              <div className="">
                <Card
                  hoverable
                  className="w-[150px] md:w-[200px] lg:w-[180px] xl:w-[280px]  overflow-hidden "
                  cover={
                    <div
                      className="h-52 md:h-60 lg:h-72 overflow-hidden"
                      onClick={() => viewDetail(68)}
                    >
                      <img
                        alt="example"
                        src={rog1}
                        className="hover:scale-125 duration-300 ease-in-out  object-cover"
                      />
                    </div>
                  }
                >
                  <Button
                    type="text"
                    shape="circle"
                    // onClick={() => addToWishlist(product.id)}
                    // icon={
                    //   isProductInWishlist(product.id) ? (
                    //     <HeartFilled style={{ fontSize: "24px", color: "green" }} />
                    //   ) : (
                    //     <HeartOutlined style={{ fontSize: "24px" }} />
                    //   )
                    // }
                    className="absolute top-5 right-5 text-gray-600 font-bold hover:scale-110"
                  />

                  <Meta title="Asus ROG Flow Z13 (2024)" description="www.instagram.com " />
                  <div className="mt-2">
                    <p className="text-lg font-semibold text-red-600">
                      $ 2,099
                    </p>
                  </div>
                </Card>
              </div>
              <div className="">
                <Card
                  hoverable
                  className="w-[150px] md:w-[200px] lg:w-[180px] xl:w-[280px]  overflow-hidden "
                  cover={
                    <div
                    className="h-52 md:h-60 lg:h-72 overflow-hidden"
                      onClick={() => viewDetail(67)}

                    >
                      <img
                        alt="example"
                        src={rog2}
                        className="hover:scale-125 duration-300 ease-in-out  object-cover"
                      />
                    </div>
                  }
                >
                  <Button
                    type="text"
                    shape="circle"
                    // onClick={() => addToWishlist(product.id)}
                    // icon={
                    //   isProductInWishlist(product.id) ? (
                    //     <HeartFilled style={{ fontSize: "24px", color: "green" }} />
                    //   ) : (
                    //     <HeartOutlined style={{ fontSize: "24px" }} />
                    //   )
                    // }
                    className="absolute top-5 right-5 text-gray-600 font-bold hover:scale-110"
                  />

                  <Meta title="ASUS  Zephyrus Duo 16 (2023)" description="www.instagram.com " />
                  <div className="mt-2">
                    <p className="text-lg font-semibold text-red-600">
                      $4,399
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Feacture --> */}
        <section>
          <div className="text-xl text-center font-bold text-gray-900 sm:text-3xl flex flex-col justify-center items-center mt-10">
            <div className="text-black font-bold text-2xl md:text-4xl">
              New Collection
            </div>
            <p className="max-w-md  mt-4 text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
          </div>

          <div className=" px-4 py-8  sm:px-6 sm:py-12 lg:px-8 flex">
            <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
              <li>
                <div className="relative block group" onClick={() => viewDetail(22)}
>
                  <img
                    src="https://cdn.vox-cdn.com/thumbor/ysJ8yo126zopq15V_mPBXnJqUkg=/0x0:5263x3508/1400x1400/filters:focal(2632x1754:2633x1755)/cdn.vox-cdn.com/uploads/chorus_asset/file/20782512/blacksharkv2.jpg"
                    alt=""
                    className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                  />

                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    <h3 className="text-xl font-medium text-white">
                      Razer's BlackShark V2
                    </h3>

                    <span className="mt-1.5 inline-block rounded-lg bg-Pback px-5 py-3 text-xs font-medium uppercase tracking-wide text-white  hover:bg-PHover hover:bg-BgBtn transition duration-300 ease-in-out">
                      Shop Now
                    </span>
                  </div>
                </div>
              </li>

              <li>
                <div className="relative block group"onClick={() => viewDetail(20)}
>
                  <img
                    src="https://assets3.razerzone.com/DaBr4asOZom309fl8ljwQHrgakw=/767x511/https%3A%2F%2Fhybrismediaprod.blob.core.windows.net%2Fsys-master-phoenix-images-container%2Fh53%2Fh31%2F9512191492126%2F230502-kaira-hyperspeed-xbox-licensed-green-1.jpg"
                    alt=""
                    className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                  />

                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    <h3 className="text-xl font-medium text-white">
                      Razer Kaira
                    </h3>

                    <span className="mt-1.5 inline-block rounded-lg bg-Pback px-5 py-3 text-xs font-medium uppercase tracking-wide text-white  hover:bg-PHover hover:bg-BgBtn transition duration-300 ease-in-out">
                      Shop Now
                    </span>
                  </div>
                </div>
              </li>

              <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
                <div className="relative block group"onClick={() => viewDetail(21)}
>
                  <img
                    src="https://helios-i.mashable.com/imagery/articles/00ZzeJBVsHbVcUaO379evc0/hero-image.fill.size_1200x1200.v1639503272.jpg"
                    alt=""
                    className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                  />

                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    <h3 className="text-xl font-medium text-white">
                      Razer Kraken Ultimate RGB
                    </h3>

                    <span className="mt-1.5 inline-block rounded-lg bg-Pback px-5 py-3 text-xs font-medium uppercase tracking-wide text-white  hover:bg-PHover hover:bg-BgBtn transition duration-300 ease-in-out">
                      Shop Now
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* More products */}
        <div className="flex justify-between items-center flex-col my-[80px]">
          <h2 className="text-black font-bold text-2xl md:text-4xl">
            More Items you may like
          </h2>
          <h1 className="text-slate-500 text-5xl md:text-8xl mb-[40px] mt-[20px]">
            Don't look back
          </h1>
          <Splide
            options={{
              rewind: true,
              drag: true,
              width: 1200,
              gap: 10,
              perPage: 4,
              breakpoints: {
                576: {
                  perPage: 2, // Change the number of slides per page at the sm breakpoint
                  width: 350, // Adjust the width for sm screens
                  gap: 3, // Adjust the gap for sm screens
                },
                768: {
                  perPage: 3, // Change the number of slides per page at the md breakpoint
                  width: 710, // Adjust the width for md screens
                  gap: "1.5rem", // Adjust the gap for md screens
                },
                1024: {
                  perPage: 3, // Change the number of slides per page at the lg breakpoint
                  width: 750, // Adjust the width for lg screens
                  gap: "0.6rem", // Adjust the gap for lg screens
                },
              },
            }}
            aria-label="My Favorite Images"
          >
            {getProducts &&
              getProducts.map((product) => (
                <SplideSlide key={product.id}>
                  <Card
                    hoverable
                    className="w-[150px] md:w-[200px] lg:w-[180px] xl:w-[280px]  overflow-hidden "
                    cover={
                      <div
                      className="h-52 md:h-60 lg:h-72 overflow-hidden"
                        onClick={() => viewDetail(product.id)}
                      >
                        <img
                          alt="example"
                          src={configImage.image_path + product.image_1}
                          className="hover:scale-125 duration-300 ease-in-out  object-cover"
                        />
                      </div>
                    }
                  >
                    <Button
                      type="text"
                      shape="circle"
                      onClick={() => addToWishlist(product.id)}
                      // icon={
                      //   isProductInWishlist(product.id) ? (
                      //     <HeartFilled style={{ fontSize: "24px", color: "green" }} />
                      //   ) : (
                      //     <HeartOutlined style={{ fontSize: "24px" }} />
                      //   )
                      // }
                      className="absolute top-5 right-5 text-gray-600 font-bold hover:scale-110"
                    />

                    <Meta
                      title={product.name}
                      description="www.instagram.com "
                    />
                    <div className="mt-2">
                      <p className="text-lg font-semibold text-red-600">
                        ${product.price}
                      </p>
                      <button
                        className="bg-BgBtn hover:bg-BgBtnHover text-white px-4 py-2 rounded-xl mt-2"
                        onClick={() => addToCart(product.id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </Card>
                </SplideSlide>
              ))}
          </Splide>
        </div>

        {/* partner */}
        <div className="my-[80px]">
          <div className=" text-center text-slate-500 text-lg font-bold font-['Roboto'] leading-normal mb-[16px] ">
            AWESOME PRODUCT
          </div>
          <div className=" text-center text-BgBtn text-[40px] font-extrabold font-['Roboto'] leading-[50px] mb-[64px]">
            Trusted by over 2,000,000+
            <br />
            Web Developers
          </div>
          <Row gutter={[5,20]} className="grayscale ">
            <Col xs={12} md={8} lg={4}>
              <img
                src={rog}
                alt="rog"
                className="w-[80%] hover:drop-shadow-2xl duration-300 hover:scale-110"
              />
            </Col>
            <Col xs={12} md={8} lg={4}>
              <img
                src={msi}
                alt="msi"
                className="w-[80%] hover:drop-shadow-2xl duration-300 hover:scale-110"
              />
            </Col>
            <Col xs={12} md={8} lg={4}>
              <img
                src={dell}
                alt="dell"
                className="w-[80%] hover:drop-shadow-2xl duration-300 hover:scale-110"
              />
            </Col>
            <Col xs={12} md={8} lg={4}>
              <img
                src={Asus}
                alt="Asus"
                className="w-[80%] hover:drop-shadow-2xl duration-300 hover:scale-110"
              />
            </Col>
            <Col xs={12} md={8} lg={4}>
              <img
                src={aorus}
                alt="aorus"
                className="w-[80%] hover:drop-shadow-2xl duration-300 hover:scale-110"
              />
            </Col>
            <Col xs={12} md={8} lg={4}>
              <img
                src={razer}
                alt="razer"
                className="w-[80%] hover:drop-shadow-2xl duration-300 hover:scale-110"
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
