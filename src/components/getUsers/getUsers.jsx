import React, { useEffect, useState } from "react";
import userApi from "../../api/userApi";
import axios from "axios";
import "./getUsers.css";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Switch,
  Table,
  Layout,
  Button,
  Input,
  Modal,
  Form,
  Upload,
  notification
} from "antd";
import ImgCrop from "antd-img-crop";
import {
  LeftOutlined,
  RightOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
// import { Table, Tag, Space } from 'antd';

import { useSelector } from "react-redux";

function GetUsers() {
  const { Content } = Layout;
  const [form] = Form.useForm();
  const { Meta } = Card;
  const { Text, Title } = Typography;
  const { Search } = Input;
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const status = useSelector((state) => state.loginReducer);
  const [filter, setFiler] = useState({
    page: 1,
    limit: 10,
    search: "",
  });
  const [visible, setVisible] = useState(false);
  const[fetch , setFetchData] = useState(false)
  const [fileList, setFileList] = useState([
   
  ]);
  const onChange = ({ fileList: newFileList }) => {
   
      setFileList(newFileList);
     if(newFileList.length > 0){
      setCurrentUser({
        ...currentUser,
        avatar:newFileList[0].thumbUrl
      })
     }

  };
  const onRemove = async (file)=>{
    setCurrentUser({
      ...currentUser,
      avatar:''
    })
  }
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  useEffect(() => {
    async function getAllUsers() {
      axios
        .get(
          `https://5ed504448769250016e63159.mockapi.io/api/qlnv/user?page=${filter.page}&limit=${filter.limit}&search=${filter.search}`
        )
        .then((res) => {
          const data = res.data;
          setUsers(data);
        });
    }
    getAllUsers();
    return () => {};
  }, [filter,fetch]);
  function prePage() {
    if (filter.page === 1) return;

    let curPage = filter.page - 1;
    setFiler({
      ...filter,
      page: curPage,
    });
  }

  function nextPage() {
    let curPage = filter.page + 1;
    setFiler({
      ...filter,
      page: curPage,
    });
  }
  function findByName(e) {
    setFiler({
      ...filter,
      page: 1,
      search: e,
    });
  }

  const postUser = ()=>{
    axios.post(`https://5ed504448769250016e63159.mockapi.io/api/qlnv/user/` , currentUser )
    .then(()=>{
        setFetchData(!fetch)
        setVisible(false);
        notification['success']({
          message: 'Notification',
          description:
            'Thêm mới thành công !',
            duration: 2, 
        });
    })
  }
  function deleteUser(userId) {
    axios
      .delete(
        `https://5ed504448769250016e63159.mockapi.io/api/qlnv/user/${userId}`
      )
      .then(() => {});
  }
 
  const columns = [
    {
      title: "Stt",
      // dataIndex: "avatar",
      render : (text, record, index) => index+1,
    },
    {
      title: "Avartar",
      dataIndex: "avatar",
      render: (avatar) => <Avatar src={avatar} />,
    },
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Detail",
      dataIndex: "",
      render: (item) => (
        <Text
          style={{ cursor: "pointer" }}
          onClick={() => showModal(item)}
          type="success"
        >
          Detail
        </Text>
      ),
    },
  ];
  const showModal = (item ={}) => {
    setVisible(true);
    setCurrentUser(item);
  };

  const handleOk = () => {
    axios.put(`https://5ed504448769250016e63159.mockapi.io/api/qlnv/user/${currentUser.id}` , currentUser )
    .then(()=>{
      setFetchData(!fetch)
      setVisible(false);
      notification['info']({
        message: 'Notification',
        description:
          'Cập nhật thành công !',
          duration: 2,
      });
    })
  };

  const handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };
  return (
    <div>
      <Row justify="center">
        <Col span={6} offset={18}>
          <Content style={{ padding: "15px 0px" }}>
            <Text type="priamry">
              Change View <Switch defaultChecked />
            </Text>
          </Content>
        </Col>
        <Col span={16}>
          <Content>
           
          <Title level={4}>Danh sách users</Title>
          </Content>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={16}>
          <Content style={{ padding: "10px 0px" }}>
          
            <Search
              placeholder="Your User Name"
              onSearch={(e) => {
                findByName(e);
              }}
              style={{ width: 300 }}
            />
          </Content>
        </Col>
      </Row>
      {/* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {users.map((item) => (
          <Col span={6}>
            <Card style={{ width: 300, marginTop: 16 }}>
              <Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.name}
                description={<Text type="success"><Link to={`/user/${item.id}`}>Detail</Link></Text>}
              />
              
            </Card>
          </Col>
        ))}
      </Row> */}
       <Row justify="center">
        <Col span={16}>
          <Content>
          <Button onClick={()=>showModal()} type="primary">Thêm mới</Button>
          </Content>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={16}>
          <Content>
            <Table
              className="pagination_hidden"
              pagination={false}
              columns={columns}
              dataSource={users}
            />
          </Content>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={6} offset={14}>
          <Content style={{ padding: "15px 0px" }}>
            {filter.page > 1 && (
              <Button
                className="btn_pagi"
                style={{ paddingBottom: "5px" }}
                onClick={() => {
                  prePage();
                }}
              >
                <LeftOutlined />
              </Button>
            )}
            <Button
              className="btn_pagi"
              onClick={() => {
                nextPage();
              }}
              style={{ marginLeft: "5px" }}
            >
              <RightOutlined />
            </Button>
          </Content>
        </Col>
      </Row>
      {/* <Button type="primary" onClick={()=>showModal()}>
          Open Modal
        </Button> */}
      <Modal
        title={currentUser.id? `Chi tiết user #${currentUser.id}` : 'Thêm  mới user'} 
        visible={visible}
        onOk={currentUser.id ? () => handleOk() : ()=> postUser()}
        onCancel={() => handleCancel()}
        okText={currentUser.id ? 'Cập Nhật' : 'Thêm Mới'}
        cancelText="Huỷ"
      >
        {/* <p>{currentUser.id}</p>
        <p>Some contents...</p>
        <p>Some contents...</p> */}
        <Row justify="center">
          <Col span={24}>
            <Content className="modal_cus" style={{ padding: "15px 0px" }}>
              <div className="header_img">
                <Avatar
                  src={currentUser.avatar}
                  shape="square"
                  size={104}
                  icon={<UserOutlined />}
                />
                <ImgCrop rotate>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    onRemove={onRemove}
                  >
                    {fileList.length < 1 && "+ Upload"}
                  </Upload>
                </ImgCrop>
              </div>
              <Form style={{ width: "100%" }} form={form} layout="vertical">
                <Form.Item label="Name">
                  <Input
                    value={currentUser.name}
                    onChange={(e) =>
                      setCurrentUser({ ...currentUser, name: e.target.value })
                    }
                    placeholder="Your name"
                  />
                </Form.Item>
              </Form>
            </Content>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default GetUsers;
