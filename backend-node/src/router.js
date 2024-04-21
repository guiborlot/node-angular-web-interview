const express = require('express');
const personController = require('./controllers/person-controller');
const personMiddleware = require('./middlewares/person-middleware');
const professionController = require('./controllers/profession-controller');
const professionMiddleware = require('./middlewares/profession-middleware');
const router = express.Router();

router.get('/person', personController.getAll);
router.get('/person/:id', personController.get)
router.post('/person', personMiddleware.validateBody, personController.create);
router.delete('/person/:id', personController.deletePerson);
router.put('/person/:id', personMiddleware.validateBody, personController.updatePerson);

router.get('/profession/:id', professionController.get);
router.post('/profession', professionMiddleware.validateName, professionController.create);
router.delete('/profession/:id', professionController.deleteProfession);
router.put('/profession/:id', professionMiddleware.validateName, professionController.updateProfession);

module.exports = router;
