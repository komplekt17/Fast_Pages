const router = require('express').Router();
let Categorie = require('../models/categories-model');

// получение всех categories от всех юзеров
router.route('/').get((req, res) => {
  Categorie.find()
    .then((categories) => {
      return res.status(200).json({
        success: true,
        data: categories
      })
    })
    .catch(error => {
      res.status(400).json({
        error,
        message: 'Categories not found!'
      })
    });
});

// получение categories по id юзера
router.route('/:id').get((req, res) => {
  Categorie.find({userId: req.params.id})
    .then((categories) => {
      return res.status(200).json({
        success: true,
        data: categories
      })
    })
    .catch(error => {
      res.status(400).json({
        error,
        message: 'Categorie not found!'
      })
    });
});

// добавление новой categorie
router.route('/add').post((req, res) => {

  const catName = req.body.catName;
  const catClass = req.body.catClass;
  const catColor = req.body.catColor;
  const catBGC = req.body.catBGC;
  const userId = req.body.userId;

  const newCategorie = new Categorie({
    catName,
    catClass,
    catColor,
    catBGC,
    userId
  });
  console.log('string 60: ', newCategorie)

  newCategorie
    .save()
    .then(() => {
      return res.status(200).json({
        success: true,
        data: newCategorie,
        message: 'New Categorie was created successful!'
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Categorie not created!'
      })
    });
});

// обновление categorie
router.route('/update/:id').put((req, res) => {
  //console.log(req.body)
  Categorie.findOne({ _id: req.params.id }, (error, categorie) => {
    if (error) {
      return res.status(404).json({
          error,
          message: 'Categorie not found!',
      })
    }

    categorie.catName = req.body.catName;
    categorie.catClass = req.body.catClass;
    categorie.catColor = req.body.catColor;
    categorie.catBGC = req.body.catBGC;
    categorie.userId = req.body.userId;

    categorie.save()
      .then(() => {
        return res.status(200).json({
          success: true,
          data: categorie,
          message: 'This categorie was updated successful!'
        })
      })
      .catch(error => {
        return res.status(400).json({
          error,
          message: 'Categorie not updated!'
        })
      });
  })
});

module.exports = router;