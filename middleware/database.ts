import {connect} from 'mongoose';
import { config } from "dotenv";
config();

const connectDB = async () => {
  
  // Connect to MongoDB
  await connect(process.env.DB_URL);
  
}

export default connectDB;
