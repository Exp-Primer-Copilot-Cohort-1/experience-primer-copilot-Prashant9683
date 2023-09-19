// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();
// Use cors for cross origin resource sharing
app.use(cors());
// Use body-parser to parse the request body
app.use(bodyParser.json());

// Comment data
const commentsByPostId = {};

// Request handlers
// Get comments by post id
app.get('/posts/:id/comments', (req, res) => {
  // Send the comments array for the post id or an empty array
  res.send(commentsByPostId[req.params.id] || []);
});

// Create a comment for a post
app.post('/posts/:id/comments', (req, res) => {
  // Generate a random id for the comment
  const commentId = randomBytes(4).toString('hex');
  // Get the comment content from the request body
  const { content } = req.body;
  // Get the comments array for the post id or an empty array
  const comments = commentsByPostId[req.params.id] || [];
  // Add the new comment to the comments array
  comments.push({ id: commentId, content, status: 'pending' });
  // Save the comments array for the post id
  commentsByPostId[req.params.id] = comments;
  // Send the new comment
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Comments service listening on port 4001');
});