const express = require('express');
const User = require('./userDb.js');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  console.log(req.body)
  User.insert(req.body)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(error => {
    res.status(500).json({ error: '500, server error!' });
  });
});


// What is this supposed to do? 
router.post('/:id/posts', (req, res) => {
  // do your magic!
  const postText = req.body.text;
  const userId = req.params.id;

  User.getById(postText)
  .then(post => {
    res.status(200).json({ success: `${postText} has been posted to user id ${userId}` })
  })
  .catch(error => {
    res.status(500).json({ error: '500, server error!' })
  })
});

router.get('/', (req, res) => {
  // do your magic!
  User.get()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(error => {
    res.status(500).json({ error: '500, server error!' })
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  const userId = req.params.id;

   User.getById(userId)
  .then(users => {
    res.status(200).json(users);
  })
  .catch(error => {
    res.status(500).json({ error: '500, server error!' })
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  console.log(req.params.id);
  const userId = req.params.id;

  User.getUserPosts(userId)
  .then(userPosts => {
    res.status(200).json(userPosts)
  })
  .catch(error => {
    res.status(500).json({ error: '500, server error!' })
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  console.log(req.params);
  const userId = req.params.id;

  User.remove(userId)
  .then(user => {
    res.status(200).json({ success: 'The user is gone!' })
  })
  .catch(error => {
    res.status(500).json({ error: '500, server error!' })
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
  console.log(req.params, req.body);
  const userId = req.params.id;
  const changes = req.body;

  User.update(userId, changes)
  .then(user => {
    res.status(200).json({ success: 'The user has been updated!' })
  })
  .catch(error => {
    res.status(500).json({ error: '500, server error!' })
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
