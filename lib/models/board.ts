import mongoose, { Document, Schema } from "mongoose";

interface IBoard extends Document {
    name: string;
    userId: string;
    columns: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const BoardSchema = new Schema<IBoard>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: String,
        required: true,
        index: true
    },
    columns: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Column',
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Board || mongoose.model<IBoard>("Board",BoardSchema);