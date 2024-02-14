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




  const [objFilter, setObjFilter] = useState({
    page: 1,
    role_id: null,
    permission_id: null,
  });
  const { page, role_id, permission_id } = objFilter;

  useEffect(() => {
    getList(objFilter);
  }, [objFilter]);

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
    var param = {
      id: rows.id,
    };
    const res = await request("rolePermission", "delete", param);
    if (res) {
      getList();
      message.success(res.message);
    } 
  };

  const onFinish = async (values) => {
    const params = {
      "name": values.name,
      "description": values.description,
      "status": values.status
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

  const onClearForm = () => {
    form.resetFields();
  };

  const onClickEdit = (value) => {
    setId(value.id);
    form.setFieldsValue({
      name: value.name,
      description: value.description,
      status: value.status + "",
    });
    setVisible(true);
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
            {isPersmission("employee.Update") && (
              <EditOutlined
                className="mr-10 text-blue-600 text-xl hover:bg-gray-300 p-2 rounded-2xl transition duration-500"
                onClick={() => onClickEdit(item)}
              />
            )}
            {isPersmission("employee.Delete") && (
              <Popconfirm
                title="Delete Employee"
                description="Are you sure to delete this employee?"
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
        <Form  layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
          <Divider />
              <Form.Item
                name="role_id"
                label="Role Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            <Form.Item name="description" label="description">
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

export default RolePermission;
