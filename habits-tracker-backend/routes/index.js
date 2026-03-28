const express = require("express");
const router = express.Router();
const Habit = require("../models/Habit");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const tokenWithoutBearer = token.replace("Bearer ", "");
    const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ error: "Token invalido o expirado" });
  }
};

// GET página principal
router.get("/", function (req, res) {
  res.json({ message: "API funcionando" });
});

// GET obtener hábitos del usuario
router.get("/habits", authenticateToken, async (req, res) => {
  try {
    if (!req.user || !req.user.userid) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const userId = new mongoose.Types.ObjectId(req.user.userid);

    const habits = await Habit.find({ userID: userId });
    res.json(habits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving habits" });
  }
});

// POST crear hábito
router.post("/habits", authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.user || !req.user.userid) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const userId = new mongoose.Types.ObjectId(req.user.userid);

    const habit = new Habit({
      title,
      description,
      days: 0,
      userID: userId, 
    });

    await habit.save();

    res.json(habit);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error adding habit" });
  }
});

// DELETE eliminar hábito
router.delete("/habits/:id", authenticateToken, async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: "Habit deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Habit not found" });
  }
});

// PATCH marcar hábito como completado con 24 horas exactas
router.patch("/habits/markasdone/:id", authenticateToken, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const now = new Date();
    const lastDone = habit.lastDone ? new Date(habit.lastDone) : null;

    const getDateOnly = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };

// Primera vez
if (!lastDone) {
  habit.days = 1;
  habit.startedAt = now;
  habit.lastDone = now;
  habit.lastUpdate = now;

  await habit.save();
  return res.json({ habit, action: "started" });
}

const today = getDateOnly(now);
const lastDate = getDateOnly(lastDone);

// Diferencia en días calendario
const dayDiff = (today - lastDate) / (1000 * 60 * 60 * 24);

// 24h exactas
const diffMs = now.getTime() - lastDone.getTime();

//  MISMO DÍA → no cuenta doble
if (dayDiff === 0) {
  return res.json({ habit, action: "alreadyDone" });
}

// SIGUIENTE DÍA Y MENOS DE 24h → continúa racha
if (dayDiff === 1 && diffMs < 24 * 60 * 60 * 1000) {
  habit.days += 1;
  habit.lastDone = now;
  habit.lastUpdate = now;

  await habit.save();
  return res.json({ habit, action: "continued" });
}

// MÁS DE 24h → reinicia
habit.days = 1;
habit.startedAt = now;
habit.lastDone = now;
habit.lastUpdate = now;

await habit.save();
return res.json({ habit, action: "restarted" });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating habit" });
  }
});

module.exports = router;