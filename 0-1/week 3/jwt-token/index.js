const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json())

const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
    const findIndex=ALL_USERS.findIndex((user)=>{
        if(user.username===username && user.password===password){
            return true;
        }
    })
    if(findIndex===-1){
        return false;
    }else{
        return true;
    }
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }
  //to create the jwt token
  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    //to verify the json web token
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    const rest_users=ALL_USERS.filter((user)=>{
        if(user.username!=username){
            return true;
        }
    })
    res.status(200).json({rest_users})
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000)