import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("db connect")
        // Drop stale phone index if it exists
        const userCollection = mongoose.connection.collection("users")
        const indexes = await userCollection.indexes()
        if (indexes.some(i => i.name === "phone_1")) {
            await userCollection.dropIndex("phone_1")
            console.log("Dropped stale phone_1 index")
        }
    } catch (error) {
        console.log("Error in database")
    }
}

export default connectDB
