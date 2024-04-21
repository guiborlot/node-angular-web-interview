const express = require('express');
const personController = require('./controllers/person-controller');
const personMiddleware = require('./middlewares/person-middleware');
const router = express.Router();

router.get('/person', personController.getAll);
router.post('/person', personMiddleware.validateBody, personController.create);
router.delete(`/person/:id`, personController.deletePerson)
router.put(`/person/:id`, personMiddleware.validateBody, personController.updatePerson)

module.exports = router;
