const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling get requests to /users",
  });
});

router.get("/:userId", (req, res, next) => {
  const id = req.params.userId;
  if (id === "special") {
    res.status(200).json({
      message: "You disovered the special ID",
      id: id,
    });
  } else {
    res.status(200).json({
      message: "You passed an ID",
    });
  }
});

router.post("/", (req, res, next) => {
  const user = {
    username: req.body.username,
  };

  res.status(201).json({
    message: "Users were created",
    createdUser: user,
  });
});

router.patch("/:userId", (req, res, next) => {
  res.status(200).json({
    message: "Updated user",
  });
});

router.put("/:userId", (req, res, next) => {
  res.status(200).json({
    message: "updated user",
  });
});

router.delete("/:userId", (req, res, next) => {
  res.status(200).json({
    message: "Deleted user!",
  });
});

module.exports = router;
