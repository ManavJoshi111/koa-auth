const Koa = require("koa");
const app = new Koa();
const PORT = 3000;

const successObject = {
  message: "Success",
  body: {
    name: "Manav Joshi",
    company: "SocialPilot",
  },
};

const errorObject = {
  message: "Error Occurred",
  body: {
    reason: "You accessed the error route",
    howToFix: "Go to another route",
  },
};

app.use(async function (ctx) {
  if (ctx.request.url === "/") {
    return (ctx.body = successObject);
  }
  ctx.response.status = 400;
  ctx.body = errorObject;
});

app.listen(PORT, function () {
  console.log("The app is listening on the port: ", PORT);
});
