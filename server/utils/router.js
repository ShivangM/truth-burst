const express = require("express");
const Question = require("../models/QuestionModel");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Newsletter = require("../models/NewsletterModel");
const Contact = require("../models/ContactModel");

router.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

// Add Question 
router.post("/add-question",
  body('question').notEmpty(),
  body('question').isLength({ min: 15 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const question = new Question({
      question: req.body.question
    })

    try {
      await question.save()
    } catch (error) {
      return res.status(500).send({ response: "Some error occured" })
    }

    return res.status(200).send({ response: "Question Added" })
  });

// Contact
router.post("/contact",
  body('name').notEmpty(),
  body('email').notEmpty(),
  body('message').notEmpty(),
  body('name').isLength({ min: 3, max: 30 }),
  body('message').isLength({ min: 5, max: 300 }),
  body('email').isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const name = req.body.name
    const email = req.body.email
    const message = req.body.message

    const contact = new Contact({
      name,
      email,
      message
    })
    try {
      await contact.save()
    } catch (error) {
      return res.status(500).send({ response: "Some error occured" })
    }

    return res.status(200).send({ response: "Message sent" })
  });

// Add to Newsletters 
router.post("/newsletter",
  body('email').notEmpty(),
  body('email').isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newsletter = new Newsletter({
        email: req.body.email
      })

      await newsletter.save()
    } catch (error) {
      return res.status(400).send({ response: "User already registered to newletters" });
    }

    return res.status(200).send({ response: "Email Added to Newsletters" });
  });

// Unsubscribe to Newletters 
router.delete("/newsletter",
  body('email').notEmpty(),
  body('email').isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const del = await Newsletter.findOneAndDelete({email: req.body.email}).exec()
      return del? res.status(200).send({ response: "Email removed from newsletters" })
      : res.status(400).send({ response: "User not registered to newletters" })
    } catch (error) {
      return res.status(500).send({ response: "Some Error Occured" })
    }
  });

module.exports = router;