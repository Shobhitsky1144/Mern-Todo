const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
const port = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const Todo = require("./UserModel");
mongoose
  .connect(
    "mongodb+srv://shobhitsky1144:Jacky263152@cluster0.g9ue1.mongodb.net/Cluster0?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then((res) => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("error", err);
  });

app.get("/getAll", async (req, res) => {
  await Todo.find()
    .then((Todo) => {
      // console.log(Todo);
      res.json(Todo);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/add", async (req, res) => {
  Todo.create({ name: req.body.name })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/delete/:id", async (req, res) => {
  // console.log("idd", req.params);
  const { id } = req.params;
  const data = await Todo.findByIdAndDelete(id)
    .then(() => {
      res.json({ msg: "deleeted" });
      console.log("deleted");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Todo.findById(id);
  res.json(data);
});

app.put("/update/:id", async (req, res) => {
  console.log(req.params.id);
  console.log("up", req.body);
  const user = await Todo.findByIdAndUpdate({ _id: req.params.id }, req.body);

  res.send("user updated");
});

app.listen(port, () => {
  console.log("server running");
});
