import React, { useEffect, useState } from "react";
import { configImage, formatDateClient, formatPrice, getUser } from "../../share/help";
import { request } from "../../share/request";
import { Descriptions, Empty, Image, Modal, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { Btncompo } from "../../components/buttons/Buttons";
import {FileImageOutlined} from "@ant-design/icons";

const OrderPage = () => {
  const user = getUser();
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [getSumQty, setGetSumQty] = useState(0);
  const [getSum, setGetSum] = useState(0);
  const [listOrderDetail, setListOrderDetail] = useState([]);
  const [loading, setLoadin] = useState(false);



  useEffect(() => {
    getlist();
  }, []);

  const getlist = async () => {
    const params = user.id;
    const res = await request("order/" + params, "GET");
    console.log(res);
    console.log("CusomerIDDDDDD:",params);
    if (res) {
      setList(res.list);
      console.log(res.list);
    }
  };

  const onClickView = async (value) => {
    const getID = value;
    setOpen(true);
    setLoadin(true);
    const res = await request("orderDetail/" + getID, "GET");
    setLoadin(false);
    if (res) {
      setListOrderDetail(res.list);
      if (res.getTotal.length > 0) {
        setGetSum(res.getTotal[0].subtotal);
        setGetSumQty(res.getTotal[0].Quantity);
      }
    }
  };
  const onClose = () => {
    setOpen(false);
  };
  // const items = [
  //   {
  //     key: "1",
  //     label: "InVoice No",
  //     children: list.invoice_no,
  //     //   span: 2,
  //   },
  //   {
  //     key: "1",
  //     label: "First Name",
  //     children: list.firstname,
  //     //   span: 2,
  //   },
  //   {
  //     key: "2",
  //     label: "Last name",
  //     children: list.lastname,
  //   },
  //   {
  //     key: "3",
  //     label: "Phone Number",
  //     children: list.tel,
  //   },
  //   {
  //     key: "4",
  //     label: "Address",
  //     children: list.customer_address,
  //   },
  //   {
  //     key: "5",
  //     label: "Payment Method",
  //     children: list.payment_method_id,
  //   },
  //   {
  //     key: "5",
  //     label: "Phone Number",
  //     children: list ? list.order_total : null,
  //   },
  //   {
  //     key: "5",
  //     label: "Comment",
  //     children: list.comment,
  //   },
  //   {
  //     key: "7",
  //     label: "Paid",
  //     children: list ? (
  //       list.is_paid === 1 ? (
  //         <Tag bordered={false} color="success">
  //           Paid
  //         </Tag>
  //       ) : (
  //         <Tag bordered={false} color="error">
  //           Not yet Paid
  //         </Tag>
  //       )
  //     ) : null,
  //   },
  //   {
  //     key: "5",
  //     label: "Status",
  //     children: list ? (
  //       <>
  //         {list.statusName === "Pending" && (
  //           <Tag bordered={false} color="processing">
  //             Pending
  //           </Tag>
  //         )}
  //         {list.statusName === "Packed" && (
  //           <Tag bordered={false} color="success">
  //             Packed
  //           </Tag>
  //         )}
  //         {list.statusName === "Shipped" && (
  //           <Tag bordered={false} color="warning">
  //             Shipped
  //           </Tag>
  //         )}
  //         {list.statusName === "Delivered" && (
  //           <Tag bordered={false} color="magenta">
  //             Delivered
  //           </Tag>
  //         )}
  //         {list.statusName === "Store_pick_up" && (
  //           <Tag bordered={false} color="orange">
  //             Store_pick_up
  //           </Tag>
  //         )}
  //         {list.statusName === "Canceled" && (
  //           <Tag bordered={false} color="error">
  //             Canceled
  //           </Tag>
  //         )}
  //       </>
  //     ) : null,
  //   },
  //   {
  //     key: "5",
  //     label: "Message",
  //     children: list.message,
  //   },
  //   {
  //     key: "5",
  //     label: "created At",
  //     children: list ? formatDateClient(list.create_at) : null,
  //   },
  // ];
  const columnDetail = [
    {
      key: "order_id",
      title: "order_id",
      dataIndex: "order_id",
      fixed: "left",
      width: 100,
    },
    {
      key: "ImageAndPName",
      title: "Product",
      render: (value, rows, index) => {
        return (
          <div className="flex items-top">
            {value.Image !== null && value.Image !== "" ? (
              <Image
                key={index}
                src={configImage.image_path + value.Image}
                width={60}
                className="rounded-lg align-middle"
                alt=""
              />
            ) : (
              <div className="flex justify-start items-center">
                <FileImageOutlined className="text-4xl" />
              </div>
            )}
            <span className="ml-2">{value.PName}</span>
          </div>
        );
      },
    },
    {
      key: "quantity",
      title: "quantity",
      dataIndex: "quantity",
    },
    {
      key: "price",
      title: "Price",
      dataIndex: "price",
      render: value => (
        <span className="text-red-500">${formatPrice(value)}</span>
      )
    },
    {
      key: "discount",
      title: "discount",
      dataIndex: "discount",
    },
  ];
  return (
    <div>
      <div className="text-center text-3xl font-bold p-5">Your Orders</div>
      <div className=" flex justify-around items-center">
        {list.length > 0 ? (
          list.map((order, index) => (

            <div key={index} className="p-5">
              <Descriptions title={`Order ${index + 1}`} bordered column={1}>
                <Descriptions.Item label="Invoice No">
                  {order.invoice_no}
                </Descriptions.Item>
                <Descriptions.Item label="First Name">
                  {order.firstname}
                </Descriptions.Item>
                <Descriptions.Item label="Last Name">
                  {order.lastname}
                </Descriptions.Item>
                <Descriptions.Item label="Phone Number">
                  {order.tel}
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                  {order.customer_address}
                </Descriptions.Item>
                <Descriptions.Item label="Payment Method">
                  {order.payment_method_id}
                </Descriptions.Item>
                <Descriptions.Item label="Order Total">
                 $ {order.order_total}
                </Descriptions.Item>
                <Descriptions.Item label="Comment">
                  {order.comment}
                </Descriptions.Item>
                <Descriptions.Item label="Paid">
                  {order.is_paid === 1 ? (
                    <Tag bordered={false} color="success">
                      Paid
                    </Tag>
                  ) : (
                    <Tag bordered={false} color="error">
                      Not yet Paid
                    </Tag>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  {order ? (
                    <>
                      {order.order_status_id === 1 && (
                        <Tag bordered={false} color="processing">
                          Pending
                        </Tag>
                      )}
                      {order.order_status_id === 2 && (
                        <Tag bordered={false} color="success">
                          Packed
                        </Tag>
                      )}
                      {order.order_status_id === 3 && (
                        <Tag bordered={false} color="warning">
                          Shipped
                        </Tag>
                      )}
                      {order.order_status_id === 4 && (
                        <Tag bordered={false} color="magenta">
                          Delivered
                        </Tag>
                      )}
                      {order.order_status_id === 5 && (
                        <Tag bordered={false} color="orange">
                          Store_pick_up
                        </Tag>
                      )}
                      {order.order_status_id === 6 && (
                        <Tag bordered={false} color="error">
                          Canceled
                        </Tag>
                      )}
                    </>
                  ) : null}
                </Descriptions.Item>
                <Descriptions.Item label="Message">
                  {order.Message}
                </Descriptions.Item>
                <Descriptions.Item label="Order At">
                  {formatDateClient(order.create_at)}
                </Descriptions.Item>
               
              </Descriptions>
              <Btncompo type="primary" label="view Order Detail" onClick={()=>onClickView(order.id)}/>
              
            </div>
          ))
        ) : (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 120,
            }}
            description={
              <span>
                No Wishlist{" "}
                <Link to={"/product"} className="text-blue-400">
                  Continue Shopping
                </Link>
              </span>
            }
            className="mb-10"
          />
        )}
      </div>
       {/* order Detail */}
       <Modal
        open={open}
        title={ "Order Detail"}
        onCancel={onClose}
        footer={null}
        maskClosable={false}
        width={800}
      >
        <Table
          dataSource={listOrderDetail}
          columns={columnDetail}
          pagination={false} 
        />
        
        <div className=" flex items-center justify-around mt-5">
          <div className=" text-xl font-semibold">
            Order Summary
          </div>
          <div className="flex justify-between items-center">
          <Space>
        

            
            </Space>
            <div className="mr-28 font-bold">
              {/* <div className="">Total orders: {getSum}</div>
              <div className="">Total orders: {getSumQty}</div> */}
              
              
              <p>Total Quantity:</p>
              <p>Discount:</p>
              <p>Discount price:</p>
              <p>Total Price:</p>
            </div>
            <div className="flex flex-col gap-5">
           
            <div>
              <p> {getSumQty}</p>
              <p> -</p>
              <p> -</p>
              <p className="text-red-500">${formatPrice(getSum)}</p>

              {/* <p> {order.total}</p> */}
            </div>
          
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OrderPage;
