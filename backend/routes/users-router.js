const router = require('express').Router();
let User = require('../models/users-model');
let Page = require('../models/pages-model');
let Categorie = require('../models/categories-model');

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

// получение юзера по логину, 
// а затем pages и categories по ID полученного юзера
router.route('/:login').get((req, res) => {
    //console.log(req.params)
    let result = {user: '', pages: '', categories: ''}

    User.findOne({login: req.params.login}, (error, user) =>{
        for(var key in result){
            if(key === 'user') result[key] = user
        }
        Page.find({userId: user._id}, (error, pages) => {
            for(var key in result){
                if(key === 'pages') result[key] = pages 
            }
        })
        .catch(error => {
            res.status(400).json({
                error,
                message: 'Pages not found!'
            })
        });
        Categorie.find({userId: user._id}, (error, categories) => {
            for(var key in result){
                if(key === 'categories') result[key] = categories
            }
        })
        .catch(error => {
            res.status(400).json({
                error,
                message: 'Categories not found!'
            })
        })
        .then(() => {
            //console.log('result string_56', result)
            return res.status(200).json({
                success: true,
                data: result  
            })
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
  //console.log(req.body)
  const login = req.body.inputEmail;
  const pass = req.body.inputPassword;
  const status = 'user';

  const newUser = new User({login, pass, status});
  //console.log('string_78', newUser)
  newUser
  	.save()
    .then(() => {
    	return res.status(200).json({
    		success: true,
            data: newUser,
            message: 'User was created successful!'
    	})
    })
    .catch(error => {
    	return res.status(400).json({
    		error,
    		message: 'User not created!'
    	})
    });
});

// обновление user
router.route('/update/:id').put((req, res) => {
  //console.log(req.body)
  User.findOne({ _id: req.params.id }, (error, user) => {
    if (error) {
      return res.status(404).json({
          error,
          message: 'User not found!',
      })
    }
    user.login = req.body.login;
    user.pass = req.body.pass;

    user.save()
      .then(() => {
        return res.status(200).json({
          success: true,
          data: user,
          message: 'Password was updated successful!'
        })
      })
      .catch(error => {
        console.log(error)
        return res.status(400).json({
          error,
          message: 'User not updated!'
        })
      });
  })
});

module.exports = router;