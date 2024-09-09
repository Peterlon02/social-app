//Importazione dei moduli necessari
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Creazione dell'app Express
const app = express();
const port = 5000;

// Configura la connessione a MongoDB
mongoose.connect('mongodb://localhost:27017/socialapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

// Middleware
app.use(cors());
app.use(express.json());

// Rotta di base per verificare che il server funzioni
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Importazione delle rotte 
const authRoutes = require ('./routes/auth')
const deleteUser = require('./routes/deleteUser')

// Uso delle rotte
app.use('/api/auth', authRoutes)
app.use('/api', deleteUser)
app.use('/api/uploads', express.static('uploads'));

// Avvia il server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});