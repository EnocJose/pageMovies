const { Schema, model } = require('mongoose');

const MediaSchema = new Schema({
    serial: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    synopsis: { type: String, required: true },
    movieUrl: { type: String, required: true, unique: true },
    coverImage: { type: String }, // Assuming this will store a URL to the image
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    releaseYear: { type: Number, required: true },
    mainGenre: { type: Schema.Types.ObjectId, ref: 'Genero', required: true }, 
    mainDirector: { type: Schema.Types.ObjectId, ref: 'Director', required: true }, 
    producer: { type: Schema.Types.ObjectId, ref: 'Productora', required: true }, 
    type: { type: Schema.Types.ObjectId, ref: 'Tipo', required: true } 
}, { timestamps: true });

module.exports = model('Media', MediaSchema);