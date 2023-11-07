const { Router } = require('express');
const router = Router();

const webhookControllers = require('../controllers/webhookControllers.js');

router.post('/', webhookControllers.handleWebhook);

module.exports = router;