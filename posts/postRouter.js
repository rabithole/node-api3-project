const express = require('express');
const Posts = require('./postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  console.log('get posts')
  Posts.get()
  .then(post => {
  	res.status(200).json(post);
  })
  .catch(error => {
  	res.status(500).json({ error: '500, server error!' });
  });
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  // console.log(req.params);
  const userId = req.params.id;

  Posts.getById(userId)
  .then(post => {
  	res.status(200).json(post);
  })
  .catch(error => {
  	res.status(500).json({ error: '500, server error' })
  })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  console.log(req.params, req.body);
  const postId = req.params.id;

  Posts.remove(postId)
  .then(post => {
  	res.status(200).json(post);
  })
  .catch(error => {
  	res.status(500).json({ error: '500, server error!' })
  })
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  console.log(req.params, req.body);
  const postId = req.params.id;
  const changes = req.body;

  Posts.update(postId, changes)
  .then(post => {
  	res.status(200).json(post);
  })
  .catch(error => {
  	res.status(500).json({ error: '500, server error!' })
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  console.log(req.params.id)
  const postId = req.params.id;
  Posts.getById(postId) 
  	.then(post => {
  		if(post) {
	  	next();
	  } else {
	  	res.status(404).json({ error: 'That id does not exist!' })
	  	next()
	  }
  	})
  	.catch(err => {
  		res.status(500).json({ error: 'Server failed', err })
  	})
  }
  

module.exports = router;
