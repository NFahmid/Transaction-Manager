import mongoose from 'mongoose';

async function connect(){
    await mongoose.connect("mongodb+srv://mernstack123:mernstack123@cluster0.gxdpecz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.log('MongoDB connection error:', err);
});
}

export default connect; 

