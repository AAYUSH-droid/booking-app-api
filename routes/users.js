const router = require("express").Router();

const userController = require("../handlers/users");

router.get("/users", userController.users);

router.post("/bookingDetails", userController.bookingDetails);

router.post("/sendMail", userController.sendTestMail);

router.post("/sendGmail", userController.sendGmail);

module.exports = router;
