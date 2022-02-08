var express = require("express");
const exp = require("constants");
const cors = require("cors");
var app = express();
app.use(cors());
var mysql = require("mysql");
const { Console } = require("console");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0712802283",
  database: "rm_project",
});

if (!con) {
  con.connect(function (err) {
    if (err) throw err;
  });
}

app.use(express.json());

app.post("/login", function (req, res) {
  con.query(
    "SELECT * FROM signup WHERE role_email='" +
      req.body.role_email +
      "' and role_password='" +
      req.body.role_password +
      "';",
    function (err, result) {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong combination!" });
      }
    }
  );
});

app.post("/signup", function (req, res) {
  con.query(
    "INSERT INTO signup (role_fname,role_lname,role_email,role_password) VALUES ('" +
      req.body.role_fname +
      "','" +
      req.body.role_lname +
      "', '" +
      req.body.role_email +
      "', '" +
      req.body.role_password +
      "' );",
    function (err, result) {
      if (err) throw err;
      res.status(200).send(result[0]);
    }
  );
});

app.get("/recieved-applications", function (req, res) {
  con.query("SELECT * FROM recieved_applications", function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.put("/scheduled-date", function (req, res) {
  con.query(
    "UPDATE recieved_applications SET scheduled_date='" +
      req.body.scheduled_date +
      "' WHERE application_id='" +
      req.body.application_id +
      "' ",
    (err, result) => {
      if (err) throw err;
      console.log(result, "scheduled data");
      res.send(result);
    }
  );
});

app.get("/added-services", function (req, res) {
  con.query("SELECT * FROM services_list", function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post("/adding-services", function (req, res) {
  con.query(
    "INSERT INTO services_list (service_name) VALUES ('" +
      req.body.service_name +
      "' );",
    function (err, result) {
      if (err) throw err;
      res.send(result[0]);
    }
  );
});

app.get("/item-list", function (req, res) {
  con.query("SELECT * FROM item_list", function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//  app.put('/api/todo/check', function (req, res) {
//     if(con){
//        const r = con.query("SELECT * FROM to_do_list where id="+req.body.id+ ";",
//         function (err, result, fields) {
//            if (err) throw err;
//            console.log(result[0].id);

//       var status=0;
//       if(result[0].item_status==0){
//          status=1;
//       }else{
//          status=0;
//       }

//    con.query("UPDATE to_do_list set item_status =" +status+ " where id= " +req.body.id+ ";",
//       function (err, r, fields) {
//       if (err) throw err;
//       res.send(r);
//     });
//    });
//    } else {
//       res.send([]);
//    }
//  })

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://", host, port);
});
