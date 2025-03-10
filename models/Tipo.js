const { Schema, model } = require('mongoose');

const TipoSchema = new Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    description: { type: String },
}, { timestamps: true });

module.exports = model('Tipo', TipoSchema);