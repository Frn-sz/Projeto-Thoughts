const express = require('express');
const router = express.Router();
const ThoughtController = require("../controller/ThoughtController");

//Helpers
const checkAuth = require('../helpers/auth').checkAuth;

router.get('/add', checkAuth, ThoughtController.createThought)
router.post('/add', checkAuth, ThoughtController.saveThought)

router.get('/edit/:id', checkAuth, ThoughtController.editThought)
router.post('/edit', checkAuth, ThoughtController.updateThought)


router.post('/remove', checkAuth, ThoughtController.removeThought)

router.get('/dashboard', checkAuth, ThoughtController.dashboard)
router.get('/', ThoughtController.showThoughts);



module.exports = router;