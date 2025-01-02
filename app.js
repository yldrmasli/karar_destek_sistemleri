const express = require("express");
const path = require("path");
const sequelize = require("./config/db"); // Veritabanı bağlantısını içeren dosyanızın yolu
const session = require("express-session");


const authRoutes = require("./routes/authRoutes");
const { isAuthenticated } = require("./middlewares/authMiddleware");
const indexRoutes = require("./routes/indexRoutes");
const subelerRoutes = require("./routes/subelerRoutes");
const analizlerRoutes = require("./routes/analizlerRoutes");
const grafiklerRoutes = require("./routes/grafiklerRoutes");

require("./models/iliskiler");

const app = express();



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
      secret: "gizliAnahtar",
      resave: false,
      saveUninitialized: false,
  })
);

app.use("/auth", authRoutes);
app.use("/", isAuthenticated, indexRoutes);
app.use("/subeler", isAuthenticated, subelerRoutes);
app.use("/analizler", isAuthenticated, analizlerRoutes);
app.use("/grafikler", isAuthenticated, grafiklerRoutes);

// Veritabanını senkronize et
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Veritabanı başarıyla senkronize edildi.");
  })
  .catch((err) => {
    console.error("Veritabanı senkronizasyonunda hata:", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
