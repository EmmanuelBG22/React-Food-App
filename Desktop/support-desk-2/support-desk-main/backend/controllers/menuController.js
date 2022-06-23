const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Menu = require('../models/MenuModel')

// @desc    Get user Menus
// @route   GET /api/Menus
// @access  Private
const getMenus = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const menus = await Menu.find({ user: req.user.id })

  res.status(200).json(menus)
})

// @desc    Get user Menu
// @route   GET /api/Menus/:id
// @access  Private
const getMenu = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const menu = await Menu.findById(req.params.id)

  if (!menu) {
    res.status(404)
    throw new Error('Menu not found')
  }

  if (menu.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(menu)
})

// @desc    Create new Menu
// @route   POST /api/Menus
// @access  Private
const createMenu = asyncHandler(async (req, res) => {
  const { restaurant, food, drink } = req.body


  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const menu = await Menu.create({
    restaurant,
    food,
    drink,
    user: req.user.id,
  })

  res.status(201).json(Menu)
})

// @desc    Delete Menu
// @route   DELETE /api/Menus/:id
// @access  Private
const deleteMenu = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const menu = await Menu.findById(req.params.id)

  if (!menu) {
    res.status(404)
    throw new Error('Menu not found')
  }

  if (menu.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  await menu.remove()

  res.status(200).json({ success: true })
})

// @desc    Update Menu
// @route   PUT /api/Menus/:id
// @access  Private
const updateMenu = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const menu = await Menu.findById(req.params.id)

  if (!menu) {
    res.status(404)
    throw new Error('menu not found')
  }

  if (menu.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const updatedMenu = await Menu.findByIdAndUpdate(
    req.params.id,
    req.body
  )

  res.status(200).json(updatedMenu)
})

module.exports = {
  getMenus,
  getMenu,
  createMenu,
  deleteMenu,
  updateMenu,
}
