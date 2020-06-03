import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, Container, Alert } from "reactstrap";
function UserDetail() {
  let { id } = useParams();
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    function getUserById() {
      axios
        .get(`https://5ed504448769250016e63159.mockapi.io/api/qlnv/user/${id}`)
        .then((res) => {
          const user = res.data;
          setUser(user);
        });
    }
    getUserById();
  }, [id]);



  function updateUserById(e){
    setVisible(true) 
    let formData={
        ...user,
        name: user.name
    }
    
    axios.put(`https://5ed504448769250016e63159.mockapi.io/api/qlnv/user/${id}` ,formData )
    .then(()=>{
        setVisible(false)
    })

   
  }

 function changeData(e){
    setUser({
        ...user,
        name:e.target.value
    })
    console.log(e)
 }

  return (
      <Container>
 <Alert style={{
            position:'absolute',
            left:'70%',
            top: '30px'   }} 
           color="success" 
           isOpen={visible}>
   
     
    doing ...
    </Alert>
    
    <Form>
      <FormGroup>
        <Label>Username</Label>
        <Input
          type="text"
          value={user.name}
          placeholder="Your User Name"
          onChange={(e)=>changeData(e)}
        />
      </FormGroup>
      {/* <FormGroup>
        <Label for="exampleFile">File</Label>
        <Input type="file" name="file" id="exampleFile" />
        <FormText color="muted">
          This is some placeholder block-level help text for the above input.
          It's a bit lighter and easily wraps to a new line.
        </FormText>
      </FormGroup> */}
      <Button outline color="primary" onClick={()=>{updateUserById()}}>Update</Button>
    </Form>
    </Container>
  );
}

export default UserDetail;
