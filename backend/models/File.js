const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true,
    enum: ['pdf', 'document', 'image', 'video', 'audio', 'other']
  },
  mimeType: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  tags: [String],
  metadata: {
    width: Number,
    height: Number,
    duration: Number,
    pages: Number
  }
}, {
  timestamps: true
});

// Index for search
fileSchema.index({ name: 'text', tags: 'text' });

module.exports = mongoose.model('File', fileSchema);