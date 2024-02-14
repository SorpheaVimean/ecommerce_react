import { request } from "../../../share/request";
import React, { useEffect, useState, useRef } from "react";

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
  Col,
  Row,
  Divider,
  DatePicker,
  Image,
  Tag,
} from "antd";
import {
  configImage,
  formatDateClient,
  formatDateServer,
  isPersmission,
} from "../../../share/help";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import moment from "moment";
import MainPage from "../../layout/MainPage";
import { Btncompo } from "../../buttons/Buttons";

const { Option } = Select;

const PaymentMethod = () => {
  const [form] = Form.useForm();
  const [list, setList] = useState([]);

  const [totalRecord, setTotalRecord] = useState(0);

  const [loading, setLoadin] = useState(false);
  const [visible, setVisible] = useState(false);
  const [Id, setId] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePre, setImagePre] = useState(null);
  const refMyImage = useRef();
  const [dob, setDob] = useState();

  const [objFilter, setObjFilter] = useState({
    page: 1,
    txtSearch: "",
    status: null,
  });
  const { page, txtSearch, status } = objFilter;

  useEffect(() => {
    getList(objFilter);
  }, [objFilter]);

  const getList = async (parameter = {}) => {
    setLoadin(true);
    const { page, txtSearch, status } = parameter;
    var param = `?page=${page || 1}&txtSearch=${txtSearch || ""}`;
    if (status) {
      param += `&status=${status}`;
    }
    const res = await request("payment" + param, "GET");
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
      image: rows.image,
    };
    const res = await request("payment", "delete", param);
    if (!res.error) {
      getList();
      message.success(res.message);
    } else {
      message.error(res.message); // Corrected from res.meassage to res.message
    }
  };

  const onFinish = async (values) => {
    var formData = new FormData();
    formData.append("name", values.name);
    formData.append("code", values.code);
    formData.append("status", values.status);
    formData.append("image", form.getFieldValue("image"));
    if (image != null) {
      formData.append("image_payment", image, image.filename);
    }
    var method = "post";
    if (Id != null) {
      // mean update
      formData.append("id", Id);
      method = "put";
    }
    setLoadin(true);
    const res = await request("payment", method, formData);
    setLoadin(false);
    if (res) {
      message.success(res.message);
      getList();
      form.resetFields();
      onCloseModal();
    }
  };

  const onClearForm = () => {
    form.resetFields();
    setImagePre(null);
    setImage(null);
    refMyImage.current.value = null;
  };

  const onClickEdit = (value) => {
    setId(value.id);
    form.setFieldsValue({
      name: value.name,
      code: value.code,
      status: value.status + "",
      image: value.image,
    });
    setImagePre(configImage.image_path + value.image);
    setVisible(true);
  };

  const onChangFile = (e) => {
    var file = e.target.files[0];
    setImage(file);
    setImagePre(URL.createObjectURL(file));
  };

  const onRmoveImageUpdate = (e) => {
    e.preventDefault();
    setImagePre(null);
    setImage(null);
    form.setFieldsValue({
      image: "",
    });
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
      key: "image",
      title: "image",
      dataIndex: "image",
      render: (value, rows, index) => {
        return (
          <div>
            {value !== null && value !== "" ? (
              <Image
                key={index}
                src={configImage.image_path + value}
                width={60}
                className="rounded-lg align-middle"
                alt=""
              />
            ) : (
              <div className="flex justify-start items-center">
                <FileImageOutlined className="text-4xl" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: "name",
      title: "name",
      dataIndex: "name",
      fixed: "left",
      
    },
    {
      key: "code",
      title: "code",
      dataIndex: "code",
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      render: (value, items, index) =>
        value === 1 ? (
          <Tag bordered={false} color="success">
            Active
          </Tag>
        ) : (
          <Tag bordered={false} color="error">
            Inactive
          </Tag>
        ),
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
                title="Delete payment method"
                description="Are you sure to delete this payment method?"
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
        <div className="text-5xl text-center mb-5">Payment Method</div>
        <div className="flex justify-between ">
          <div className="flex ">
            <Space>
              <div className="text-md w-full lg:text-2xl ">
                Total payment: {totalRecord}
              </div>

              <Input
                value={txtSearch}
                placeholder="Search by id, name, lastname"
                allowClear={true}
                className="w-96 xs:w-56"
                onChange={(event) => {
                  setObjFilter({
                    ...objFilter,
                    txtSearch: event.target.value,
                  });
                }}
              />

              <Select
                value={status}
                placeholder="Status"
                style={{ width: 120 }}
                allowClear
                onChange={(value) => {
                  setObjFilter({
                    ...objFilter,
                    status: value,
                  });
                }}
              >
                <Option value={"1"}>Actived</Option>
                <Option value={"2"}>Inactive</Option>
              </Select>
            </Space>
          </div>
          <div className="">
            {isPersmission("employee.Create") && (
             <Btncompo
             type="primary"
             label="Create Payment Method"
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
          pageSize: 7,
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
        title={Id == null ? "New payment Method" : "Update payment Method"}
        onCancel={onCloseModal}
        footer={null}
        maskClosable={false}
        width={500}
      >
        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
        >
          <Divider />

          <Form.Item
            name="name"
            label="Payment Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="code"
            label="Code Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Please select Status"
              allowClear={true}
              onChange={() => {}}
            >
              <Option value={"1"}>Active</Option>
              <Option value={"2"}>Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Select picture"
            // name={"image"}
            className="text-center"
          >
            {!imagePre && (
              <button
                className="bg-gray-100 rounded-full p-10 border border-dashed border-slate-400 hover:border-BgBtn hover:text-BgBtn hover:cu"
                onClick={(e) => {
                  e.preventDefault(); // Prevent form submission
                  refMyImage.current.click(); // Trigger file input click
                }}
              >
                <button type="button">
                  <PlusOutlined />
                  <div className="mt-2">Upload</div>
                </button>
              </button>
            )}
            {/* Show the preview image when there's a value */}
            {imagePre && (
              <div className="flex flex-col justify-center items-center">
                <div className="bg-gray-100 w-36 h-36 rounded-full overflow-hidden border  border-slate-400 flex justify-center items-center ">
                  <img
                    src={imagePre}
                    className=" rounded-full object-cover  w-32 h-32  "
                    alt=""
                    onClick={(e) => {
                      e.preventDefault(); // Prevent form submission
                      refMyImage.current.click(); // Trigger file input click
                    }}
                  />
                </div>

                {Id != null && (
                  <div>
                    <button onClick={onRmoveImageUpdate}>
                      <DeleteOutlined className=" text-red-500 text-xl  hover:bg-gray-300 p-2 rounded-2xl transition duration-500" />
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* Hidden file input element */}
            <input
              type="file"
              ref={refMyImage}
              style={{ display: "none" }}
              onChange={onChangFile}
            />
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

export default PaymentMethod;
