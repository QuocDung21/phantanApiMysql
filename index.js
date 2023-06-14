const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();
const port = 6000;
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
  res.json("Hello, world!");
});

app.get("/api/blog", (req, res) => {
  connection.query("SELECT * FROM blog", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.get("/api/blog/:id", (req, res) => {
  const id = req.params.id;
  connection.query("SELECT * FROM blog WHERE id = ?", id, (err, rows) => {
    if (err) throw err;
    res.json(rows[0]);
  });
});

app.post("/api/blog", (req, res) => {
  const { id, title, description, idcateblog, author, images } = req.body;
  const values = [id, title, description, idcateblog, author, images];
  connection.query(
    "INSERT INTO blog (id, title, description, idcateblog, author, images) VALUES (?, ?, ?, ?, ?, ?)",
    values,
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Blog created successfully", id: result.insertId });
    }
  );
});

app.put("/api/blog/:id", (req, res) => {
  const id = req.params.id;
  const { title, description, idcateblog, author, images } = req.body;
  const values = [title, description, idcateblog, author, images, id];
  connection.query(
    "UPDATE blog SET title = ?, description = ?, idcateblog = ?, author = ?, images = ? WHERE id = ?",
    values,
    (err) => {
      if (err) throw err;
      res.json({ message: "Blog updated successfully", id });
    }
  );
});

app.delete("/api/blog/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM blog WHERE id = ?", id, (err) => {
    if (err) throw err;
    res.json({ message: "Blog deleted successfully", id });
  });
});

// API cho các bản ghi liên quan đến danh mục blog

app.get("/api/category", (req, res) => {
  connection.query("SELECT * FROM category", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.get("/api/category/:id", (req, res) => {
  const id = req.params.id;
  connection.query("SELECT * FROM category WHERE id = ?", id, (err, rows) => {
    if (err) throw err;
    res.json(rows[0]);
  });
});

app.post("/api/category", (req, res) => {
  const { id, name } = req.body;
  const values = [id, name];
  connection.query(
    "INSERT INTO category (id, name) VALUES (?, ?)",
    values,
    (err, result) => {
      if (err) throw err;
      res.json({
        message: "Category created successfully",
        id: result.insertId,
      });
    }
  );
});

app.put("/api/category/:id", (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  const values = [name, id];
  connection.query(
    "UPDATE category SET name = ? WHERE id = ?",
    values,
    (err) => {
      if (err) throw err;
      res.json({ message: "Category updated successfully", id });
    }
  );
});

app.delete("/api/category/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM category WHERE id = ?", id, (err) => {
    if (err) throw err;
    res.json({ message: "Category deleted successfully", id });
  });
});

// API cho các bản ghi liên quan đến người dùng

app.get("/api/user", (req, res) => {
  connection.query("SELECT * FROM user", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.get("/api/user/:id", (req, res) => {
  const id = req.params.id;
  connection.query("SELECT * FROM user WHERE id = ?", id, (err, rows) => {
    if (err) throw err;
    res.json(rows[0]);
  });
});

app.post("/api/user", (req, res) => {
  const { id, name, email } = req.body;
  const values = [id, name, email];
  connection.query(
    "INSERT INTO user (id, name, email) VALUES (?, ?, ?)",
    values,
    (err, result) => {
      if (err) throw err;
      res.json({ message: "User created successfully", id: result.insertId });
    }
  );
});

app.put("/api/user/:id", (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  const values = [name, email, id];
  connection.query(
    "UPDATE user SET name = ?, email = ? WHERE id = ?",
    values,
    (err) => {
      if (err) throw err;
      res.json({ message: "User updated successfully", id });
    }
  );
});

app.delete("/api/user/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM user WHERE id = ?", id, (err) => {
    if (err) throw err;
    res.json({ message: "User deleted successfully", id });
  });
});

app.get("/api/comment", (req, res) => {
  connection.query("SELECT * FROM comment", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.get("/api/comment/:id", (req, res) => {
  const id = req.params.id;
  connection.query("SELECT * FROM comment WHERE id = ?", id, (err, rows) => {
    if (err) throw err;
    res.json(rows[0]);
  });
});

app.post("/api/comment", (req, res) => {
  const { id, userId, postId, content } = req.body;
  const values = [id, userId, postId, content];
  connection.query(
    "INSERT INTO comment (id, user_id, post_id, content) VALUES (?, ?, ?, ?)",
    values,
    (err, result) => {
      if (err) throw err;
      res.json({
        message: "Comment created successfully",
        id: result.insertId,
      });
    }
  );
});

app.put("/api/comment/:id", (req, res) => {
  const id = req.params.id;
  const { content } = req.body;
  const values = [content, id];
  connection.query(
    "UPDATE comment SET content = ? WHERE id = ?",
    values,
    (err) => {
      if (err) throw err;
      res.json({ message: "Comment updated successfully", id });
    }
  );
});

app.delete("/api/comment/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM comment WHERE id = ?", id, (err) => {
    if (err) throw err;
    res.json({ message: "Comment deleted successfully", id });
  });
});

// API cho các bản ghi liên quan đến bài viết

app.get("/api/post", (req, res) => {
  connection.query("SELECT * FROM post", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.get("/api/post/:id", (req, res) => {
  const id = req.params.id;
  connection.query("SELECT * FROM post WHERE id = ?", id, (err, rows) => {
    if (err) throw err;
    res.json(rows[0]);
  });
});

app.post("/api/post", (req, res) => {
  const { id, userId, title, content } = req.body;
  const values = [id, userId, title, content];
  connection.query(
    "INSERT INTO post (id, user_id, title, content) VALUES (?, ?, ?, ?)",
    values,
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Post created successfully", id: result.insertId });
    }
  );
});

app.put("/api/post/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const values = [title, content, id];
  connection.query(
    "UPDATE post SET title = ?, content = ? WHERE id = ?",
    values,
    (err) => {
      if (err) throw err;
      res.json({ message: "Post updated successfully", id });
    }
  );
});

app.delete("/api/post/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM post WHERE id = ?", id, (err) => {
    if (err) throw err;
    res.json({ message: "Post deleted successfully", id });
  });
});

app.get("/api/review", (req, res) => {
  connection.query("SELECT * FROM review", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.get("/api/review/:id", (req, res) => {
  const id = req.params.id;
  connection.query("SELECT * FROM review WHERE id = ?", id, (err, rows) => {
    if (err) throw err;
    res.json(rows[0]);
  });
});

app.post("/api/review", (req, res) => {
  const { id, userId, postId, rating, comment } = req.body;
  const values = [id, userId, postId, rating, comment];
  connection.query(
    "INSERT INTO review (id, user_id, post_id, rating, comment) VALUES (?, ?, ?, ?, ?)",
    values,
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Review created successfully", id: result.insertId });
    }
  );
});

app.put("/api/review/:id", (req, res) => {
  const id = req.params.id;
  const { rating, comment } = req.body;
  const values = [rating, comment, id];
  connection.query(
    "UPDATE review SET rating = ?, comment = ? WHERE id = ?",
    values,
    (err) => {
      if (err) throw err;
      res.json({ message: "Review updated successfully", id });
    }
  );
});

app.delete("/api/review/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM review WHERE id = ?", id, (err) => {
    if (err) throw err;
    res.json({ message: "Review deleted successfully", id });
  });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
