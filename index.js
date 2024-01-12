const Koa = require("koa");
const app = new Koa();
const cors = require("koa-cors");
const { koaBody } = require("koa-body");
const { authRoutes } = require("./routes");

require("./db")();
app.use(koaBody());
app.use(cors());
app.use(authRoutes.routes()).use(authRoutes.allowedMethods());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("The server is up and running on the port:", PORT);
});
