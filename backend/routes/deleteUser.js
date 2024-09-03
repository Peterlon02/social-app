const express = require('express');
const User = require('../models/User')// Importa il modello utente
// Creazione del router Express
const router = express.Router()



//Rotta di eliminazione Utente
router.delete('/user/:email', async (req, res) => {
  const {email} =req.params
  
  try{
    const user = await User.findOneAndDelete({ email });

    if (user) {
        return res.status(200).json({ message: 'Utente eliminato con successo.' });
      }

      res.status(404).json({ message: 'Utente non trovato.' });
  }catch (err) {
    console.error('Errore durante l\'eliminazione dell\'utente:', err);
    res.status(500).json({ message: 'Errore del server.' });
  }
})

module.exports= router