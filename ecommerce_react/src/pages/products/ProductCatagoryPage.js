import { useEffect, useState } from "react";
import bg from "../../img/banner1.png";
import { Button, Card, Input, Pagination, Select, Space, message } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import head1 from "../../img/head1.png";
import Meta from "antd/es/card/Meta";
import { request } from "../../share/request";
import { configImage, getUser, isLogin } from "../../share/help";
import { useParams } from "react-router-dom";

// Icon from react icon
import { IoIosLaptop } from "react-icons/io";
import { IoHardwareChipOutline } from "react-icons/io5";
import { FaRegKeyboard } from "react-icons/fa";
import { AiOutlineUsb } from "react-icons/ai";

const ProductCategoryPage = () => {
  const { category} = useParams();
  const { Option } = Select;
  const user = getUser();
  const [isHovered, setIsHovered] = useState(false);
  const [isFilled, setIsFilled] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Id, setId] = useState(null);
  const [list, setList] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [objFilter, setObjFilter] = useState({
    page: 1,
    txtSearch: "",
    categorySearch: category,
  });
  const { page, txtSearch, categorySearch } = objFilter;

  useEffect(() => {
    getList(objFilter);
    getListWishlist();
  }, [objFilter]);
  const getList = async (parameter = {}) => {
    setLoading(true);
    // Adjust the URL parameter here
    var param = "?page=" + (parameter.page || 1);
    // param += "/category/" + category;
    param += "&txtSearch=" + (parameter.txtSearch || "");
    param += "&categoryId=" + parameter.categorySearch;
    const res = await request("product" + param, "get");
    setTimeout(() => {
      setLoading(false);
    }, 300);

    if (res) {
      setList(res.list);

      setCategories(res.list_category);
      if (res.totalRecord.length > 0) {
        setTotalRecord(res.totalRecord[0].total);
      }
    }
  };

  const viewDetail = (productId) => {
    window.location.href = `/quickview/${productId}`;
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
      setWishlistIds((prevIds) => [...prevIds, productId]);
    }
  }
  };

  const getListWishlist = async () => {
    const params = user.id;
    const res = await request("wishlist/" + params, "get");
    if (res) {
      setWishlistIds(res.list);
      console.log("ProductIDDDDDDDDDDDDD", setWishlistIds);
    }
  };
  const isProductInWishlist = (productId) => {
    const compare = wishlistIds.some((item) => item.product_id === productId);
  };
  const redirectToCategory = (categoryId) => {
    window.location.href = `${categoryId}`;
  };

  const handleCategoryClick = (categoryId) => {
    redirectToCategory(categoryId);
  };
  return (
    <div>
      <div className="relative flex justify-center   overflow-hidden">

        <svg
          id="wave"
          className="min-w-[1000px] w-full rotate-180  h-auto"
          viewBox="0 0 1440 260"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
              <stop stop-color="rgba(134, 167, 137, 1)" offset="0%"></stop>
              <stop stop-color="rgba(134, 167, 137, 1)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path
  
            fill="url(#sw-gradient-0)"
            d="M0,234L120,203.7C240,173,480,113,720,112.7C960,113,1200,173,1440,173.3C1680,173,1920,113,2160,108.3C2400,104,2640,156,2880,186.3C3120,217,3360,225,3600,229.7C3840,234,4080,234,4320,221C4560,208,4800,182,5040,164.7C5280,147,5520,139,5760,143C6000,147,6240,165,6480,143C6720,121,6960,61,7200,30.3C7440,0,7680,0,7920,13C8160,26,8400,52,8640,73.7C8880,95,9120,113,9360,138.7C9600,165,9840,199,10080,177.7C10320,156,10560,78,10800,73.7C11040,69,11280,139,11520,147.3C11760,156,12000,104,12240,78C12480,52,12720,52,12960,56.3C13200,61,13440,69,13680,73.7C13920,78,14160,78,14400,73.7C14640,69,14880,61,15120,82.3C15360,104,15600,156,15840,147.3C16080,139,16320,69,16560,43.3C16800,17,17040,35,17160,43.3L17280,52L17280,260L17160,260C17040,260,16800,260,16560,260C16320,260,16080,260,15840,260C15600,260,15360,260,15120,260C14880,260,14640,260,14400,260C14160,260,13920,260,13680,260C13440,260,13200,260,12960,260C12720,260,12480,260,12240,260C12000,260,11760,260,11520,260C11280,260,11040,260,10800,260C10560,260,10320,260,10080,260C9840,260,9600,260,9360,260C9120,260,8880,260,8640,260C8400,260,8160,260,7920,260C7680,260,7440,260,7200,260C6960,260,6720,260,6480,260C6240,260,6000,260,5760,260C5520,260,5280,260,5040,260C4800,260,4560,260,4320,260C4080,260,3840,260,3600,260C3360,260,3120,260,2880,260C2640,260,2400,260,2160,260C1920,260,1680,260,1440,260C1200,260,960,260,720,260C480,260,240,260,120,260L0,260Z"
          ></path>
        </svg>
        {/* <svg
          id="wave"
          className="min-w-[1000px] w-full rotate-180  h-auto"
          viewBox="0 0 1440 220"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
              <stop stop-color="rgba(178, 200, 186, 1)" offset="0%"></stop>
              <stop stop-color="rgba(134, 167, 137, 1)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path
            fill="url(#sw-gradient-0)"
            d="M0,176L80,154C160,132,320,88,480,80.7C640,73,800,103,960,99C1120,95,1280,59,1440,55C1600,51,1760,81,1920,80.7C2080,81,2240,51,2400,36.7C2560,22,2720,22,2880,47.7C3040,73,3200,125,3360,135.7C3520,147,3680,117,3840,110C4000,103,4160,117,4320,102.7C4480,88,4640,44,4800,33C4960,22,5120,44,5280,69.7C5440,95,5600,125,5760,135.7C5920,147,6080,139,6240,139.3C6400,139,6560,147,6720,124.7C6880,103,7040,51,7200,29.3C7360,7,7520,15,7680,14.7C7840,15,8000,7,8160,22C8320,37,8480,73,8640,91.7C8800,110,8960,110,9120,95.3C9280,81,9440,51,9600,47.7C9760,44,9920,66,10080,66C10240,66,10400,44,10560,44C10720,44,10880,66,11040,77C11200,88,11360,88,11440,88L11520,88L11520,220L11440,220C11360,220,11200,220,11040,220C10880,220,10720,220,10560,220C10400,220,10240,220,10080,220C9920,220,9760,220,9600,220C9440,220,9280,220,9120,220C8960,220,8800,220,8640,220C8480,220,8320,220,8160,220C8000,220,7840,220,7680,220C7520,220,7360,220,7200,220C7040,220,6880,220,6720,220C6560,220,6400,220,6240,220C6080,220,5920,220,5760,220C5600,220,5440,220,5280,220C5120,220,4960,220,4800,220C4640,220,4480,220,4320,220C4160,220,4000,220,3840,220C3680,220,3520,220,3360,220C3200,220,3040,220,2880,220C2720,220,2560,220,2400,220C2240,220,2080,220,1920,220C1760,220,1600,220,1440,220C1280,220,1120,220,960,220C800,220,640,220,480,220C320,220,160,220,80,220L0,220Z"
          ></path>
        </svg> */}

        <div className=" absolute text-white ml-10 pt-3 md:pt-26 lg:pt-16  text-3xl md:text-4xl">
          <p className=" font-medium text-center">SHOP  </p>
          <p>BY CATEGORIES </p>
        </div>
      </div>
   
      <div className="bg-white rounded-xl z-10  text-white py-5 flex justify-center items-center gap-4 md:gap-16 lg:gap-24 px-10 m-1 cursor-pointer">
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
      {/* Product */}
      <div className="  mx-[20px] xs:mx-[30px] xl:mx-[70px]">

          <h1 className="text-3xl font-bold text-center m-10">New Arrivals </h1>
         

        <div className="flex gap-5 flex-wrap justify-center">
          {list.map((product) => (
            <Card
              hoverable
              className="w-[150px] md:w-[200px] lg:w-[180px] xl:w-[280px]  overflow-hidden "
              cover={
                <div
                  className="h-72 overflow-hidden"
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
                icon={
                  isProductInWishlist(product.id) ? (
                    <HeartFilled style={{ fontSize: "24px", color: "green" }} />
                  ) : (
                    <HeartOutlined style={{ fontSize: "24px" }} />
                  )
                }
                className="absolute top-5 right-5 text-gray-600 font-bold hover:scale-110"
              />

              <Meta title={product.name} description="www.instagram.com " />
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
          ))}
        </div>
      </div>

      <Pagination
        className="text-end m-10"
        current={page}
        total={totalRecord}
        pageSize={18}
        onChange={(page, pageSize) => {
          setObjFilter({
            ...objFilter,
            page: page,
          });
        }}
      />

    </div>
  );
};

export default ProductCategoryPage;
