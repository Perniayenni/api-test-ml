const { Router } = require("express");
const { searchItems, item } = require("../controllers/items");
const router = Router();

router.get("/", searchItems);

router.get("/:id", item);

module.exports = router;
