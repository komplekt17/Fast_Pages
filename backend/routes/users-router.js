const router = require('express').Router();
let User = require('../models/user-model');

// получение всех юзеров
router.route('/').get((req, res) => {
  User.find()
    .then((users) => {
    	return res.status(200).json({
    		success: true,
    		users
    	})
    })
    .catch(error => {
    	res.status(400).json({
    		error,
    		message: 'User not found!'
    	})
    });
});

// получение юзера по логину
router.route('/:login').get((req, res) => {
  User.findOne({login: req.params.login})
    .then((user) => {
    	return res.status(200).json({
    		success: true,
    		data: user
    	})
    })
    .catch(error => {
    	res.status(400).json({
    		error,
    		message: 'User not found!'
    	})
    });
});

// добавление нового юзера
router.route('/add').post((req, res) => {
  const login = req.body.login;
  const pass = req.body.pass;
  const status = 'user';

  const newUser = new User({login, pass, status});

  newUser
  	.save()
    .then(() => {
    	return res.status(200).json({
    		success: true,
        data: newUser,
        message: 'User created!'
    	})
    })
    .catch(error => {
    	return res.status(400).json({
    		error,
    		message: 'User not created!'
    	})
    });
});

module.exports = router;