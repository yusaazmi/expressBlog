const express = require("express");
const router = express.Router();
const authRouter = require("./router/auth.js");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const usersRouter = require("./router/user.js");
const fileRouter = require("./router/file.js");
const categoryRouter = require("./router/category.js");
const postRouter = require("./router/post.js");

const { verifyToken } = require('./middleware/authMiddleware.js');

const AuthController = require('./controllers/authController.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API Express Blog",
            version: "1.0.0",
            description: "Belajar NodeJS dengan ExpressJS",
            contact: {
                name: "Yusa Azmi",
            },
        },
    },
    apis: ["./router/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
swaggerDocs.components = {
    securitySchemes: {
        bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
        },
    },
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/v1/auth", authRouter);
app.use("/v1/upload", verifyToken, fileRouter);
app.use("/v1/profile", verifyToken, AuthController.getMyProfile);

app.use("/v1/user", usersRouter);
app.use("/v1/category", categoryRouter);
app.use("/v1/post", postRouter);

app.listen(3000, () => {
    console.log("server is running on port 3000")
});