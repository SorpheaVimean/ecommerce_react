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

const RolePermission = () => {
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const [roleName, setRoleName] = useState([]);
  const [permissionName, setPermissionName] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);

  const [loading, setLoadin] = useState(false);
  const [visible, setVisible] = useState(false);
  const [Id, setId] = useState(null);
  const [rolePermissions, setRolePermissions] = useState([]);
  const [permissions, setPermissions] = useState([]);



  const [objFilter, setObjFilter] = useState({
    page: 1,
    role_id: null,
    permission_id: null,
  });
  const { page, role_id, permission_id } = objFilter;

  useEffect(() => {
    getList(objFilter);
    getPermission();
  }, [objFilter]);

  const getPermission = async () => {
    setLoadin(true);
   
    const res = await request("permission/withoutPage", "GET");
      setLoadin(false);
      setPermissions(res.list);
    
  };
  const getList = async (parameter = {}) => {
    setLoadin(true);
    const { page, role_id, permission_id } = parameter;
    var param = `?page=${page || 1}`;
    if (role_id) {
      param += `&role_id=${role_id}`;
    }
    if (permission_id) {
      param += `&permission_id=${permission_id}`;
    }
    const res = await request("rolePermission" + param, "GET");
    setTimeout(() => {
      setLoadin(false);
    }, 300);
    setList(res.list);
    if (res.totalRecord.length > 0) {
      setTotalRecord(res.totalRecord[0].total);
    }
    setRoleName(res.roleName);
    setPermissionName(res.permissionName);
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
    const param = { id: rows.permission_id};
    const res = await request("rolePermission", "delete", param);
    if (res) {
      getList();
      message.success(res.message);
    } 
  };

  const onFinish = async () => {
    const params = {
      role_permissions: rolePermissions,
    }
    setLoadin(true);
      var method = "post";
    if (Id != null) {
      params.id = Id;
      method = "put";
    }
    const res = await request( "rolePermission", method, params)
    setLoadin(false);
     if (res) {
        message.success(res.message);
        getList();
        form.resetFields();
        onCloseModal();
      }
      console.log(params);
  };
  const handleAddPermission = () => {
    form.validateFields().then(values => {
      const { role_id, permission_id } = values;
      setRolePermissions([...rolePermissions, { role_id, permission_id }]);
      form.setFieldsValue({ role_id, permission_id: undefined }); // Reset only the Permission ID field
    });
  };
  const handleRemovePermission = (indexToRemove) => {
    setRolePermissions(prevPermissions =>
      prevPermissions.filter((_, index) => index !== indexToRemove)
    );
  };
  const onClearForm = () => {
    form.resetFields();
    setRolePermissions([]);
  };



  // Table columns
  const columns = [
    {
      key: "No",
      title: "Role",
      dataIndex: "role_name",
      fixed: "left",
      
    },
    {
      key: "permission_id",
      title: "Permission",
      dataIndex: "permission_name",
      fixed: "left",
    },
    {
      key: "Actoin",
      title: "Action",
      width: 200,
      render: (value, item, index) => {
        return (
          <div key={index}>
            {isPersmission("role_permission.Delete") && (
              <Popconfirm
                title="Delete role_permission"
                description="Are you sure to delete this role_permission?"
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
        <div className="text-5xl text-center mb-5">rolePermissions</div>
        <div className="flex justify-between ">
          <div className="flex ">
            <Space>
              <div className="text-md w-full lg:text-2xl ">
                Total rolePermissions: {totalRecord}
              </div>

              
              <Select
                value={role_id}
                placeholder="Role"
                style={{ width: 120 }}
                allowClear
                onChange={(value) => {
                  setObjFilter({
                    ...objFilter,
                    role_id: value,
                  });
                }}
              >
                {roleName?.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
              <Select
                value={permission_id}
                placeholder="Permission"
                style={{ width: 160 }}
                allowClear
                onChange={(value) => {
                  setObjFilter({
                    ...objFilter,
                    permission_id: value,
                  });
                }}
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {permissionName?.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item.code}
                  </Option>
                ))}
              </Select>
            </Space>
          </div>
          <div className="">
            {isPersmission("customer.Create") && (
              <Btncompo
              type="primary"
              label="Create rolePermission"
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
        title={Id == null ? "New rolePermission" : "Update rolePermission"}
        onCancel={onCloseModal}
        footer={null}
        maskClosable={false}
        width={500}
      >
        <Form
        form={form}
        layout="vertical"
        name="role_permissions_form"
        onFinish={onFinish}
      >
        <Form.Item
          name="role_id"
          label="Role ID"
          rules={[{ required: true, message: 'Please input role ID!' }]}
        >
           <Select
                  placeholder="Please select Role"
                  allowClear={true}
                  onChange={() => {}}
                >
                  <Option value={"1"}>Admin</Option>
                  <Option value={"2"}>Manager</Option>
                  <Option value={"3"}>Seller</Option>
                </Select>
        </Form.Item>

        <Form.Item
          name="permission_id"
          label="Permission ID"
         
        >
          <Select
                  placeholder="Please select Pemission"
                  allowClear={true}
                  onChange={() => {}}
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {permissions?.map((item, index) => {
                  return (
                    <Option key={index} value={item.id}>
                      {item.code}
                    </Option>
                  );
                })}
                </Select>
         
        </Form.Item>

        <Form.Item>
          <Button  onClick={handleAddPermission}>
            Add Permission
          </Button>
        </Form.Item>
        <div>
        <h3>Added Permissions:</h3>
        <ul>
          {rolePermissions.map((permission, index) => (
            <li key={index} className="flex justify-evenly">
              <div className=""> Role ID: {permission.role_id}, </div>
              <div className=""> Permission ID: {permission.permission_id}</div>
              <Button type="link" className="text-red-500" onClick={() => handleRemovePermission(index)}>Remove</Button>
            </li>
          ))}
        </ul>
      </div>
        {/* <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item> */}
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

export default RolePermission;
