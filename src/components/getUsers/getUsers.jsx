import React, { useEffect, useState } from "react";
import axios from "axios";
import "./getUsers.css";
import { Link } from "react-router-dom";
import {
  Table,
  Button,
  Container,
  Alert,
  Label,
  FormGroup,
  Input,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

import { useSelector } from "react-redux";
GetUsers.propTypes = {};

function GetUsers() {
  const [users, setUsers] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  const [visible, setVisible] = useState(false);
  const status = useSelector((state) => state.loginReducer);
  const [filter, setFiler] = useState({
    page: 1,
    limit: 10,
    search: "",
  });

  useEffect(() => {
    function getAllUsers() {
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
  }, [isFetch, filter]);
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
    let curName = e.target.value;
    setFiler({
      ...filter,
      page: 1,
      search: curName,
    });
  }
  function deleteUser(userId) {
    setVisible(true);
    axios
      .delete(
        `https://5ed504448769250016e63159.mockapi.io/api/qlnv/user/${userId}`
      )
      .then(() => {
        setIsFetch(!isFetch);
        setVisible(false);
      });
  }

  return (
    <Container>
      <Row style={{ padding: "20px 0px" }}>
        <Col md="3">
          <FormGroup>
            <Input
              onChange={(e) => {
                findByName(e);
              }}
              type="text"
              placeholder="Tìm theo tên"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <Pagination aria-label="Page navigation example">
            {filter.page > 1 && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => {
                    prePage();
                  }}
                >
                  Trang Sau
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  nextPage();
                }}
              >
                Trang Trước
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </Col>
      </Row>

      <Alert
        style={{
          position: "absolute",
          left: "70%",
          top: "30px",
        }}
        color="danger"
        isOpen={visible}
      >
        deleting ...
      </Alert>
      <Table borderless>
        <thead>
          <tr>
            <th>Stt</th>
            <th>Image</th>
            <th>Username</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1} </th>
              <td>
                <img width="40px" height="40px" src={item.avatar} alt="" />
              </td>
              <td>
                <Link to={`/dashboard/user/${item.id}`}>{item.name}</Link>
              </td>
              <td>
                {status && (
                  <Button
                    onClick={() => deleteUser(item.id)}
                    outline
                    color="danger"
                  >
                    Remove
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default GetUsers;
