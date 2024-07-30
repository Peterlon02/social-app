//importazione del modulo mongoose
const mongoose = require ('mongoose')

//Definizione dello schema per il modello utente
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},//Nome utente, obbligatorio e unico
    email: {type: String, required: true, unique: true },//Email, obbligatoria e unica
    password: {type: String, required: true}//Password obbligatoria
})  

// Creazione del modello utente basato sullo schema definito
const User = mongoose.model('User', UserSchema)

// Esportazione del modello utente
module.export = User