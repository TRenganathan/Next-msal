import { connectDB } from "@/db";
import User from "@/models/userModel";
import { ObjectId } from "mongodb";
export default async function handler(req, res) {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error("Failed to connect to database");
        }

        const { method } = req;
        switch (method) {
            case "GET":
                const getresult =  await db.collection('users').find({}).toArray();
                res.status(200).json({ status: "ok", data: getresult });
                break;
            case "POST":
                // const result = await User.insertOne({name: "detasad", email: 'test@gmail.com'},{ wtimeout: 20000 });
                const result =  await db.collection('users').insertOne(req.body, { wtimeout: 20000 });
                res.status(200).json({ status: "ok", data: result });
                break;
            case "PUT": 
                const { id, userData } = req.body;
                console.log(id,'IDDD');
                if (!id) {
                    throw new Error("User ID is required for update");
                }
                const updatedUser = await db.collection('users').findOneAndUpdate(
                    { _id: id },
                    { $set: userData }, // Use $set operator to update fields
                    { new: true },
                    { wtimeout: 20000 }
                );
                if (!updatedUser) {
                    throw new Error("User not found");
                }
                res.status(200).json({ status: "ok", data: updatedUser });
                    break;
            case "DELETE":
                const {data} = req.body;
                const deleteResult = await db.collection('users').deleteOne({ _id: new ObjectId(data._id) })
                if (deleteResult.deletedCount === 0) {
                    throw new Error("No document found to delete");
                }
                res.status(200).json({ status: "ok", data: req.body });
            default:
                res.status(405).json({ error: "Method Not Allowed" });
                break;
        }
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
