import React from "react";
import { Carousel } from "antd";
import banner1 from "./banner1.png";
import banner2 from "./banner2.png";

const HeroPage = () => {
  const contentStyle = {
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <div>
      <Carousel autoplay autoplaySpeed={5000} dotPosition="top">
        <div>
          <img
            src={banner1}
            alt="Banner 1"
            className=" w-full h-[160px] md:h-[400px] lg:h-[550px]"
            style={contentStyle}
          />
        </div>
        <div>
          <img
            src={banner2}
            alt="Banner 2"
            className=" w-full h-[160px] md:h-[400px] lg:h-[550px]"
            style={contentStyle}
          />
        </div>
        <div>
          <img
            src={banner1}
            alt="Banner 3"
            className=" w-full h-[160px] md:h-[400px] lg:h-[550px]"
            style={contentStyle}
          />
        </div>
        <div>
          <img
            src={banner2}
            alt="Banner 4"
            className=" w-full h-[160px] md:h-[400px] lg:h-[550px]"
            style={contentStyle}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default HeroPage;
