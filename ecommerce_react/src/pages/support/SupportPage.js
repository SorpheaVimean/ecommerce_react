import React from "react";
// import logos from "./background.png";
import tech from "../../img/web.jpg";
// import about from "./aboutus.png";
import { HeatMapOutlined } from "@ant-design/icons";

const SupportPage = () => {
  return (
    <div>
      <div
        className="text-5xl text-white md:text-8xl font-extrabold bg-cover bg-center relative h-28 md:h-52 flex justify-center items-center "
        style={{ backgroundImage: `url(${tech})` }}
      >
        How can we help?
      </div>

      <div className="mx-[20px] xs:mx-[30px] xl:mx-[70px] flex flex-col justify-center mt-20 ">
        <div className="text-3xl text-center mb-10 font-bold">Help Desk</div>
        <div className=" flex justify-evenly items-center flex-col lg:flex-row ">
           <div className=" flex justify-center items-center   ">
           <div className=" w-[350px] bg-gray-200 p-10 flex flex-col  justify-center items-center gap-5 mb-10">
           <HeatMapOutlined className="text-7xl text-BgBtn" />
          <div className="text-2xl font-bold">Getting Started</div>
          <div className="text-center text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit
            quisquam corporis deleniti.
          </div>
        </div>
        </div>
        <div className=" flex justify-center items-center">
           <div className=" w-[350px] bg-gray-200 p-10 flex flex-col justify-center items-center gap-5 mb-10">
           <HeatMapOutlined className="text-7xl text-BgBtn" />
          <div className="text-2xl font-bold">Getting Started</div>
          <div className="text-center text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit
            quisquam corporis deleniti.
          </div>
        </div>
        </div>
        <div className=" flex justify-center items-center">
           <div className=" w-[350px] bg-gray-200 p-10 flex flex-col justify-center items-center gap-5 mb-10">
           <HeatMapOutlined className="text-7xl text-BgBtn" />
          <div className="text-2xl font-bold">Getting Started</div>
          <div className="text-center text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit
            quisquam corporis deleniti.
          </div>
        </div>
        </div>
        </div>
       
       
      </div>
    </div>
  );
};

export default SupportPage;
