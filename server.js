var express = require("express");
const exp = require("constants");
const cors = require("cors");
var app = express();
app.use(cors());
var mysql = require("mysql");
const { Console } = require("console");

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://", host, port);
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0712802283",
  database: "rm_project",
  multipleStatements: true,
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
  con.query(
    "SELECT * FROM recieved_applications ORDER BY application_id DESC",
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.put("/scheduled-date", function (req, res) {
  var Qualified = "Qualified";
  con.query(
    "UPDATE recieved_applications SET scheduled_date='" +
      req.body.scheduled_date +
      "' , scheduled_time='" +
      req.body.scheduled_time +
      "',qualification='" +
      Qualified +
      "' WHERE application_id='" +
      req.body.application_id +
      "'; INSERT INTO scheduled_applications SELECT * FROM 	recieved_applications WHERE application_id='" +
      req.body.application_id +
      "' ",
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.put("/not-qualified-table", function (req, res) {
  var NotQualified = "Not Qualified";
  con.query(
    "UPDATE recieved_applications SET qualification='" +
      NotQualified +
      "' WHERE application_id='" +
      req.body.application_id +
      "'; INSERT INTO scheduled_applications SELECT * FROM 	recieved_applications WHERE application_id='" +
      req.body.application_id +
      "'  ",
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.get("/scheduled-applications", function (req, res) {
  con.query("SELECT * FROM scheduled_applications", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/selected", function (req, res) {
  var Selected = "Selected";
  con.query(
    "UPDATE recieved_applications SET qualification='" +
      Selected +
      "' WHERE application_id='" +
      req.body.application_id +
      "'; UPDATE scheduled_applications SET qualification='" +
      Selected +
      "' WHERE application_id='" +
      req.body.application_id +
      "' ; INSERT INTO selected_table SELECT * FROM 	recieved_applications WHERE application_id='" +
      req.body.application_id +
      "' ",
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.get("/selected-applications", function (req, res) {
  con.query("SELECT * FROM selected_table", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.put("/not-selected-table", function (req, res) {
  var NotSelected = "Not Selected";
  con.query(
    "UPDATE recieved_applications SET qualification='" + NotSelected + "' ",
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////////
app.get("/added-services", function (req, res) {
  con.query("SELECT * FROM services_list", function (err, result) {
    if (err) throw err;
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

app.get("/appointment_details", function (req, res) {
  con.query("SELECT * FROM appointment_details", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/insert_vacancies", function (req, res) {
  con.query("SELECT * FROM  insert_vacancies", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.get("/staff_list", function (req, res) {
  con.query("SELECT * FROM  staff_list", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// app.post("/delete-services", function (req, res) {
//   con.query(
//     "DELETE FROM services_list WHERE service_id ='" +
//       req.body.service_id +
//       "' ;",
//     function (err, result) {
//       if (err) throw err;
//       res.send(result[0]);
//     }
//   );
// });

app.post("/adding-items", function (req, res) {
  con.query(
    "INSERT INTO item_list (item_name,item_description,item_per_price,item_qty) VALUES ('" +
      req.body.item_name +
      "', '" +
      req.body.item_description +
      "','" +
      req.body.item_per_price +
      "', '" +
      req.body.item_qty +
      "' );",
    function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    }
  );
});
app.get("/item-list", function (req, res) {
  con.query(
    "SELECT * FROM item_list ORDER BY item_id DESC;",
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});
app.post("/adding-suppliers", function (req, res) {
  con.query(
    "INSERT INTO supplier_details (supplier_name,supplier_company_name,supplier_address,supplier_email,supplier_pnumber) VALUES ('" +
      req.body.supplier_name +
      "', '" +
      req.body.supplier_company_name +
      "','" +
      req.body.supplier_address +
      "', '" +
      req.body.supplier_email +
      "', '" +
      req.body.supplier_pnumber +
      "' );",
    function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    }
  );
});
app.get("/supplier-list", function (req, res) {
  con.query(
    "SELECT * FROM  supplier_details ORDER BY supplier_id DESC;",
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});
app.get("/make-quotation", function (req, res) {
  con.query(
    "SELECT * FROM  quotation_details ORDER BY quotation_id DESC",
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});
app.post("/making-quotations", function (req, res) {
  con.query(
    "INSERT INTO quotation_details (supplier_name,items,comments) VALUES ('" +
      req.body.supplier_name +
      "','" +
      req.body.items +
      "', '" +
      req.body.comments +
      "' );",
    function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    }
  );
});
// app.put("/update-approval/:quotation_id", function (req, res) {
//   var Approved = "Approved";
//   var quotation_id = req.params.quotation_id;
//   con.query(
//     "UPDATE quotation_details SET status='" +
//       Approved +
//       "' WHERE quotation_id='" +
//       quotation_id +
//       "';",
//     (err, result) => {
//       if (err) throw err;
//       console.log("whats wrong!");
//       console.log(result);
//       res.send(result);
//     }
//   );
// });
// app.put("/update-disapproval", function (req, res) {
//   var DisApproved = "Disapproved";
//   con.query(
//     "UPDATE quotation_details SET status='" +
//       DisApproved +
//       "' WHERE quotation_id='" +
//       req.body.quotation_id +
//       "';",
//     (err, result) => {
//       if (err) throw err;
//       console.log("whats wrong!");
//       console.log(result);
//       res.send(result);
//     }
//   );
// });
