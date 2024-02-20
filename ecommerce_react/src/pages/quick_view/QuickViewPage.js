import { Button, Col, Row, message } from "antd";
import React, { useEffect, useRef, useState,  } from "react";
import { useParams } from "react-router-dom";
import {
  Splide,
  SplideSlide,
  SplideTrack,
  arrows,
} from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "@splidejs/react-splide/css/skyblue";
// import "@splidejs/react-splide/css/sea-green";
import { request } from "../../share/request";
import { configImage, getUser } from "../../share/help";
const QuickViewPage = () => {
  const user = getUser();
  const { productId } = useParams();
  const [list, setList] = useState(null);
  const [slider, setSlider] = useState(null);
  const [wishlistIds, setWishlistIds] = useState([]);
  useEffect(() => {
    getList();

   
  }, []);

  const getList = async () => {
    var param = productId;
    const res = await request("product/" + param, "get");
    console.log(res);
    if (res) {
      setList(res.list);
      
    }
  };

  const onClickChange = (image) => {
    setSlider(image);
  };
  const addToCart = async (productId) => {
    const params = {
      customer_id: user.id,
      product_id: productId,
    };

    const res = await request("cart", "POST", params);
    if (res) {
      message.success(res.message);
    }
  };

  const addToWishlist = async (productId) => {
    const params = {
      customer_id: user.id,
      product_id: productId,
    };
    const res = await request("wishlist", "POST", params);
    if (res) {
      message.success(res.message);
      setWishlistIds((prevIds) => [...prevIds, productId]);
    }
  };
  // const splideRef = useRef(null);
  return (
    <div className="  mx-[20px] xs:mx-[30px] xl:mx-[70px]">
      <div className=" grid grid-cols-1 md:grid-cols-2 my-24 mx-0 ">
      {list && list.map((product) => (
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
            <SplideSlide >
                    <img
                      src={slider === null ? configImage.image_path + product.image_1: slider}
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
          
          {Object.keys(product).map((key) =>
        key.includes("image_") ? (
          <SplideSlide key={key}>
            <img
              src={configImage.image_path + product[key]}
              alt=""
              className="w-full h-full rounded-lg object-cover transition duration-300 ease-in-out"
              onClick={() => onClickChange(configImage.image_path + product[key])}
            />
          </SplideSlide>
        ) : null
      )}
          </Splide>
        </div>
      ))}
       
        <div className="  flex justify-start items-start flex-col gap-5">
          {list && list.map((data, i) => (
            <div>

              <h1 className="text-4xl font-bold">{data.name}</h1>
              <h3 className="text-2xl mb-1">Category : {data.CName}</h3>
          <h2 className="text-xl ">Product Detail</h2>
          <p>
           {data.description}
          </p>
          <p className="text-rose-700 text-5xl mb-5">$ {data.price}</p>
            </div>
          ))}
         
        
          <div className="flex justify-center items-center gap-5">
            <button class="w-40 h-12 bg-BgBtn cursor-pointer rounded-3xl border-2 border-BgBtnHover shadow-[inset_0px_-2px_0px_1px_#01cc7a] group hover:bg-BgBtnHover transition duration-300 ease-in-out"  onClick={() => addToCart(productId)}  >
              <span class="font-medium text-[#333] group-hover:text-white">
                ADD TO CART
              </span>
            </button>
            <button class="w-40 h-12 bg-white cursor-pointer rounded-3xl border-2 border-BgBtnHover shadow-[inset_0px_-2px_0px_1px_#01cc7a] group hover:bg-BgBtnHover transition duration-300 ease-in-out" onClick={() => addToWishlist(productId)}>
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
