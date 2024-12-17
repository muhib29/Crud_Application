/*********************************************************************/
// it is imam Hussain a.s institute CRUD Document
// facebook: fb.com/iHi.Karachi
// youTube: https://www.youtube.com/channel/UCa_Hun35Du0kAuWu-zkXyaQ
/*********************************************************************/


const express = require('express')
const app = express()
const mySQL = require('mysql')


const db = mySQL.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: '********',
        database: 'db_info'
    }
)


const BodyParser = require('body-parser')
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use(BodyParser.urlencoded({ extended: true }))

app.post("/api/NonQuery", (req, res) => {
   let mySQL = req.body.mySQL
   db.query(mySQL, (err, result) => {
    console.log(err)
    if (err == null)
        res.send('Done')
    else 
        res.send('Error')
  })
});
app.get ("/api/DataQuery", (req,res) => {
    const mySQL = req.query.sql
    db.query(mySQL, (err, result) => {
        console.log(result)
        res.send(result)
    })
}
);
app.listen(3001, () => {
    console.log('Hello iHi MySQL Server')
});
