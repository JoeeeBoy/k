const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(require("./Routers/client.route"));
app.use(require("./Routers/book.route"));
app.use(require("./Routers/genre.route"));
app.use(require("./Routers/feedback.route"));

mongoose
  .connect(
    "mongodb+srv://adlan:begaev@cluster0.uhqp6.mongodb.net/onlinelibrary?retryWrites=true&w=majority"
  )
  .then(() => console.log("Успешно соединились с сервером MongoDB"))
  .catch(() => console.log("Ошибка при соединении с сервером MongoDB"));

app.listen(3000, () => {
  console.log(`сервер с портом 3000 запущен`);
});
