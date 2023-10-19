const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling get requests to /events",
  });
});

router.get("/eventId", (req, res, next) => {
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
  const event = {
    eventName: eventName,
  };

  res.status(201).json({
    message: "Users were created",
    createdEvent: event,
  });
});

router.patch("/:userId", (req, res, next) => {
  res.status(200).json({
    message: "Updated event",
  });
});

router.put("/:userId", (req, res, next) => {
  res.status(200).json({
    message: "updated event",
  });
});

router.delete("/:userId", (req, res, next) => {
  res.status(200).json({
    message: "Deleted event!",
  });
});

module.exports = router;
