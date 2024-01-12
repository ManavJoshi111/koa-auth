const Router = require("koa-router");
const { authController } = require("../controllers");
const router = new Router();

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.post("/get-user", authController.getUser);

module.exports = router;
