const express = require("express");
const router = express.Router();
const {
  getMenus,
  getMenu,
  createMenu,
  deleteMenu,
  updateMenu,
} = require("../controllers/menuController");

const { protect } = require("../middleware/authMiddleware");

// Re-route into note router
const noteRouter = require("./orderRoutes");
router.use("/:MenuId/notes", noteRouter);

router.route("/").get(protect, getMenus).post(protect, createMenu);

router
  .route("/:id")
  .get(protect, getMenu)
  .delete(protect, deleteMenu)
  .put(protect, updateMenu);

module.exports = router;
