import { request } from "../../../share/request";
import React, { useEffect, useState, useRef } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

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
  Image,
  InputNumber,
} from "antd";
import {
  configImage,
  formatDateClient,
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
const layout = {
  labelCol: {
    span: 20,
  },
  wrapperCol: {
    span:21,
  },
};

const Product = () => {
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const [category, setCategory] = useState([]);

  const [totalRecord, setTotalRecord] = useState(0);

  const [loading, setLoadin] = useState(false);
  const [visible, setVisible] = useState(false);
  const [Id, setId] = useState(null);

   // State variable for Quill editor content
   const [description, setDescription] = useState("");
  // const [image, setImage] = useState(null);
  //   const [imagePre, setImagePre] = useState(null);
  const refMyImage1 = useRef();
  const refMyImage2 = useRef();
  const refMyImage3 = useRef();
  const refMyImage4 = useRef();
  const refMyImage5 = useRef();

  const [image1, setImage1] = useState(null);
  const [imagePre1, setImagePre1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [imagePre2, setImagePre2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [imagePre3, setImagePre3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [imagePre4, setImagePre4] = useState(null);
  const [image5, setImage5] = useState(null);
  const [imagePre5, setImagePre5] = useState(null);

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

  const getList = async (parameter = {}) => {
    setLoadin(true);
    var param = "?page=" + (parameter.page || 1);
    param += "&txtSearch=" + (parameter.txtSearch || "");
    param += "&categoryId=" + parameter.categorySearch;
    // param += "&productStatus=" + parameter.productStatus;
    const res = await request("product" + param, "get");
    setTimeout(() => {
      setLoadin(false);
    }, 300);

    if (res) {
      setList(res.list);
      setCategory(res.list_category);
      if (res.totalRecord.length > 0) {
        setTotalRecord(res.totalRecord[0].total);
      }
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
    const res = await request("product", "delete", param);
    if (!res.error) {
      getList();
      message.success(res.message);
    } else {
      message.error(res.message); // Corrected from res.meassage to res.message
    }
  };

  const onFinish = async (values) => {
    var formData = new FormData();
    formData.append("category_id", values.category_id);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("quantity", values.quantity);
    formData.append("status", values.status);

    // Set image values based on selected files or existing images
    // formData.append("image_1", form.getFieldValue("image_1"));
    // formData.append("image_2", form.getFieldValue("image2"));
    // formData.append("image_3", form.getFieldValue("image3"));
    // formData.append("image_4", form.getFieldValue("image4"));
    // formData.append("image_5", form.getFieldValue("image5"));

    // Append new image files if selected
    if (image1 != null) {
      formData.append("image_product", image1, image1.name);
    } else {
      formData.append("image_product", values.image_1);
    }
    if (image2 != null) {
      formData.append("image_product", image2, image2.name);
    } else {
      formData.append("image_product", values.image_2);
    }
    if (image3 != null) {
      formData.append("image_product", image3, image3.name);
    } else {
      formData.append("image_product", values.image_3);
    }
    if (image4 != null) {
      formData.append("image_product", image4, image4.name);
    } else {
      formData.append("image_product", values.image_4);
    }
    if (image5 != null) {
      formData.append("image_product", image5, image5.name);
    } else {
      formData.append("image_product", values.image_5);
    }
    // if (image2 != null) {
    //   formData.append("image_product", image2, image2.filename);
    // }
    // if (image3 != null) {
    //   formData.append("image_product", image3, image3.filename);
    // }
    // if (image4 != null) {
    //   formData.append("image_product", image4, image4.filename);
    // }
    // if (image5 != null) {
    //   formData.append("image_product", image5, image5.filename);
    // }

    var method = "post";
    if (Id != null) {
      // mean update
      formData.append("id", Id);
      method = "put";
    }
    setLoadin(true);
    const res = await request("product", method, formData);
    setLoadin(false);
    if (res) {
      message.success(res.message);
      getList();
      form.resetFields();
      onCloseModal();
    }
    console.log(values);
  };

  const onClearForm = () => {
    form.resetFields();
    setImagePre1(null);
    setImagePre2(null);
    setImagePre3(null);
    setImagePre4(null);
    setImagePre5(null);
    setImage1(null);
    setImage2(null);
    setImage3(null);
    setImage4(null);
    setImage5(null);

    refMyImage1.current.value = null;
    refMyImage2.current.value = null;
    refMyImage3.current.value = null;
    refMyImage4.current.value = null;
    refMyImage5.current.value = null;
  };

  const onClickEdit = (value) => {
    setId(value.id);
    form.setFieldsValue({
      category_id: value.category_id,
      name: value.name,
      description: value.description + "",
      dob: moment(formatDateClient(value.dob)),
      price: value.price,
      quantity: value.quantity,
      address: value.address,
      role_id: value.role_id + "",
      status: value.status + "",
      image_1: value.image_1,
      image_2: value.image_2,
      image_3: value.image_3,
      image_4: value.image_4,
      image_5: value.image_5,
    });
    console.log(value);
    setImagePre1(configImage.image_path + value.image_1);
    setImagePre2(configImage.image_path + value.image_2);
    setImagePre3(configImage.image_path + value.image_3);
    setImagePre4(configImage.image_path + value.image_4);
    setImagePre5(configImage.image_path + value.image_5);
    setVisible(true);
  };

  const onChangFile = (e, slot) => {
    const file = e.target.files[0];
    switch (slot) {
      case 1:
        setImage1(file);
        setImagePre1(URL.createObjectURL(file));
        break;
      case 2:
        setImage2(file);
        setImagePre2(URL.createObjectURL(file));
        break;
      case 3:
        setImage3(file);
        setImagePre3(URL.createObjectURL(file));
        break;
      case 4:
        setImage4(file);
        setImagePre4(URL.createObjectURL(file));
        break;
      case 5:
        setImage5(file);
        setImagePre5(URL.createObjectURL(file));
        break;
      default:
        break;
    }
  };

  const onRmoveImageUpdate = (e, slot) => {
    e.preventDefault();
    switch (slot) {
      case 1:
        setImage1(null);
        setImagePre1(null);
        break;
      case 2:
        setImage2(null);
        setImagePre2(null);
        break;
      case 3:
        setImage3(null);
        setImagePre3(null);
        break;
      case 4:
        setImage4(null);
        setImagePre4(null);
        break;
      case 5:
        setImage5(null);
        setImagePre5(null);
        break;
      default:
        break;
    }
  };

  // Table columns
  const columns = [
    {
      key: "No",
      title: "ID",
      dataIndex: "id",
      fixed: "left",
      width: 60,
      // render: (value, items, index) => index + 1,
    },
    {
      key: "category_id",
      title: "Category",
      dataIndex: "category_name",
      fixed: "left",
      width: 110,
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      fixed: "left",
      width: 100,
      ellipsis: true,
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
    },

    {
      key: "price",
      title: "Price",
      dataIndex: "price",
      render: (value) => {
        const formattedPrice = `$${value.toLocaleString()}`; // Add commas every three digits
        return formattedPrice;
      },
    },
    {
      key: "quantity",
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      key: "Image_1",
      title: "Image_1",
      dataIndex: "image_1",
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
      key: "Image_2",
      title: "Image_2",
      dataIndex: "image_2",
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
      key: "Image_3",
      title: "Image_3",
      dataIndex: "image_3",
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
      key: "Image_4",
      title: "Image_4",
      dataIndex: "image_4",
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
      key: "Image_5",
      title: "Image_5",
      dataIndex: "image_5",
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
      key: "create_at",
      title: "Create At",
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
            {isPersmission("product.Update") && (
              <EditOutlined
                className="mr-10 text-blue-600 text-xl hover:bg-gray-300 p-2 rounded-2xl transition duration-500"
                onClick={() => onClickEdit(item)}
              />
            )}
            {isPersmission("product.Delete") && (
              <Popconfirm
                title="Delete product"
                description="Are you sure to delete this product?"
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
    // Function to handle Quill editor content change
    const handleDescriptionChange = (content) => {
      setDescription(content);
    };
  const modules = {
// Quill modules configuration
  toolbar: [
    [{header: [1,2,3,4,5,6,false]}],
    [{font: []}],
    [{size: []}],
    [{color: []}],
    [{align: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }

// // Quill editor formats
// Product.formats = [
//   'header', 'font', 'size',
//   'bold', 'italic', 'underline', 'strike', 'blockquote',
//   'list', 'bullet', 'indent',
//   'link', 'image', 'video'
// ];
  }
  const formats = 
    [
        'header', 'font', 'size', 'color', 'align',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link',
      ]
  
  return (
    <MainPage loading={loading}>
      <div className="mb-2">
        <div className="text-5xl text-center mb-5">Products </div>
        <div className="flex justify-between ">
          <div className="flex ">
            <Space>
              <div className="text-md w-full lg:text-2xl ">
                Total Products: {totalRecord}
              </div>

              <Input
                value={txtSearch}
                placeholder="Search by name, id, product_id,"
                allowClear={true}
                className="w-96 "
                onChange={(event) => {
                  setObjFilter({
                    ...objFilter,
                    txtSearch: event.target.value,
                  });
                }}
              />

              <Select
                value={categorySearch}
                placeholder="Search by Role"
                className="w-40 "
                allowClear
                onChange={(value) => {
                  setObjFilter({
                    ...objFilter,
                    categorySearch: value,
                  });
                }}
              >
                {category?.map((item, index) => {
                  return (
                    <Option key={index} value={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
              {/* <Select
                value={productStatus}
                placeholder="Status"
                style={{ width: 120 }}
                allowClear
                onChange={(value) => {
                  setObjFilter({
                    ...objFilter,
                    productStatus: value,
                  });
                }}
              >
                <Option value={"1"}>Actived</Option>
                <Option value={"0"}>Disabled</Option>
              </Select> */}
            </Space>
          </div>
          <div className="">
            {isPersmission("employee.Create") && (
              <Btncompo
                type="primary"
                label="Create Product"
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
          pageSize: 18,
          onChange: (page, pageSize) => {
            setObjFilter({
              ...objFilter,
              page: page,
            });
          },
        }}
        dataSource={list}
        columns={columns}
        scroll={{
          x: 1500,
        }}
      />

      <Modal
        open={visible}
        title={Id == null ? "New Employee" : "Update Employee"}
        onCancel={onCloseModal}
        footer={null}
        maskClosable={false}
        width={800}
      >
        <Form {...layout} layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
          <Divider />
          <Row gutter={5}>
            <Col span={12}>
              <Form.Item
                name="category_id"
                label="Category"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Please select Category"
                  allowClear={true}
                  onChange={() => {}}
                >
                  {category?.map((item, index) => {
                    return (
                      <Option key={index} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Product Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name="quantity"
                label="quantity"
                rules={[
                  {
                    required: true,
                    message: "Please input your quantityephone number!",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "quantity must contain only numbers!",
                  },
                ]}
              >
                <InputNumber className="w-full" min={1} defaultValue={1} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="price"
                label="price"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber
                  className="w-full"
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  //   onChange={onChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name="status"
                label="status"
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
            </Col>
            <Col span={12}>
            
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Form.Item label="Select picture">
                {!imagePre1 && (
                  <button
                    className="bg-gray-100 rounded-full p-10 border border-dashed border-slate-400 hover:border-BgBtn hover:text-BgBtn hover:cu"
                    onClick={(e) => {
                      e.preventDefault();
                      refMyImage1.current.click();
                    }}
                  >
                    <PlusOutlined />
                    <div className="mt-2">Upload</div>
                  </button>
                )}
                {imagePre1 && (
                  <>
                    <div className="bg-gray-100 w-36 h-36 rounded-full overflow-hidden border  border-slate-400 flex justify-center items-center">
                      <img
                        src={imagePre1}
                        className="rounded-full object-cover w-32 h-32"
                        alt=""
                        onClick={(e) => {
                          e.preventDefault();
                          refMyImage1.current.click();
                        }}
                      />
                    </div>
                    <div>
                      <button onClick={(e) => onRmoveImageUpdate(e, 1)}>
                        <DeleteOutlined className="text-red-500 text-xl hover:bg-gray-300 p-2 rounded-2xl transition duration-500" />
                      </button>
                    </div>
                  </>
                )}
                <input
                  type="file"
                  ref={refMyImage1} // Update the ref here
                  style={{ display: "none" }}
                  onChange={(e) => onChangFile(e, 1)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Select picture">
                {!imagePre2 && (
                  <button
                    className="bg-gray-100 rounded-full p-10 border border-dashed border-slate-400 hover:border-BgBtn hover:text-BgBtn hover:cu"
                    onClick={(e) => {
                      e.preventDefault();
                      refMyImage2.current.click();
                    }}
                  >
                    <PlusOutlined />
                    <div className="mt-2">Upload</div>
                  </button>
                )}
                {imagePre2 && (
                  <>
                    <div className="bg-gray-100 w-36 h-36 rounded-full overflow-hidden border  border-slate-400 flex justify-center items-center">
                      <img
                        src={imagePre2}
                        className="rounded-full object-cover w-32 h-32"
                        alt=""
                        onClick={(e) => {
                          e.preventDefault();
                          refMyImage2.current.click();
                        }}
                      />
                    </div>
                    <div>
                      <button onClick={(e) => onRmoveImageUpdate(e, 2)}>
                        <DeleteOutlined className="text-red-500 text-xl hover:bg-gray-300 p-2 rounded-2xl transition duration-500" />
                      </button>
                    </div>
                  </>
                )}
                <input
                  type="file"
                  ref={refMyImage2}
                  style={{ display: "none" }}
                  onChange={(e) => onChangFile(e, 2)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Select picture">
                {!imagePre3 && (
                  <button
                    className="bg-gray-100 rounded-full p-10 border border-dashed border-slate-400 hover:border-BgBtn hover:text-BgBtn hover:cu"
                    onClick={(e) => {
                      e.preventDefault();
                      refMyImage3.current.click();
                    }}
                  >
                    <PlusOutlined />
                    <div className="mt-2">Upload</div>
                  </button>
                )}
                {imagePre3 && (
                  <>
                    <div className="bg-gray-100 w-36 h-36 rounded-full overflow-hidden border  border-slate-400 flex justify-center items-center">
                      <img
                        src={imagePre3}
                        className="rounded-full object-cover w-32 h-32"
                        alt=""
                        onClick={(e) => {
                          e.preventDefault();
                          refMyImage3.current.click();
                        }}
                      />
                    </div>
                    <div>
                      <button onClick={(e) => onRmoveImageUpdate(e, 3)}>
                        <DeleteOutlined className="text-red-500 text-xl hover:bg-gray-300 p-2 rounded-2xl transition duration-500" />
                      </button>
                    </div>
                  </>
                )}
                <input
                  type="file"
                  ref={refMyImage3}
                  style={{ display: "none" }}
                  onChange={(e) => onChangFile(e, 3)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="Select picture">
                {!imagePre4 && (
                  <button
                    className="bg-gray-100 rounded-full p-10 border border-dashed border-slate-400 hover:border-BgBtn hover:text-BgBtn hover:cu"
                    onClick={(e) => {
                      e.preventDefault();
                      refMyImage4.current.click();
                    }}
                  >
                    <PlusOutlined />
                    <div className="mt-2">Upload</div>
                  </button>
                )}
                {imagePre4 && (
                  <>
                    <div className="bg-gray-100 w-36 h-36 rounded-full overflow-hidden border  border-slate-400 flex justify-center items-center">
                      <img
                        src={imagePre4}
                        className="rounded-full object-cover w-32 h-32"
                        alt=""
                        onClick={(e) => {
                          e.preventDefault();
                          refMyImage4.current.click();
                        }}
                      />
                    </div>
                    <div>
                      <button onClick={(e) => onRmoveImageUpdate(e, 4)}>
                        <DeleteOutlined className="text-red-500 text-xl hover:bg-gray-300 p-2 rounded-2xl transition duration-500" />
                      </button>
                    </div>
                  </>
                )}
                <input
                  type="file"
                  ref={refMyImage4}
                  style={{ display: "none" }}
                  onChange={(e) => onChangFile(e, 4)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Select picture">
                {!imagePre5 && (
                  <button
                    className="bg-gray-100 rounded-full p-10 border border-dashed border-slate-400 hover:border-BgBtn hover:text-BgBtn hover:cu"
                    onClick={(e) => {
                      e.preventDefault();
                      refMyImage5.current.click();
                    }}
                  >
                    <PlusOutlined />
                    <div className="mt-2">Upload</div>
                  </button>
                )}
                {imagePre5 && (
                  <>
                    <div className="bg-gray-100 w-36 h-36 rounded-full overflow-hidden border  border-slate-400 flex justify-center items-center">
                      <img
                        src={imagePre5}
                        className="rounded-full object-cover w-32 h-32"
                        alt=""
                        onClick={(e) => {
                          e.preventDefault();
                          refMyImage5.current.click();
                        }}
                      />
                    </div>
                    <div>
                      <button onClick={(e) => onRmoveImageUpdate(e, 5)}>
                        <DeleteOutlined className="text-red-500 text-xl hover:bg-gray-300 p-2 rounded-2xl transition duration-500" />
                      </button>
                    </div>
                  </>
                )}
                <input
                  type="file"
                  ref={refMyImage5}
                  style={{ display: "none" }}
                  onChange={(e) => onChangFile(e, 5)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
          <Form.Item name="description" label="Description" className="w-full" >
                {/* <Input.TextArea minLength={10} /> */}
                <ReactQuill
          value={description}
          onChange={handleDescriptionChange}
          modules={modules}
          formats={formats}
        />
              </Form.Item>
              </Col>
          </Row>
         

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

export default Product;
