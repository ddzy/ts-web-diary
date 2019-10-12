import * as mongoose from 'mongoose';

const { Schema } = mongoose;


const CollectionPinSchema: mongoose.Schema = new Schema({
});

const CollectionPin: mongoose.Model<any> = mongoose
  .model('CollectionPin', CollectionPinSchema, 'CollectionPin');


export default CollectionPin;