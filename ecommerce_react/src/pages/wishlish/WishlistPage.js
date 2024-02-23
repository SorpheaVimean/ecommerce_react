import {useEffect, useState} from "react";
import { Button, Card, message, Empty, Space } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons"
import Meta from "antd/es/card/Meta";
import { request } from "../../share/request";
import { configImage, getUser } from "../../share/help";
import { Link } from "react-router-dom";

const Wishlistpage = () => {
  const user = getUser();
  const [isHovered, setIsHovered] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Id, setId] = useState(null);
  const [list, setList] = useState([]);
  const [category, setCategory] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [objFilter, setObjFilter] = useState({
    page: 1,
    txtSearch: "",
    categorySearch: null,
    // productStatus: null,
  });
  const { page, txtSearch, categorySearch, productStatus } = objFilter;

  useEffect(() => {
    getList(objFilter);
  }, [objFilter]);

  const getList = async () => {
    setLoading(true);
    const params = user.id;
    const res = await request("wishlist/" + params, "get");
      setLoading(false);
    if (res) {
      setList(res.list);
      
      if (res.totalRecord.length > 0) {
        setTotalRecord(res.totalRecord[0].total);
      }
    }
  };

  const viewDetail = () =>{
    
  }

  const addToCart = async (productId) =>{

    const params = {
      "customer_id": user.id,
      "product_id": productId
    }
   
  const res = await request("cart",  "POST", params);
  if (res) {
    message.success(res.message);
  }
  }

  const deletewishlist = async (wishlistID) => {
    const param = {
      id: wishlistID,
    };
    console.log(wishlistID);
    const res = await request("wishlist", "delete", param);
    console.log(res);

    if (res) {
      getList();
      message.success(res.message);
    }
  };
  const handleHeartClick = () => {
    setIsFilled(!isFilled);
  };
  return (
    <div>
      <div className="relative flex justify-start   overflow-hidden">
        <svg
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
        </svg>

    

        <div className="absolute text-white ml-10 pt-3 md:pt-26 lg:pt-16  text-3xl md:text-4xl">
          <p className="text-BgBtn font-medium">Enjoy your </p>
          <p>favorite Items </p>
        </div>

      </div>

      {/* Product */}
      <div className="  mx-[20px] xs:mx-[30px] xl:mx-[70px]">
        <h1>New Arrivals </h1>
        <div className="flex gap-5 flex-wrap justify-center">
  {list.length > 0 ? (
    list.map((product) => (
      <Card
        key={product.id} // Ensure each Card component has a unique key
        hoverable
        className="w-[150px] md:w-[200px] lg:w-[180px] xl:w-[280px]  overflow-hidden mb-10 "
        cover={
          <div  className="h-52 md:h-60 lg:h-72 overflow-hidden" onClick={() => viewDetail(product.id)}>
            <img
              alt="example"
              src={configImage.image_path + product.image_1}
              className="hover:scale-125 duration-300 ease-in-out  object-cover"
            />
          </div>
        }
      >
        <Meta title={product.name} description="www.instagram.com " />

        <div className="mt-2  ">
          <p className="text-lg font-semibold text-red-600">${product.price}</p>
          <Space className="flex flex-col lg:flex-row">
          <button className="bg-BgBtn hover:bg-BgBtnHover text-white px-4 py-2 rounded-xl mt-2" onClick={() => addToCart(product.id)}>
            Add to Cart
          </button>
          <button className="bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded-xl mt-2" onClick={() => deletewishlist(product.ID)}>
            Remove
          </button>
          </Space>
         
        </div>
      </Card>
    ))
  ) : (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 120,
      }}
      description={<span>No Wishlist <Link to={"/product"} className="text-blue-400" >Continue Shopping</Link></span>}
      className="mb-10"
    />
  )}
</div>

        
      </div>
    </div>
  );
};

export default Wishlistpage;
