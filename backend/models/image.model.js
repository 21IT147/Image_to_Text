import mongoose from 'mongoose';

const { Schema } = mongoose;

const imageSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  extractedText: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User' 
  }
});

const Image = mongoose.model('Image', imageSchema);

export default Image;
