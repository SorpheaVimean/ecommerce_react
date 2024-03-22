import { request } from "../../../share/request";
import React, { useEffect, useState } from "react";

import {
  Button,
  Table,
  Space,
  Input,
  Modal,
  Form,
  Select,
  message,
  Popconfirm,
  Divider,
  Tag,
  InputNumber,
} from "antd";
import {
  formatDateClient,
  isPersmission,
} from "../../../share/help";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import MainPage from "../../layout/MainPage";
import { Btncompo } from "../../buttons/Buttons";

const { Option } = Select;

const CustomerAddress = () => {
  const [form] = Form.useForm();
  const [list, setList] = useState([]);

  const [totalRecord, setTotalRecord] = useState(0);

  const [loading, setLoadin] = useState(false);
  const [visible, setVisible] = useState(false);
  const [Id, setId] = useState(null);




  const [objFilter, setObjFilter] = useState({
    page: 1,
    txtSearch: "",
    
  });
  const { page, txtSearch } = objFilter;

  useEffect(() => {
    getList(objFilter);
  }, [objFilter]);

  const getList = async (parameter = {}) => {
    setLoadin(true);
    const { page, txtSearch } = parameter;
    var param = `?page=${page || 1}&txtSearch=${txtSearch || ""}`;
    
    const res = await request("customerAddress" + param, "GET");
    setTimeout(() => {
      setLoadin(false);
    }, 300);
    setList(res.list);
    if (res.totalRecord.length > 0) {
      setTotalRecord(res.totalRecord[0].total);
    }
    
  };

  const onNewEmplyee = () => {
    setVisible(true);
  };

  const onCloseModal = () => {
    setVisible(false);
    onClearForm();
    setId(null);
  };

  const onDelete = async (rows) => {
    var param = {
      id: rows.id,
    };
    const res = await request("customerAddress", "delete", param);
    if (res) {
      getList();
      message.success(res.message);
    } 
  };

  const onFinish = async (values) => {
    const params = {
      "customer_id": values.customer_id,
      "address_1": values.address_1,
      "address_2": values.address_2
    }
    setLoadin(true);
      var method = "post";
    if (Id != null) {
      params.id = Id;
      method = "put";
    }
    const res = await request( "customerAddress", method, params)
    setLoadin(false);
     if (res) {
        message.success(res.message);
        getList();
        form.resetFields();
        onCloseModal();
      }
      console.log(params);
  };

  const onClearForm = () => {
    form.resetFields();
  };

  const onClickEdit = (value) => {
    setId(value.id);
    form.setFieldsValue({
      customer_id: value.customer_id,
      address_1: value.address_1,
      address_2: value.address_2,
    });
    setVisible(true);
  };

  // Table columns
  const columns = [
    {
      key: "No",
      title: "ID",
      dataIndex: "id",
      fixed: "left",
      width: 60,
    },
    {
      key: "customer_id",
      title: "Customer ID",
      dataIndex: "customer_id",
      fixed: "left",
    },
   
    {
      key: "address_1",
      title: "address_1",
      dataIndex: "address_1",
    },
    {
      key: "address_2",
      title: "address_2",
      dataIndex: "address_2",
      
    },
    {
      key: "is_default",
      title: "is_default",
      dataIndex: "is_default",
      
    },
    {
      key: "create_at",
      title: "Created At",
      dataIndex: "create_at",
      render: (value) => formatDateClient(value),
    },
    {
      key: "Actoin",
      title: "Action",
      width: 200,
      render: (value, item, index) => {
        return (
          <div key={index}>
            {isPersmission("employee.Update") && (
              <EditOutlined
                className="mr-10 text-blue-600 text-xl hover:bg-gray-300 p-2 rounded-2xl transition duration-500"
                onClick={() => onClickEdit(item)}
              />
            )}
            {isPersmission("employee.Delete") && (
              <Popconfirm
                title="Delete customer Address"
                description="Are you sure to delete this customer Address?"
                onConfirm={() => onDelete(item)}
                okText="Yes"
                cancelText="No"
                okButtonProps={{
                  style: {
                    backgroundColor: "blue",
                    hover: { backgroundColor: "green" },
                  },
                }}
              >
                <DeleteOutlined className=" text-red-500 text-xl  hover:bg-gray-300 p-2 rounded-2xl transition duration-500" />
              </Popconfirm>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <MainPage loading={loading}>
      <div className="mb-2">
        <div className="text-5xl text-center mb-5">Customer Addresses</div>
        <div className="flex justify-between ">
          <div className="flex ">
            <Space>
              <div className="text-md w-full lg:text-2xl ">
                Total Customer Addresss: {totalRecord}
              </div>

              <Input
                value={txtSearch}
                placeholder="Search by id or customer id"
                allowClear={true}
                className="w-96 "
                onChange={(event) => {
                  setObjFilter({
                    ...objFilter,
                    txtSearch: event.target.value,
                  });
                }}
              />
             
            </Space>
          </div>
          <div className="">
            {isPersmission("customer_address.Create") && (
              <Btncompo
              type="primary"
              label="Create customerAddress"
              icon={<PlusCircleOutlined className="mr-4 text-lg" />}
              onClick={onNewEmplyee}
            />
              
            )}
          </div>
        </div>
      </div>

      <Table
        pagination={{
          defaultCurrent: 1,
          total: totalRecord,
          pageSize: 9,
          onChange: (page, pageSize) => {
            setObjFilter({
              ...objFilter,
              page: page,
            });
          },
          // onShowSizeChange  // Called when pageSize is changed
        }}
        dataSource={list}
        columns={columns}
        scroll={{
          x: 1500,
        }}
      />
      <Modal
        open={visible}
        title={Id == null ? "New Customer Address" : "Update Customer Address"}
        onCancel={onCloseModal}
        footer={null}
        maskClosable={false}
        width={500}
      >
        <Form  layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
          <Divider />
          <Form.Item
                name="customer_id"
                label="Customer ID"
                rules={[
                  {
                    required: true,
                    message: "Please input your Customer ID!",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "This input contain only numbers!",
                  },
                ]}
              >
                <InputNumber className="w-full" />
              </Form.Item>
            <Form.Item name="address_1" label="Address 1">
                <Input.TextArea />
              </Form.Item>
              <Form.Item name="address_2" label="Address 2">
                <Input.TextArea />
              </Form.Item>
          <Form.Item wrapperCol={24} style={{ textAlign: "right" }}>
            <Space>
              <Button htmlType="button" onClick={onClearForm}>
                Clear
              </Button>
           
              <Button htmlType="summit" type="primary">
                {Id == null ? "SAVE" : "UPDATE"}
              </Button>
              
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </MainPage>
  );
};

export default CustomerAddress;
