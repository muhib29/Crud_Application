const express = require("express");
const app = express();
const mySQL = require("mysql");

const db = mySQL.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Your_Password",
  database: "db_info",
});

const BodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(BodyParser.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to Imam Hussain A.S. Institute API");
});


app.post("/api/NonQuery", (req, res) => {
  let mySQL = req.body.mySQL.trim();
  let operation;
  if (mySQL.toUpperCase().startsWith("INSERT")) {
    operation = "inserted";
  } else if (mySQL.toUpperCase().startsWith("UPDATE")) {
    operation = "updated";
  } else if (mySQL.toUpperCase().startsWith("DELETE")) {
    operation = "deleted";
  }
  db.query(mySQL, (err, result) => {
    if (err) {
      return res.status(500).send({
        message: `Record already exists `,
        error: err.message,
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ 
        message: "No record found for the given ID!", 
        error: "Record not found" 
      });
    } else {
      res.send({
        message: `Record ${operation} successfully!`,
        result,
      });
    }
  });
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
  console.log("Hello iHi MySQL Server");
});
