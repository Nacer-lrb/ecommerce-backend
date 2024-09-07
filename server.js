require('dotenv').config(); // Charger les variables d'environnement

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const errorHandler = require('./middleware/errorMiddleWare');

const path = require('path');
const upload = require('./utils/fileUpload');
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
})); 
 
const PORT = process.env.PORT || 5000;



app.use("/api/users",userRoute);

app.use("/api/products",productRoute);


app.use(errorHandler); 

app.use("upload",express.static(path.join(__dirname,"upload")));
 

mongoose.connect(process.env.DATABASE_CLOUD)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error('Database connection error:', err);
});

  