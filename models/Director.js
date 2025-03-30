const { Schema, model } = require('mongoose');

const DirectorSchema = new Schema({
    name: { type: String, required: true },
    state: { type: String, required: true, enum: ['Activo', 'Inactivo'] },
    coverImage:{type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true }); 

module.exports = model('Director', DirectorSchema);