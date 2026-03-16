const express = require("express");
const router = express.Router();
const Habit = require("../models/Habit");

// GET página principal
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

// GET obtener todos los hábitos
router.get("/habits", async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving habits" });
  }
});

// POST crear hábito
router.post("/habits", async (req, res) => {
  try {
    const { title, description } = req.body;

    const habit = new Habit({
      title,
      description,
      days: 0,
    });

    await habit.save();

    res.json(habit);
  } catch (err) {
    res.status(400).json({ message: "Error creating habit" });
  }
});

// DELETE eliminar hábito
router.delete("/habits/:id", async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: "Habit deleted" });
  } catch (err) {
    res.status(500).json({ message: "Habit not found" });
  }
});

// PATCH marcar hábito como completado
router.patch("/habits/markasdone/:id", async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const now = new Date();

    // Si nunca se ha hecho
    if (!habit.lastDone) {
      habit.days = 1;
      habit.startedAt = now;
      habit.lastDone = now;
      habit.lastUpdate = now;

      await habit.save();

      return res.json({ habit, action: "started" });
    }

    const hoursDifference = timeDifferenceInHours(now, habit.lastDone);

    // Si ya lo hizo hoy
    if (hoursDifference < 24) {
      return res.json({ habit, action: "alreadyDone" });
    }

    // Continuar racha (entre 24 y 48 horas)
    if (hoursDifference < 48) {
      habit.days += 1;
      habit.lastDone = now;
      habit.lastUpdate = now;

      await habit.save();

      return res.json({ habit, action: "continued" });
    }

    // Reiniciar racha (>48 horas)
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

// función para calcular diferencia en horas
const timeDifferenceInHours = (date1, date2) => {
  const differenceMs = Math.abs(date1 - date2);
  return differenceMs / (1000 * 60 * 60);
};

module.exports = router;