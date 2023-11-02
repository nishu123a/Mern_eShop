require("dotenv").config(); //LOAD ENV FROM.env to process.env
const mongoose = require("mongoose");  
const express = require("express");
const app = express(); 
 
const bodyParser = require("body-parser"); 
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user"); 
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

//DB Connection
mongoose
  .connect(process.env.DATABASE, {// to access an environment variable named "DATABASE" using Node.js's process.env object. 
    useNewUrlParser: true,// to use new mongoDb connection string parser
    useUnifiedTopology: true,//set to true to use new server discovery and monitoring
    useFindAndModify: false, // Set useFindAndModify to false to suppress the deprecation warning

    useCreateIndex: true//ensure u are using new function call
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares 
//body-p is used to parse the body of incoming HTTP requests.
//cookie-parser middleware is used to parse cookies sent by clients in the HTTP request headers
app.use(bodyParser.json({limit:'500mb'}));
app.use(cookieParser());
app.use(cors(
));//permit which origin are given access to use server resources and how various HTTP methd are handled for CORS

//My Routes
app.use("/api", authRoutes);//// Mount the router on a specific path

app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

//PORT
const port = process.env.PORT||3000
//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
