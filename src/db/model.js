import mongoose, { Schema } from "mongoose";

const mctSchema = new Schema(
    {
        userId: String,
        date: String,
        macros: {
            calories: {
                target: Number,
                result: Number,
            },
            proteins: {
                target: Number,
                result: Number,
            },
            carbs: {
                target: Number,
                result: Number,
            },
            fats: {
                target: Number,
                result: Number,
            }
        }
    }
)

const Macro = mongoose.models.Macro || mongoose.model("Macro", mctSchema);

export default Macro