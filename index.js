const express = require("express");
const router = express.Router();
const usersRouter = require("./router/user.js");
const categoryRouter = require("./router/category.js");
const authRouter = require("./router/auth.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.use("/v1/category", categoryRouter);
app.use("/v1/auth", authRouter);

app.listen(3000, () => {
    console.log("server is running on port 3000")
});