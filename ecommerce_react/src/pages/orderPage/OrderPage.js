import React, { useEffect, useState } from "react";
import { formatDateClient, getUser } from "../../share/help";
import { request } from "../../share/request";
import { Descriptions, Empty, Tag } from "antd";
import { Link } from "react-router-dom";
import { Btncompo } from "../../components/buttons/Buttons";

const OrderPage = () => {
  const user = getUser();
  const [list, setList] = useState([]);
  useEffect(() => {
    getlist();
  }, []);

  const getlist = async () => {
    const params = { customer_id: user.id };
    const res = await request("order/" + 4, "GET");
    console.log(res);
    console.log(params);
    if (res) {
      setList(res.list);
      console.log(res.list);
    }
  };

  const items = [
    {
      key: "1",
      label: "InVoice No",
      children: list.invoice_no,
      //   span: 2,
    },
    {
      key: "1",
      label: "First Name",
      children: list.firstname,
      //   span: 2,
    },
    {
      key: "2",
      label: "Last name",
      children: list.lastname,
    },
    {
      key: "3",
      label: "Phone Number",
      children: list.tel,
    },
    {
      key: "4",
      label: "Address",
      children: list.customer_address,
    },
    {
      key: "5",
      label: "Payment Method",
      children: list.payment_method_id,
    },
    {
      key: "5",
      label: "Phone Number",
      children: list ? list.order_total : null,
    },
    {
      key: "5",
      label: "Comment",
      children: list.comment,
    },
    {
      key: "7",
      label: "Paid",
      children: list ? (
        list.is_paid === 1 ? (
          <Tag bordered={false} color="success">
            Paid
          </Tag>
        ) : (
          <Tag bordered={false} color="error">
            Not yet Paid
          </Tag>
        )
      ) : null,
    },
    {
      key: "5",
      label: "Status",
      children: list ? (
        <>
          {list.statusName === "Pending" && (
            <Tag bordered={false} color="processing">
              Pending
            </Tag>
          )}
          {list.statusName === "Packed" && (
            <Tag bordered={false} color="success">
              Packed
            </Tag>
          )}
          {list.statusName === "Shipped" && (
            <Tag bordered={false} color="warning">
              Shipped
            </Tag>
          )}
          {list.statusName === "Delivered" && (
            <Tag bordered={false} color="magenta">
              Delivered
            </Tag>
          )}
          {list.statusName === "Store_pick_up" && (
            <Tag bordered={false} color="orange">
              Store_pick_up
            </Tag>
          )}
          {list.statusName === "Canceled" && (
            <Tag bordered={false} color="error">
              Canceled
            </Tag>
          )}
        </>
      ) : null,
    },
    {
      key: "5",
      label: "Message",
      children: list.message,
    },
    {
      key: "5",
      label: "created At",
      children: list ? formatDateClient(list.create_at) : null,
    },
  ];
  return (
    <div>
      <div className="text-center text-3xl font-bold p-5">Your Orders</div>
      <div className=" flex justify-around items-center">
        {list.length > 0 ? (
          list.map((order, index) => (
            //    <div className="">
            //         <div className="grid grid-cols-2 grid-rows-12 gap-2 border-2 p-5 border-BgBtn">
            //             {/* <div className=" border-b-2"> */}
            //                 <p>Invoice No</p>
            //                 <p>{order.invoice_no}</p>

            //                 <p>First Name</p>
            //                 <p>{order.firstname}</p>

            //                 <p>Last Name</p>
            //                 <p>{order.lastname}</p>

            //                 <p>Phone Number</p>
            //                 <p>{order.tel}</p>

            //                 <p>Address</p>
            //                 <p>{order.customer_address}</p>

            //                 <p>Payment Method</p>
            //                 <p>{order.payment_method_id}</p>

            //                 <p>Order Total</p>
            //                 <p>{order.order_total}</p>

            //                 <p>Comment </p>
            //                 <p>{order.comment} </p>

            //                 <p>Paid</p>
            //                 <p>{order.is_paid}</p>

            //                 <p>Status</p>
            //                 <p>{order.order_status_id}</p>

            //                 <p>Message</p>
            //                 <p>{order.Message}</p>

            //                 <p>Order At</p>
            //                 <p>{formatDateClient(order.create_at)}</p>

            //             {/* </div> */}
            //             {/* <div className=""> */}
            //             {/* </div> */}
            //         </div>
            //    </div>
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
              <Btncompo type="primary" label="view Detail"/>
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
    </div>
  );
};

export default OrderPage;
