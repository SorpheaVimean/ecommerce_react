import {useEffect, useState} from "react";
import {  Card, message, Empty, Space } from "antd";
import Meta from "antd/es/card/Meta";
import { request } from "../../share/request";
import { configImage, getUser } from "../../share/help";
import { Link } from "react-router-dom";
import wish from "../../img/wish.jpg";
const Wishlistpage = () => {
  const user = getUser();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);



  useEffect(() => {
    getList();
  }, []);

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
  return (
    <div>
       <div
        className="text-5xl text-white md:text-8xl font-extrabold bg-cover bg-center relative h-28 md:h-52 flex justify-center items-center "
        style={{ backgroundImage: `url(${wish})` }}
      >
      Your Favorite
      </div>

      {/* Product */}
      <div className="  mx-[20px] xs:mx-[30px] xl:mx-[70px]">
        <h1 className="text-4xl  m-10"> Total Wishlist: {totalRecord} </h1>
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
