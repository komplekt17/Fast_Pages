const router = require('express').Router();
let Categorie = require('../models/categories-model');

// получение всех categories от всех юзеров
router.route('/').get((req, res) => {
  Categorie.find()
    .then(categories => res.json(categories))
    .catch(err => res.status(400).json('Error: ' + err));
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
  const name = req.body.name;
  const link = req.body.link;
  const ctgrId = req.body.ctgrId;
  const userId = req.body.userId;
  const screen = req.body.screen;

  const newPage = new Categorie({
    name,
    link,
    ctgrId,
    userId,
    screen
  });

  newPage.save()
  .then(() => res.json('Categorie added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// выборка categorie по своему ID
router.route('/:id').get((req, res) => {
  Categorie.findById(req.params.id)
    .then(categorie => res.json(categorie))
    .catch(err => res.status(400).json('Error: ' + err));
});

// удаление categorie по своему ID 
router.route('/:id').delete((req, res) => {
  Categorie.findByIdAndDelete(req.params.id)
    .then(() => res.json('Page deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// обновление categorie
router.route('/update/:id').post((req, res) => {
  Categorie.findById(req.params.id)
    .then(categorie => {
      categorie.name = req.body.name;
      categorie.description = req.body.description;
      categorie.duration = Number(req.body.duration);
      categorie.date = Date.parse(req.body.date);

      categorie.save()
        .then(() => res.json('Categorie updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;