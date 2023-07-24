import  express  from 'express';
import  mysql  from 'mysql';
import  cors  from 'cors';

const app = express()
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    port:3307,
    password:"",
    database:"db_employee"

})

app.get("/",(req,res)=>{
    res.json("hello you guys")
})

app.get("/employee",(req,res)=>{
    const q = "SELECT * FROM employee"
    db.query(q,(err,data)=>{
        if(err) {return res.json(err)}
        return res.json(data)
    })
})

app.post("/employee",(req,res)=>{
    const q = "INSERT INTO employee (`name`,`phone`,`description`,`img`) VALUES (?)"
    const values = [
        req.body.name, 
        req.body.phone,
        req.body.description,
        req.body.img
    ]
    db.query(q,[values],(err,data)=>{
        if(err){
            return res.json(err)
        }
        return res.json("SUCCESSFULLY")
    })
})

app.delete("/employee/:id",(req,res)=>{
    const employeeID  = req.params.id;
    const q = "DELETE FROM employee WHERE id = ? "

    db.query(q,[employeeID],(err,data)=>{
        if(err){
            return res.json(err)
        }
        return res.json("DELETE SUCCESSFULLY")
    })
})

app.put("/employee/:id",(req,res)=>{
    const employeeID  = req.params.id;
    const q = "UPDATE employee SET `name` = ?,`phone` = ? ,`description` = ?,`img` = ? WHERE id = ? "
    const values = [
        req.body.name, 
        req.body.phone,
        req.body.description,
        req.body.img
    ]
    db.query(q,[...values,employeeID],(err,data)=>{
        if(err){
            return res.json(err)
        }
        return res.json("UPDATE SUCCESSFULLY")
    })
})

app.listen(8800, ()=>{
    console.log("Connected to backend");
})

