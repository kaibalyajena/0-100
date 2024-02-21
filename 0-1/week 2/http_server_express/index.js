//npm init -- to initialize node - makes package.json file
//npm install package_name -- syntax to download any external package -- make node_modules folder and also package_lock.json file
//node file_name -- syntax to run any node.js file
//http://localhost:port -- to access the server on the web
//nodemon file_name -- enhanced version of node as it restarts everytime there is any change in the node.js server code
//fetch("http://localhost:3000",{method:"POST"}).then(()=>{write your logic here}}) -- this is how to access a server from your frontend
//fs.readFile("a.txt","utf-8",(err,data)=>{})
//export PORT=3005 -- do this inside your terminal to set the environment variables

const express=require("express")
const bodyParser=require("body-parser")
const app=express()
const port=process.env.PORT || 3000
//it is used to read the body of the request which is in the json format
app.use(express.json())
//or we can also use
app.use(bodyParser.json())

app.get('/',(req,res)=>{

    //to get the body
    console.log(req.body)
    //to get the headers
    console.log(req.headers)
    //to get a specefic header
    console.log(req.headers['authorization'])
    //to get the query params
    //if the url is localhost:3000?message=123&a=45
    console.log(req.query.message)

    res.send("hello world")
})

app.listen(port,()=>{
    console.log(`server in running on port ${port}`)
})
