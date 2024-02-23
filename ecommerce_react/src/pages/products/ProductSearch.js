import { useEffect, useState } from "react";
import { Button, Card, Input, Pagination, Select, Space, message } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

import Meta from "antd/es/card/Meta";
import { request } from "../../share/request";
import { configImage, getUser, isLogin } from "../../share/help";
import MainPage from "../../components/layout/MainPage";

import bgSearch from "../../img/bgSearch.jpg";

const ProductSearch = () => {


  const user = getUser();

  // const [isFilled, setIsFilled] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [Id, setId] = useState(null);
  const [list, setList] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [objFilter, setObjFilter] = useState({
    page: 1,
    txtSearch: "",
  });
  const { txtSearch } = objFilter;

  useEffect(() => {
    getList(objFilter);
    getListWishlist();
  }, [objFilter]);
  const getList = async (parameter = {}) => {
    setLoading(true);
    var param = "?page=" + (parameter.page || 1);
    param += "&txtSearch=" + (parameter.txtSearch || "");
    const res = await request("product" + param, "get");
    setLoading(false);
    if (res) {
      setList(res.list);
      if (res.totalRecord.length > 0) {
        setTotalRecord(res.totalRecord[0].total);
      }
    }
  };

  const viewDetail = (productId) => {
    window.location.href = `/quickview/${productId}`;
  };

  const addToCart = async (productId) => {
    if (!isLogin()) {
      window.location.href = "/login";
    } else {
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
    if (!isLogin()) {
      window.location.href = "/login";
    } else {
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
    }
  };
  const isProductInWishlist = (productId) => {
    // const compare = wishlistIds.some(item => item.product_id === productId);
  };
  return (
    <MainPage loading={loading}>
      <div
        className="text-3xl md:text-8xl font-extrabold bg-cover bg-center relative h-28 md:h-96 flex flex-col justify-evenly items-center "
        style={{ backgroundImage: `url(${bgSearch})` }}
      >
        <div className="text-Background shadow-xl">Search your Product Here</div>
        <Input
          allowClear
          placeholder="Search your product by id or name"
          className="h-18 w-[50%] text-xl shadow-2xl"
          onChange={(event) => {
            setObjFilter({
              ...objFilter,
              txtSearch: event.target.value,
            });
          }}
        />
      </div>

      {/* Product */}
      <div className="  mx-[20px] xs:mx-[30px] xl:mx-[70px]">
        <div className=" flex justify-between mb-5">
          <h1 className="text-3xl m-10 ">Your Search: <span className="font-semibold">{txtSearch}</span> </h1>
        </div>
        <div className="flex gap-5 flex-wrap justify-center">
          {list.map((product, index) => (
            <Card
              key={index}
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
        defaultCurrent={1}
        total={totalRecord}
        pageSize={18}
        onChange={(page, pageSize) => {
          setObjFilter({
            ...objFilter,
            page: page,
          });
        }}
      />
    </MainPage>
  );
};

export default ProductSearch;
