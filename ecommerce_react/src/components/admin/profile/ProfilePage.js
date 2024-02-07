import { request } from "../../../share/request";
import React, {  useState, useRef } from "react";
import {
 
  Button,
  Col,
  DatePicker,
  Descriptions,
  Divider,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Space,

  message,
} from "antd";
import {

  DeleteOutlined,
  PlusCircleOutlined,
  PlusOutlined,

} from "@ant-design/icons";
import { configImage, formatDateClient, formatDateServer, getUser } from '../../../share/help';
import moment from "moment";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const { Option } = Select;
const ProfilePage = () => {
  const user = getUser();
  

  const [form] = Form.useForm();


 

  const [loading, setLoadin] = useState(false);
 
  const [visible, setVisible] = useState(false);
  const [Id, setId] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePre, setImagePre] = useState(null);
  const refMyImage = useRef();
  const [dob, setDob] = useState();



  const onCloseModal = () => {
    setVisible(false);
    onClearForm();
    setId(null);
  };



  const onFinish = async (values) => {
    const formatdob = formatDateServer(values.dob);
    var formData = new FormData(); 
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("gender", values.gender);
    formData.append("dob", formatdob);
    formData.append("tel", values.tel);
    formData.append("address", values.address);
    formData.append("image", form.getFieldValue("image"));
    if (image != null) {
      formData.append("img_employee", image, image.filename);
    } 
    setLoadin(true);
    const res = await request("employee", "PUT", formData);
    setLoadin(false);
    if (res) {
      message.success(res.message);
      form.resetFields();
      onCloseModal();
      
    }
    console.log(values);
  };

  const onClearForm = () => {
    form.resetFields();
    setImagePre(null);
    setImage(null);
    refMyImage.current.value = null;
  };

  const onClickEdit = () => {
    
    setId(user.id);
    form.setFieldsValue({
      firstname: user.firstname,
      lastname: user.lastname,
      gender: user.gender + "",
      dob: moment(formatDateClient(user.dob)),
      email: user.email,
      tel: user.tel,
      address: user.address,
      image: user.image,
    });
    setImagePre(configImage.image_path + user.image);
    setVisible(true);
  };

 
  const onChangFile = (e) => {
    var file = e.target.files[0];
    setImage(file);
    setImagePre(URL.createObjectURL(file)); // for pre view image
  };

  const onRmoveImageUpdate = (e) => {
    e.preventDefault();
    setImagePre(null);
    setImage(null);
    form.setFieldsValue({
      image: "",
    });
  };

  const items = [
    {
      key: "1",
      label: "Employee ID",
      children: user ? user.id : null,
      span: 2,
    },
    {
      key: "1",
      label: "First Name",
      children: user ? user.firstname : null,
      span: 2,
    },
    {
      key: "2",
      label: "Last name",
      children: user ? user.lastname : null,
    },
    {
      key: "3",
      label: "Gender",
      children: user ? (user.gender === 1 ? "Male" : "Female") : null,
    },
    {
      key: "4",
      label: "Date of Birth",
      children: user ? formatDateClient(user.dob) : null,
    },
    {
      key: "5",
      label: "Email",
      children: user ? user.email : null,
    },
    {
      key: "5",
      label: "Telphone",
      children: user ? user.tel : null,
    },
    {
      key: "5",
      label: "Address",
      children: user ? user.address : null,
    },
    {
      key: "7",
      label: "Role",
      children: user ? (
        user.role_id === 1 ? "Admin" :
        user.role_id === 2 ? "Manager" :
        user.role_id === 3 ? "Seller" :
        "Unknown"
      ) : null,
    },
    {
      key: "5",
      label: "created At",
      children: user ? formatDateClient(user.createAt) : null,
    },
  ];
  return (
    <div>
      <h1 className="text-5xl mb-5 text-center">Profile</h1>
      <div className="flex gap-40 mt-20">
      <Descriptions bordered column={1} items={items} className='w-1/2' />
      <div className="flex justify-center items-center">
        <Image
                
                src={configImage.image_path + user.image}
                width={200}
                className="rounded-lg align-middle "
                alt=""
              />
      </div>
      
      </div>
      <button
                className="bg-BgBtn hover:bg-BgBtnHover text-white px-1 py-3 rounded-lg mt-2"
                onClick={onClickEdit}
              >
             
                Update Profile
              </button>
      <Modal
        open={visible}
        title="Update Employee"
        onCancel={onCloseModal}
        footer={null}
        maskClosable={false}
        width={800}
      >
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
        >
          <Divider />
          <Row gutter={5}>
            <Col span={12}>
              <Form.Item
                name="firstname"
                label="Firstanme"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastname"
                label="Lastname"
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
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Please select gender"
                  allowClear={true}
                  onChange={() => {}}
                >
                  <Option value={"1"}>Male</Option>
                  <Option value={"2"}>Female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dob"
                label="Dob"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker
                  className="w-full"
                  Selected={dob}
                  onChange={(date) => setDob(date)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                name="tel"
                label="Tel"
                rules={[
                  {
                    required: true,
                    message: "Please input your telephone number!",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Tel must contain only numbers!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item name="address" label="Address">
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
         

         

          <Row>
            <Col span={12}>
              <Form.Item
                label="Select picture"
                // name={"image"}
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
                  <>
                    <div className="bg-gray-100 w-36 h-36 rounded-full overflow-hidden border  border-slate-400 flex justify-center items-center">
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
                  </>
                )}
                {/* Hidden file input element */}
                <input
                  type="file"
                  ref={refMyImage}
                  style={{ display: "none" }}
                  onChange={onChangFile}
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
                 UPDATE
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ProfilePage