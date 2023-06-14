const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const connection = mysql.createConnection({
  host: "baz4n9jsazwull2hq07k-mysql.services.clever-cloud.com",
  user: "uptpnxygmxqdjbdx",
  password: "L7RGh4wuYai0WmFUz84f",
  database: "baz4n9jsazwull2hq07k",
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json("Api listening");
});
app.post("/api/blog", (req, res) => {
  const { id, title, description, idcateblog, author, images } = req.body;
  const sql =
    "INSERT INTO blog (id, title, description, idcateblog, author, images) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [id, title, description, idcateblog, author, images];

  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    console.log("Inserted a blog with ID:", result.insertId);
    res.send("Blog inserted successfully");
  });
});
app.put("/api/blog/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, idcateblog, author, images } = req.body;

  const sql =
    "UPDATE blog SET title = ?, description = ?, idcateblog = ?, author = ?, images = ? WHERE id = ?";
  const values = [title, description, idcateblog, author, images, id];

  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    console.log("Updated the blog with ID:", id);
    res.send("Blog updated successfully");
  });
});
app.delete("/api/blog/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM blog WHERE id = ?";
  connection.query(sql, id, (err, result) => {
    if (err) throw err;
    console.log("Deleted the blog with ID:", id);
    res.send("Blog deleted successfully");
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
