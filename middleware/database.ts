import {connect} from 'mongoose';

const connectDB = async () => {
  await connect(process.env.NEXT_PUBLIC_DB_URL);
}

export default connectDB;
