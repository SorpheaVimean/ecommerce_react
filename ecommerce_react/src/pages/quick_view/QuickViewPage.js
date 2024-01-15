import { Button, Col, Row } from "antd";
import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  Splide,
  SplideSlide,
  SplideTrack,
  arrows,
} from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "@splidejs/react-splide/css/skyblue";
// import "@splidejs/react-splide/css/sea-green";
import pic from "./img/head1.png";
import aorus from "./img/aorus.png";
const QuickViewPage = () => {
  const imgs = useMemo(
    () => [
      { id: 0, value: "https://wallpaperaccess.com/full/2637581.jpg" },
      { id: 1, value: "https://source.unsplash.com/user/c_v_r/1900x800" },
      { id: 2, value: "https://source.unsplash.com/user/c_v_r/100x100" },
      { id: 3, value: "https://wallpaperaccess.com/full/2637581.jpg" },
      { id: 4, value: "https://wallpaperaccess.com/full/2637581.jpg" },
    ],
    []
  );

  const [slider, setSlider] = useState(imgs[0]);
  const onClickChange = (index) => {
    console.log(index);
    const slider = imgs[index];
    setSlider(slider);
  };
  const splideRef = useRef(null);

  return (
    <div className="  mx-[20px] xs:mx-[30px] xl:mx-[70px]">
      <div className=" grid grid-cols-1 md:grid-cols-2 my-24 mx-0 ">
        <div className="flex justify-start items-center  flex-col gap-5">
          <Splide
            options={{
              type: "fade",
              rewind: false,
              pagination: false,
              arrows: false,
              fixedWidth: 500,
              fixedHeight: 500,
              breakpoints: {
                576: {
                  fixedWidth: 300,
                  fixedHeight: 300,
                },
                768: {
                  fixedWidth: 300,
                  fixedHeight: 300,
                },
                1024: {
                  fixedWidth: 390,
                  fixedHeight: 300,
                },
              },
            }}
          >
            <SplideSlide>
              <img
                src={slider.value}
                alt=""
                className="w-full h-full rounded-lg object-cover transition duration-300 ease-in-out"
              />
            </SplideSlide>
          </Splide>
          <Splide
            options={{
              fixedWidth: 100,
              fixedHeight: 60,
              gap: 10,
              rewind: true,
              pagination: false,
              isNavigation: true,
              breakpoints: {
                576: {
                  fixedWidth: 60,
                  fixedHeight: 40,
                },
                768: {
                  fixedWidth: 100,
                  fixedHeight: 100,
                },
                1024: {
                  fixedWidth: 70,
                  fixedHeight: 60,
                },
              },

              arrows: false,
            }}
          >
          
            {imgs.map((data, i) => (
              <SplideSlide>
                <img
                  key={data.id}
                  src={data.value}
                  alt=""
                  onClick={() => onClickChange(i)}
                  className="w-full h-full object-cover rounded-lg  "
                />
              </SplideSlide>
            ))}
          </Splide>
        </div>
        <div className="  flex justify-start items-start flex-col gap-5">
          <h1 className="text-4xl font-bold">ROG ROG ROG ROG</h1>
          <h3 className="text-2xl mb-1">Category : Laptop</h3>
          <h2 className="text-xl ">Product Detail</h2>
          <p>
            • Intel Core i7-10700F • Intel H410 • WHITE • NVIDIA MSI GeForce RTX
            2060 SUPER 8GB AERO ITX GDDR6 • SO-DIMM 16GB (16GB x 1) DDR4 2666MHz
            • 2 total slots (64GB Max) • 512GB (1 x 512GB) M.2 NVMe PCIe GEN3x4
            SSD 2TB (2.5) 5400RPM • Gaming Keyboard GK30 + Gaming Mouse GM11 •
            3.5 HDD (0/0), 2.5 HDD/SSD(1/0), M.2 (1/0) • Intel WGI219Vethernet
            (10/100/1000M) • AX200 (WIFI 6)+BT5.1 • PSU 330W • Fan Cooler
          </p>
          <p className="text-rose-700 text-5xl mb-5">$ 122</p>
          <div className="flex justify-center items-center gap-5">
            <button class="w-40 h-12 bg-BgBtn cursor-pointer rounded-3xl border-2 border-BgBtnHover shadow-[inset_0px_-2px_0px_1px_#01cc7a] group hover:bg-BgBtnHover transition duration-300 ease-in-out">
              <span class="font-medium text-[#333] group-hover:text-white">
                ADD TO CART
              </span>
            </button>
            <button class="w-40 h-12 bg-white cursor-pointer rounded-3xl border-2 border-BgBtnHover shadow-[inset_0px_-2px_0px_1px_#01cc7a] group hover:bg-BgBtnHover transition duration-300 ease-in-out">
              <span class="font-medium text-[#333] group-hover:text-white">
                ADD TO WHILIST
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewPage;
