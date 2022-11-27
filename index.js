const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const validator = require("validator");
const fileupload = require("express-fileupload");
const session = require("express-session");
const mysql = require("mysql");
require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use(
  fileupload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "382001",
//   database: "wwb",
//   port: "3306",
//   insecureAuth: true,
// });
const connection = mysql.createConnection({
  host: process.env.Host,
  user: process.env.User,
  password: process.env.Password,
  database: process.env.Database,
  insecureAuth: process.env.InsecureAuth,
});

const redirectlogin = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/");
  } else {
    next();
  }
};

const redirecthome = (req, res, next) => {
  if (req.session.user_id) {
    res.redirect("/home");
  } else {
    next();
  }
};

let time = 1000 * 60 * 15;

const {
  port = process.env.port || 3000,
  sec_var = "thatsIsSecret",
  sess_name = "sid",
  sess_time = time,
} = process.env;
app.use(
  session({
    name: sess_name,
    resave: false,
    saveUninitialized: true,
    secret: sec_var,
    resave: false,
    maxAge: sess_time,
    cookie: {
      secure: true,
      sameSite: true,
    },
  })
);
var a = [];

app.get("/foorm", (req, res) => {
  res.render("foorm");
  // res.sendFile(path.join(__dirname, "../public", "login.html"));
});
app.post("/foorm", (req, res) => {
  let samplefile;
  let uploadpath;
  if (!req.files) {
    return res.send("upload some file");
  }

  samplefile = req.files.samplefile;
  uploadpath = __dirname + "/upload/" + samplefile.name;
  console.log(samplefile);
  samplefile.mv(uploadpath, (err) => {
    if (err) {
      res.send(err);
    }
    res.send("done bro");
  });
});

app.get("/", (req, res) => {
  const { user_id } = req.session;
  res.render("BANK");
  // res.sendFile(path.join(__dirname, "../public", "BANK.html"));
});

app.get("/signin", redirecthome, (req, res) => {
  res.render("signin");
  // res.sendFile(path. join(__dirname, "../public", "signin.html"));
});

app.post("/signin", redirecthome, (req, res) => {
  let samplefile;
  let uploadpath;
  if (!req.files) {
    return res.send("upload some file");
  }

  samplefile = req.files.pic;
  uploadpath = __dirname + "/public/images/upload/" + samplefile.name;
  samplefile.mv(uploadpath, (err) => {
    if (err) {
      res.send(err);
    }
  });
  var namaewa = "../public/images/upload/" + samplefile.name;
  let sql =
    "INSERT INTO users_data VALUES(null,'" +
    req.body.name1 +
    "','" +
    req.body.mail +
    "','" +
    req.body.pno +
    "','" +
    req.body.addr +
    "','" +
    req.body.fname +
    "','" +
    req.body.pass +
    "','" +
    0 +
    "','" +
    namaewa +
    "')";
  if (validator.isEmpty(req.body.name1)) {
    res.send("PLEASE ENTER YOUR NAME...");
  } else if (!validator.isEmail(req.body.mail)) {
    res.send("PLEASE ENTER PROPER EMAIL ADDRESS...");
  } else if (validator.isEmpty(req.body.pno)) {
    res.send("PLEASE ENTER YOUR PHONE NUMBER...");
  } else if (validator.isEmpty(req.body.addr)) {
    res.send("PLEASE ENTER YOUR ADDRESS...");
  } else if (validator.isEmpty(req.body.fname)) {
    res.send("PLEASE ENTER YOUR FATHER'S NAME...");
  } else if (validator.isEmpty(req.body.pass)) {
    res.send("PLEASE ENTER YOUR PASSWORD...");
  } else {
    connection.query(sql, (err) => {
      if (err) {
        console.error();
      } else {
        connection.query(
          "SELECT * FROM users_data WHERE name='" + req.body.name1 + "';",
          (err, result) => {
            if (err) {
              console.log(err);
            }
            a = result;
            req.session.user_id = a[0].account;

            res.redirect("/home");
            // res.render("home", { naam: req.body.name1 });
          }
        );
      }
    });
  }
});

app.get("/login", redirecthome, (req, res) => {
  res.render("login");
  // res.sendFile(path.join(__dirname, "../public", "login.html"));
});

app.post("/login", redirecthome, (req, res) => {
  connection.query(
    "SELECT * FROM users_data WHERE account ='" + req.body.acco + "';",
    (error, result) => {
      if (error) res.send("wrong account number or password");
      a = result;
      req.session.user_id = a[0].account;
      if (req.body.passwrd === a[0].password) {
        res.redirect("/home");
      } else res.send("wrong account number or password");
    }
  );
});
app.get("/myaccount", redirectlogin, (req, res) => {
  let accval = a[0].account;
  connection.query(
    "SELECT * FROM users_data WHERE account ='" + accval + "';",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      a = result;
      res.render("myaccount", {
        userpicc: a[0].user_img,
        tacc: a[0].account,
        tname: a[0].name,
        tmail: a[0].gmail,
        tadd: a[0].address,
        tfather: a[0].father,
        tpno: a[0].pno,
        tamnt: a[0].ammount,
      });
    }
  );
});

app.get("/home", redirectlogin, (req, res) => {
  if (a[0].name !== "") {
    res.render("home", { naam: a[0].name });
  } else {
    res.render("home", { naam: req.body.name1 });
  }

  // res.sendFile(path.join(__dirname, "../public", "home.html"));
});
app.get("/credit", redirectlogin, (req, res) => {
  res.render("credit");
  // res.sendFile(path.join(__dirname, "../public", "credit.html"));
});
app.post("/credit", redirectlogin, (req, res) => {
  let accvalue = a[0].account;
  if (accvalue == req.body.cacc) {
    connection.query(
      "SELECT * FROM users_data WHERE account ='" + accvalue + "';",
      (err, result) => {
        a = result;
        if (err) {
          res.send("wrong accccount number");
        }
        var tot = parseInt(a[0].ammount) + parseInt(req.body.cmoney);
        if (req.body.cpass === a[0].password) {
          let sql = `UPDATE users_data
            SET ammount = ?
            WHERE account = ?`;
          let data = [tot, req.body.cacc];
          connection.query(sql, data, (error, result, fields) => {
            if (error) res.send("eeeeeeerrrrrrrrrooooooorrrrrrrrrrr");
            else res.redirect("/home");
          });
        } else res.send("wrong  password");
      }
    );
  } else res.send("wrong account number");
});

app.get("/debit", redirectlogin, (req, res) => {
  res.render("debit");
  // res.sendFile(path.join(__dirname, "../public", "debit.html"));
});

app.post("/debit", redirectlogin, (req, res) => {
  let accountvalue = a[0].account;
  if (accountvalue == req.body.dacc) {
    connection.query(
      "SELECT * FROM users_data WHERE account ='" + accountvalue + "';",
      (err, result) => {
        if (err) {
          res.send("wrong acccccount number");
        }
        a = result;

        var tot = parseInt(a[0].ammount) - parseInt(req.body.dmoney);

        if (req.body.dpass === a[0].password) {
          let sql = `UPDATE users_data
            SET ammount = ?
            WHERE account = ?`;
          let data = [tot, req.body.dacc];
          connection.query(sql, data, (error, result, fields) => {
            if (error) res.send("eeeeeeerrrrrrrrrooooooorrrrrrrrrrr");
            else res.redirect("/home");
          });
        } else res.send("wrong password");
      }
    );
  } else res.send("wrong account number");
});

app.post("/delete", (req, res) => {
  let del = a[0].account;
  connection.query(
    "DELETE FROM users_data WHERE account=?",
    [del],
    (err, result) => {
      if (err) throw err;
      else res.redirect("/");
    }
  );
});

app.get("/gett", (req, res) => {
  connection.connect((err) => {
    if (err) {
      console.log(err.message);
    }
    connection.query("SELECT * FROM users_data;", (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    });

    console.log("connected");
  });
});

app.post("/logout", redirectlogin, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.clearCookie(sess_name);
    res.redirect("/");
  });
});

app.get("*", (req, res) => {
  res.send("404");
});

app.listen(port, () => {
  console.log("Listening on port 3000");
});
