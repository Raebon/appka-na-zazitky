import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();
/*
body-parser je deprecated v express ve verzi  >= 4.16.0  byl Parser znovu přidán
app.use(bodyParser.json({limit: '30mb', extended:true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
*/

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//express midleware
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Vítej v API");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`))
  )
  .catch((err) => console.log(error.message));
