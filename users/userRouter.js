const express = require('express');
const User = require('./userDb.js');
const Posts = require('../posts/postDb.js');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  console.log('the post' ,req.body)
  User.insert(req.body)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(error => {
    res.status(500).json({ error: '500, server error!' });
  });
});

////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const postText = req.body.text;
  const userId = req.params.id;
  console.log(postText, userId);

  Posts.insert({ text: postText, user_id: userId })
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

router.get('/:id', validateUserId, (req, res) => {
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

router.get('/:id/posts', validateUserId, (req, res) => {
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

router.delete('/:id', validateUserId, (req, res) => {
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

router.put('/:id', validateUserId, (req, res) => {
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
  console.log('user id:', req.params.id);
  const userId = req.params.id;

  User.getById(userId) 
    .then(user => {
      if(user) {
        req.user = user;
      next();
    } else {
      res.status(400).json({ error: 'Invalid user ID' })
      next()
    }
    })
    .catch(err => {
      res.status(500).json({ error: 'Server failed', err })
    })
}

function validateUser(req, res, next) {
  // do your magic!
  console.log(req.body.name);
  const userName = req.body.name;

  if(userName){
    next();
  } else {
    res.status(400).json({ error: 'Missing user data!' })
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  console.log(req.body)
  const postText = req.body.text;

  if(postText){
    next();
  } else {
    res.status(400).json({ error: 'Missing user data!' })
    next();
  }  

  // next();
}

module.exports = router;
