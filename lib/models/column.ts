import mongoose, {Schema, Document } from 'mongoose';

interface IColumn extends Document {
    name: string;
    boardId: mongoose.Types.ObjectId;
    order: number;
    jobApplications: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const ColumnSchema = new Schema<IColumn>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    boardId: {
        type: Schema.Types.ObjectId,
        ref: 'Board',
        required: true,
        index: true
    },
    order: {
        type: Number,
        required: true,
        default: 0
    },
    jobApplications: [
        {
            type: Schema.Types.ObjectId,
            ref: 'JobApplication'
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

export default mongoose.models.Column ||
 mongoose.model<IColumn>('Column', ColumnSchema);
