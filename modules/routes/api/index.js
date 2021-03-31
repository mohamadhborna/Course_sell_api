const {Router}  = require("express");

const apiV1 = require("../api/api-v1");
const apiV2 = require("../api/api-v2");
const router = new Router();

router.use('/v1' ,apiV1);
router.use('/v2' , apiV2);

module.exports = router