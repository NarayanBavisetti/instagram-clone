const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const User = require("./models/userSchema");
const Post = require("./models/postSchema");
const cors = require("cors")

dotenv.config({path: "./.env"})
const app = express();
const PORT = process.env.PORT || 5000;

const DB = process.env.DATABASE_URL;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex:true
} )
.then(() => console.log("DB connected"))
.catch((err) =>
    console.log(err)
)


app.use(express.json())
app.use(cors())
app.use(require("./routes/auth"))
app.use(require("./routes/posts"))

app.listen(PORT, () => {
  console.log(`PORT is running at ${PORT}`);
});
