const router = require('express').Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
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
/*
// получение юзера по логину, 
// а затем pages и categories по ID полученного юзера
router.route('/login').post( async (req, res) => {
    
    let result = {user: '', pages: '', categories: ''}

    await User.findOne({login: req.body.login}, async (error, user) =>{
        result.user = user;

        await Page.find({userId: user._id}, (error, pages) => {
          result.pages = pages;
        })
        .catch(error => {
            res.status(400).json({
                error,
                message: 'Pages not found!'
            })
        });
        await Categorie.find({userId: user._id}, (error, categories) => {
          result.categories = categories;
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
  console.log('string_75', newUser)
  newUser
  	.save()
    .then(() => {
      console.log('string_79', newUser)
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
*/

// обновление user
router.route('/update/:id').put((req, res) => {
  //console.log(req.body)
  User.findOne({ _id: req.params.id }, async (error, user) => {
    if (error) {
      const data = {error, message: 'User not found!'}
      return res.status(404).json(data)
    }

    let {inputNewPass, inputOldPass} = req.body;
    const isPasswordMatch = await bcrypt.compare(inputOldPass, user.pass);

    //console.log(isPasswordMatch);

    if(isPasswordMatch){
      user.pass = inputNewPass;

      user.save()
        .then(() => {
          const data = {
            success: true,
            data: user,
            message: 'Password was updated successful!'
          } 
          return res.status(201).json(data)
        })
        .catch(error => {
          const data = {error, message: 'User not updated!'}
          return res.status(400).json(data)
          console.log(error)
        });
      }else{
        const data = {error, message: 'Entered incorrect old Password'}
        return res.status(201).json(data)
      }
  })
});

//========================================//
// https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122

// Создать нового пользователя
router.route('/new').post( async (req, res) => {
    // Create a new user
    try {
      const obj = {login: req.body.inputEmail, pass: req.body.inputPassword, status: 'user'}
      const user = new User(obj)
      await user.save()
      const token = await user.generateAuthToken()
      const data = { user, token, message: 'User was created successful!' }
      res.status(201).send(data)
    } 
    catch (error) {
        res
          .status(400)
          .send({error, message: 'New user is not created'})
    }
})

// Войти зарегистрированному пользователю
router.route('/enter').post( async (req, res) => {
    //Login a registered user
    try{
      const { login, pass } = req.body
      const user = await User.findByCredentials(login, pass)
      const {error} = user
      if (error) {
        const data = {error}
        //console.log('string_152', data)
        res.status(201).send(data)
      }
      else{
        const token = await user.generateAuthToken()
        const pages = await Page.find({userId: user._id})
        const categories = await Categorie.find({userId: user._id})

        const data = {user, token, pages, categories }
        res.status(201).send(data)
      }
    } 
    catch (error) {
      res.status(400).send({error, message: 'Login is failed'})
    }
})

// Восстановление пароля пользователя
router.route('/reset-pass').post( async (req, res) => {

  const { inputLogin } = req.body
  //console.log('string_185', inputLogin)

  User.findOne({ login: inputLogin }, async (error, user) => {
    if (error) {
      const data = {error, message: 'User not found!'}
      return res.status(404).json(data)
    }
    if (!user) {
      const data = {error, message: `Your email ${inputLogin} not registered!`}
      return res.status(201).json(data)
    }
    else{
      user.pass = await User.getRundomPass();
      await User.sendNewPassword(user);

      user.save()
        .then(() => {
          const data = {
            success: true,
            //data: user,
            message: `New Password sent on ${inputLogin}, Check spam`
          } 
          return res.status(201).json(data)
        })
        .catch(error => {
          const data = {error, message: 'Email not found!'}
          return res.status(400).json(data)
          console.log(error)
        });
    }
  })
})

// Просмотр авторизованного профиля пользователя
router.route('/me/:token').get( auth, async (req, res) => {
    // View logged in user profile
    res.send(req.user)
})

// Выход пользователя из приложения
router.route('/me/logout/:token').get( auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Выход пользователя из всех устройств
router.route('/me/logoutall/:token').get( auth, async (req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        const data = {user: req.user}
        res.status(201).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;