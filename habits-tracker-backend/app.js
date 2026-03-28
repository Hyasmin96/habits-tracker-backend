require('./config/database');
require("dotenv").config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

// Rutas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// CORS (abierto para producción)
app.use(cors());

// Configuración de vistas (puedes dejarlo aunque no se use)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Registrar rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Manejo de rutas no encontradas
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejo de errores (IMPORTANTE: ahora en formato JSON)
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;