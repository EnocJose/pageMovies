const { Schema, model } = require('mongoose');

const ProductoraSchema = new Schema({
    name: { type: String, required: true },
    state: { type: String, required: true, enum: ['Activo', 'Inactivo'] },
    coverImage:{type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    slogan: { type: String },
    description: { type: String },
}, { timestamps: true });

module.exports = model('Productora', ProductoraSchema);