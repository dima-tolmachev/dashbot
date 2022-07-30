import 'dotenv/config';
import mongoose from 'mongoose';

const databaseUrl = process.env.dbURL as string;

export default mongoose.connect(databaseUrl);
