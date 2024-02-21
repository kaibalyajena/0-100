const express=require(express)
const zod=require(zod)
const app=express()
app.use(express.json())

function authMiddleware(req,res,next){
    //auth check
    next()
}

function inputValidationMiddleware(req,res,next){
    //validate inputs
    next()//if we remove this then thread would be stuck here
}

//we need to define a schema of how should our input be like
const schema=zod.array(zod.number())
app.get('/',(req,res)=>{
    const kidneys=req.body.kidneys
    const check=schema.safeParse(kidneys)
    if(check.success){

    }else{
        req.status(411).json({msg:"wrong inputs given"})
    }
})

//zod scema
const schema2=zod.object({
    name:zod.string(),
    country:zod.literal("IN").or(zod.literal("US"))
})
//view zod documentation
// .min()
// .email()
// .url()
// .length()

//to avoid calling middleware in every route below this line of code
app.use(authMiddleware)

app.get('/',authMiddleware,inputValidationMiddleware,(req,res)=>{
    res.send("all checks completed")
})

app.get('/hello',authMiddleware,inputValidationMiddleware,(req,res)=>{
    res.send("all checks completed")
})

app.post('/',authMiddleware,inputValidationMiddleware,(req,res)=>{
    res.send("all checks completed")
})

//global caches (control reaches here if there is an error in the above routes) so that user does not see the server errors and exceptions
app.use((err,req,res,next)=>{
    res.json({msg:"something went wrong"})
})

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})