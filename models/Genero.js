const { Schema, model } = require('mongoose');

const GeneroSchema = new Schema({
    name: { type: String, required: true },
    state: { type: String, required: true, enum: ['Activo', 'Inactivo'] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    description: { type: String },
}, { timestamps: true });

module.exports = model('Genero', GeneroSchema);