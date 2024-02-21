const express=require("express")
const app=express()
const port= process.env.PORT || 3000
app.use(express.json())

//this is a in memory database whenever we restart the server it resets to it's default original value
let users=[{
    name:"kaibalya",
    kidneys:[
        {healthy: 'true'},
        {healthy: 'false'},
        {healthy: 'false'}
    ]
}]

app.get('/file/:filename',(req,res)=>{
    const filename=req.params.filename //means anything after file/ would be included in the filename
})

app.get('/status',(req,res)=>{
    const total_kidneys=users[0].kidneys.length
    let healthy_kidneys=0;
    for(let i=0;i<total_kidneys;i++){
        if(users[0].kidneys[i].healthy==='true'){
            healthy_kidneys++;
        }
    }
    const unhealthy_kidneys=total_kidneys-healthy_kidneys
    res.json({
        total_kidneys,
        healthy_kidneys,
        unhealthy_kidneys,
    })
})

app.post('/add-kidney',(req,res)=>{
    const kidney_arr=users[0].kidneys
    const isHealthy=req.body.isHealthy
    kidney_arr.push({healthy:isHealthy})
    res.json({
        msg:"kidney added"
    })
})

app.put('/make-all-healthy',(req,res)=>{

    //res.status(411).json({msg:"all kidneys are already healthy"})
    const arr=users[0].kidneys
    for(let i=0;i<arr.length;i++){
        arr[i].healthy='true'
    }
    //if we do not sent this data at the end the request would buffer infinitely
    res.json({
        msg:"made all kidneys healthy"
    })
})

app.delete('/remove-unhealthy',(req,res)=>{
    const new_kidneys=[]
    const arr=users[0].kidneys
    for(let i=0;i<arr.length;i++){
        if(arr[i].healthy==='true'){
            new_kidneys.push({healthy:'true'})
        }
    }
    users[0].kidneys=new_kidneys
    res.json({msg:"removed unhealthy kidneys"})
})

app.listen(3000,()=>{
    console.log(`server started at port ${port}`)
})