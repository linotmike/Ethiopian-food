const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

//const mysql = require('mysql');
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ethiopians_db",
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/foods", (req, res) => {
  db.query(`SELECT * FROM foods`, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "whoops whopps error", err: err });
    }
    res.json(data);
  });
});
app.get("/api/reviews", (req, res) => {
    db.query(
        `SELECT food_name,review FROM reviews
        JOIN foods 
        ON reviews.food_id=foods.id;
        `,
        
        (err, data) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ msg: "whoops whopps error",err : err });
          }
          res.json(data);
        }
      );
});
app.post("/api/new-foods", (req, res) => {
  db.query(
    `INSERT INTO foods (food_name) VALUES (?)`,
    req.body.food_name,
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "whoops whopps error",err : err });
      }
      res.json(data);
    }
  );
});
app.put("/api/reviews/:id", (req, res) => {
  db.query(`UPDATE reviews SET review = ? WHERE id = ?`,[req.body.review,req.params.id],(err,data)=>{
    if(err){
        res.status(500).json({msg:"Whoops Whoops failed to load on err", err:err})
    }
     res.json(data)
  })
});
app.delete("/api/foods/:id", (req, res) => {
  db.query(`DELETE FROM foods WHERE id = ?`,req.params.id,(err,data)=>{
    if(err){
        res.status(500).json({msg:"whoops whopps failed to load" ,err:err})
    } 
     res.json(data)

  })
});

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
