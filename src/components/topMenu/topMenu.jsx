import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import {browserHistory} from 'react-router'
import { Avatar } from "antd";
import { Menu, Dropdown, Button, Typography } from "antd";
import firebase from "firebase";
import './topMenu.css'
import { MailOutlined, AppstoreOutlined, SettingOutlined ,UserOutlined, HomeOutlined ,AliwangwangOutlined} from '@ant-design/icons';
function TopMenu(props) {

  const menu = (
    <Menu>
      <Menu.Item>
        <Button type="primary" onClick={() => isLogout()} danger>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );
  const { Text } = Typography;
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const toggle = () => setIsOpen(!isOpen);
  const user = useSelector((state) => state.loginReducer);
  console.log("herer!!!!", user);
  function isLogout() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("logout success");
        dispatch({
          type: "LOGOUT",
        });
        document.location.replace('/')
      })
      .catch(function (error) {
       
      });
  }
  return (
    <div>
      <Menu  mode="horizontal">
        <Menu.Item key="logo" icon={<HomeOutlined   />}>
        <Link to="/">Home</Link>
        </Menu.Item>
        {
          user.isLogin && (

         <Menu.Item key="User" icon={<AliwangwangOutlined />}>
         <Link to="/user/">Users</Link>
        </Menu.Item>

          )
        }
        {!user.isLogin && (
           <Menu.Item orientation="left" key="login">

            <Button>
               
                  <Link to="/login/">Login</Link>
              
            </Button>
           </Menu.Item>
          )}
          {user.isLogin && (
          <Menu.Item orientation="left" key="text">
          <p style={{ margin: "0", padding: "0px 8px" }}>
           Hello <Text type="success">{user.user_info.displayName} !</Text>
         </p> 
           </Menu.Item>
          )}
           {user.isLogin && (
           <Menu.Item orientation="left" key="avatar">
            <Dropdown overlay={menu} placement="bottomRight" arrow>
             <Avatar src={user.user_info.photoURL} />
            </Dropdown>
         </Menu.Item>
          )}
      </Menu>

    </div>
  );
}

export default TopMenu;
