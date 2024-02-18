//npm init -- to initialize node - makes package.json file
//npm install package_name -- syntax to download any external package -- make node_modules folder and also package_lock.json file
//node file_name -- syntax to run any node.js file
//localhost:port -- to access the server on the web

const express=require("express")
const app=express()
const port=3000

app.get('/',(req,res)=>{
    
    //to get the body
    console.log(req.body)
    //to get the headers
    console.log(req.headers)
    //to get a specefic header
    console.log(req.headers['authorization'])

    res.send("hello world")
})

app.listen(port,()=>{
    console.log(`server in running on port ${port}`)
})
