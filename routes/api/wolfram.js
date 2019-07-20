const express = require('express');
const router = express.Router();

const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI('H8GXYU-KH3KAUY4JG');

// Request from the client = /question=who+is+elon+musk
// Get request data

// @route GET / represents api/wolfram endpoint
router.get('/', (req, res) => {
  // req.body.params.question - encoded in the GET request
  const question = req.query.question;

  // upon success, return answer
  let responseAnswer;
  waApi
    .getShort(question)
    .then(answer => {
      res.json(answer);
    })
    .catch(console.error);
});

module.exports = router;
