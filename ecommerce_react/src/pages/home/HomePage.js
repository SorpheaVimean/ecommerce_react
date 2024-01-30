import React, { useState, useEffect } from "react";
import HeroPage from "./hero/HeroPage";
import banner1 from "../../img/banner1.png";
import banner2 from "../../img/banner2.png";
import head1 from "./head1.png";
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

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

import { Button, Card, Col, Row, Tooltip } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
const { Meta } = Card;
const HomePage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [perPage, setPerPage] = useState(4);
  const [gap, setGap] = useState(4);
  const [width, setWidth] = useState(1090);
  const handleHeartClick = () => {
    setIsFilled(!isFilled);
  };

  // useEffect(() => {
  //   // Update perPage based on screen size
  //   const updatePerPage = () => {
  //     const screenWidth = window.innerWidth;
  //     setPerPage(screenWidth < 640 ? 2 : 4);
  //     setGap(screenWidth < 640 ? 2 : 4);
  //     setWidth(screenWidth < 640 ? 900 : 1090);
  //   };

  //   // Call updatePerPage on mount and window resize
  //   updatePerPage();
  //   window.addEventListener("resize", updatePerPage);

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("resize", updatePerPage);
  //   };
  // }, []); // Run this effect only once on mount

  return (
    <div>
      <HeroPage className="z-0" />
      <div className=" flex justify-center mt-[-20px] md:mt-[-50px] z-10 items-center ">
        <div className="bg-white rounded-xl z-10  text-white py-5 flex justify-center items-center gap-4 md:gap-16 lg:gap-24 px-10 cursor-pointer">
          <div className=" flex flex-col justify-center items-center text-BgBtn hover:text-BgBtnHover  hover:scale-105 duration-300 ease-in-out ">
             <IoIosLaptop  className="text-2xl  md:text-5xl  lg:text-7xl"/>
             <p className="text-xs">LAPTOP</p>
             
          </div>
             <div className=" flex flex-col justify-center items-center text-BgBtn hover:text-BgBtnHover hover:scale-105 duration-300 ease-in-out">
             <IoHardwareChipOutline className="text-2xl md:text-5xl lg:text-7xl"/>
             <p className="text-xs">PC HARDWARE</p>
             
             </div>
             <div className=" flex flex-col justify-center items-center text-BgBtn hover:text-BgBtnHover hover:scale-105 duration-300 ease-in-out">
             <FaRegKeyboard className="text-2xl md:text-5xl lg:text-7xl"/>
             <p className="text-xs">PERIPHARALS</p>
             
             </div>
       <div className=" flex flex-col justify-center items-center text-BgBtn hover:text-BgBtnHover hover:scale-105 duration-300 ease-in-out">
       <AiOutlineUsb className="text-2xl md:text-5xl lg:text-7xl"/>
       <p className="text-xs">ACCESSORIES</p>
       
       </div>
        </div>
      </div>

      <div className="  mx-[20px] xs:mx-[30px] xl:mx-[70px]">
        {/* New Collection */}

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
            <SplideSlide>
              <Card
                hoverable
                className="w-[155px] md:w-[230px] lg:w-[180px] xl:w-[280px]  "
                cover={
                  <img
                    alt="example"
                    src={head1}
                    className="hover:scale-125 duration-300 ease-in-out overflow-hidden"
                  />
                }
              >
                <Button
                  type="text"
                  shape="circle"
                  icon={
                    isFilled ? (
                      <HeartFilled
                        style={{ fontSize: "24px", color: "green" }}
                      />
                    ) : (
                      <HeartOutlined style={{ fontSize: "24px" }} />
                    )
                  }
                  className={`absolute top-5 right-5 text-gray-600 font-bold hover:scale-110 ${
                    isFilled ? "text-green-500" : ""
                  }`}
                  onClick={handleHeartClick}
                />
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com "
                />
                <div className="mt-2">
                  <p className="text-lg font-semibold text-red-600">$19.99</p>
                  <button className="bg-BgBtn hover:bg-BgBtnHover text-white px-4 py-2 rounded-xl mt-2">
                    Add to Cart
                  </button>
                </div>
              </Card>
            </SplideSlide>
            <SplideSlide>
              <Card
                hoverable
                className="w-[155px] md:w-[230px] lg:w-[180px] xl:w-[280px]  "
                cover={
                  <img
                    alt="example"
                    src={head1}
                    className="hover:scale-125 duration-300 ease-in-out overflow-hidden"
                  />
                }
              >
                <Button
                  type="text"
                  shape="circle"
                  icon={
                    isFilled ? (
                      <HeartFilled
                        style={{ fontSize: "24px", color: "green" }}
                      />
                    ) : (
                      <HeartOutlined style={{ fontSize: "24px" }} />
                    )
                  }
                  className={`absolute top-5 right-5 text-gray-600 font-bold hover:scale-110 ${
                    isFilled ? "text-green-500" : ""
                  }`}
                  onClick={handleHeartClick}
                />
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com "
                />
                <div className="mt-2">
                  <p className="text-lg font-semibold text-red-600">$19.99</p>
                  <button className="bg-BgBtn hover:bg-BgBtnHover text-white px-4 py-2 rounded-xl mt-2">
                    Add to Cart
                  </button>
                </div>
              </Card>
            </SplideSlide>
            <SplideSlide>
              <Card
                hoverable
                className="w-[155px] md:w-[230px] lg:w-[180px] xl:w-[280px]  "
                cover={
                  <img
                    alt="example"
                    src={head1}
                    className="hover:scale-125 duration-300 ease-in-out overflow-hidden"
                  />
                }
              >
                <Button
                  type="text"
                  shape="circle"
                  icon={
                    isFilled ? (
                      <HeartFilled
                        style={{ fontSize: "24px", color: "green" }}
                      />
                    ) : (
                      <HeartOutlined style={{ fontSize: "24px" }} />
                    )
                  }
                  className={`absolute top-5 right-5 text-gray-600 font-bold hover:scale-110 ${
                    isFilled ? "text-green-500" : ""
                  }`}
                  onClick={handleHeartClick}
                />
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com "
                />
                <div className="mt-2">
                  <p className="text-lg font-semibold text-red-600">$19.99</p>
                  <button className="bg-BgBtn hover:bg-BgBtnHover text-white px-4 py-2 rounded-xl mt-2">
                    Add to Cart
                  </button>
                </div>
              </Card>
            </SplideSlide>
            <SplideSlide>
              <Card
                hoverable
                className="w-[155px] md:w-[230px] lg:w-[180px] xl:w-[280px]  "
                cover={
                  <img
                    alt="example"
                    src={head1}
                    className="hover:scale-125 duration-300 ease-in-out overflow-hidden"
                  />
                }
              >
                <Button
                  type="text"
                  shape="circle"
                  icon={
                    isFilled ? (
                      <HeartFilled
                        style={{ fontSize: "24px", color: "green" }}
                      />
                    ) : (
                      <HeartOutlined style={{ fontSize: "24px" }} />
                    )
                  }
                  className={`absolute top-5 right-5 text-gray-600 font-bold hover:scale-110 ${
                    isFilled ? "text-green-500" : ""
                  }`}
                  onClick={handleHeartClick}
                />
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com "
                />
                <div className="mt-2">
                  <p className="text-lg font-semibold text-red-600">$19.99</p>
                  <button className="bg-BgBtn hover:bg-BgBtnHover text-white px-4 py-2 rounded-xl mt-2">
                    Add to Cart
                  </button>
                </div>
              </Card>
            </SplideSlide>
            <SplideSlide>
              <Card
                hoverable
                className="w-[155px] md:w-[230px] lg:w-[180px] xl:w-[280px]  "
                cover={
                  <img
                    alt="example"
                    src={head1}
                    className="hover:scale-125 duration-300 ease-in-out overflow-hidden"
                  />
                }
              >
                <Button
                  type="text"
                  shape="circle"
                  icon={
                    isFilled ? (
                      <HeartFilled
                        style={{ fontSize: "24px", color: "green" }}
                      />
                    ) : (
                      <HeartOutlined style={{ fontSize: "24px" }} />
                    )
                  }
                  className={`absolute top-5 right-5 text-gray-600 font-bold hover:scale-110 ${
                    isFilled ? "text-green-500" : ""
                  }`}
                  onClick={handleHeartClick}
                />
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com "
                />
                <div className="mt-2">
                  <p className="text-lg font-semibold text-red-600">$19.99</p>
                  <button className="bg-BgBtn hover:bg-BgBtnHover text-white px-4 py-2 rounded-xl mt-2">
                    Add to Cart
                  </button>
                </div>
              </Card>
            </SplideSlide>
            <SplideSlide>
              <Card
                hoverable
                className="w-[155px] md:w-[230px] lg:w-[180px] xl:w-[280px]  "
                cover={
                  <img
                    alt="example"
                    src={head1}
                    className="hover:scale-125 duration-300 ease-in-out overflow-hidden"
                  />
                }
              >
                <Button
                  type="text"
                  shape="circle"
                  icon={
                    isFilled ? (
                      <HeartFilled
                        style={{ fontSize: "24px", color: "green" }}
                      />
                    ) : (
                      <HeartOutlined style={{ fontSize: "24px" }} />
                    )
                  }
                  className={`absolute top-5 right-5 text-gray-600 font-bold hover:scale-110 ${
                    isFilled ? "text-green-500" : ""
                  }`}
                  onClick={handleHeartClick}
                />
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com "
                />
                <div className="mt-2">
                  <p className="text-lg font-semibold text-red-600">$19.99</p>
                  <button className="bg-BgBtn hover:bg-BgBtnHover text-white px-4 py-2 rounded-xl mt-2">
                    Add to Cart
                  </button>
                </div>
              </Card>
            </SplideSlide>
            <SplideSlide>
              <Card
                hoverable
                className="w-[155px] md:w-[230px] lg:w-[180px] xl:w-[280px]  "
                cover={
                  <img
                    alt="example"
                    src={head1}
                    className="hover:scale-125 duration-300 ease-in-out overflow-hidden"
                  />
                }
              >
                <Button
                  type="text"
                  shape="circle"
                  icon={
                    isFilled ? (
                      <HeartFilled
                        style={{ fontSize: "24px", color: "green" }}
                      />
                    ) : (
                      <HeartOutlined style={{ fontSize: "24px" }} />
                    )
                  }
                  className={`absolute top-5 right-5 text-gray-600 font-bold hover:scale-110 ${
                    isFilled ? "text-green-500" : ""
                  }`}
                  onClick={handleHeartClick}
                />
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com "
                />
                <div className="mt-2">
                  <p className="text-lg font-semibold text-red-600">$19.99</p>
                  <button className="bg-BgBtn hover:bg-BgBtnHover text-white px-4 py-2 rounded-xl mt-2">
                    Add to Cart
                  </button>
                </div>
              </Card>
            </SplideSlide>
            <SplideSlide>
              <Card
                hoverable
                className="w-[155px] md:w-[230px] lg:w-[180px] xl:w-[280px]  "
                cover={
                  <img
                    alt="example"
                    src={head1}
                    className="hover:scale-125 duration-300 ease-in-out overflow-hidden"
                  />
                }
              >
                <Button
                  type="text"
                  shape="circle"
                  icon={
                    isFilled ? (
                      <HeartFilled
                        style={{ fontSize: "24px", color: "green" }}
                      />
                    ) : (
                      <HeartOutlined style={{ fontSize: "24px" }} />
                    )
                  }
                  className={`absolute top-5 right-5 text-gray-600 font-bold hover:scale-110 ${
                    isFilled ? "text-green-500" : ""
                  }`}
                  onClick={handleHeartClick}
                />
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com "
                />
                <div className="mt-2">
                  <p className="text-lg font-semibold text-red-600">$19.99</p>
                  <button className="bg-BgBtn hover:bg-BgBtnHover text-white px-4 py-2 rounded-xl mt-2">
                    Add to Cart
                  </button>
                </div>
              </Card>
            </SplideSlide>
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
          <Row gutter={5} className="grayscale ">
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
