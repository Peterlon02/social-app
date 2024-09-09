// Importazione dei moduli necessari
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')// Importa il modello utente
const multer =require ('multer')
const cloudinary = require('../cloudinaryConfig');
const fs = require('fs');
const path = require('path');

// Creazione del router Express
const router = express.Router()

// Configura multer per salvare temporaneamente i file in memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Rotta di registrazione
router.post('/register', async(req, res) => {
    const { nome, cognome, username, email, password, dateOfBirth } = req.body;

    try {
        // Verifica se l'utente esiste già nel database
        const existingUser= await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        // Hash della password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Creazione di un nuovo utente
        const newUser = new User({
            username, 
            nome,
            cognome,
            email,
            password: hashedPassword,
            dateOfBirth
        })

        // Salvataggio del nuovo utente nel database
        await newUser.save()

        // Generazione di un token JWT per l'utente
        const token = jwt.sign({ userId: newUser._id }, 'secret', {expiresIn: '1h' })

        const { password: _, ...userWithoutPassword } = newUser.toObject();

        // Invio della risposta con il token JWT e l'ID utente
        res.status(201).json({ token, userWithoutPassword })
    }catch (err) {
        console.error('Errore', err);
        res.status(500).json({ message: 'Server error' })
    }
})

// Rotta di login
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        // Trova l'utente nel database usando l'email
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials'})
        }
        
        // Confronta la password fornita con l'hash salvato nel database
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generazione di un token JWT per l'utente
        const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' })

        // Invio della risposta con il token JWT e l'ID utente
        res.status(201).json({ token, user })
    }catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

//Rotta per aggiungere informazioni dell'utente
router.post('/add',upload.single('information'), async (req, res)=>{
    const { email, campo } = req.body;
  const file = req.file;



  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    // Carica l'immagine su Cloudinary
    const result = await cloudinary.uploader.upload_stream({ folder: 'BackgroundImage' }, (error, result) => {
      if (error) {
        throw new Error(error);
      }
      return result;
    }).end(file.buffer);  // Carica dal buffer del file

    // Trova l'utente e aggiorna il percorso dell'immagine
    const user = await User.findOne({ email });
    user[campo] = result.secure_url;  // Salva l'URL restituito da Cloudinary
    await user.save();

    res.status(200).json({ message: 'Immagine caricata con successo', imageUrl: result.secure_url });
  } catch (err) {
    console.error('Errore durante il caricamento dell\'immagine:', err);
    res.status(500).json({ message: 'Errore del server', error: err.message });
  }
})


// Esportazione del router
module.exports = router


