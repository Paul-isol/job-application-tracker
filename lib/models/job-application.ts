import mongoose, { Schema, Document } from "mongoose";

interface IJobApplication extends Document {
    company: string;
    position: string;
    location?: string;
    status: string;
    columnId: mongoose.Types.ObjectId;
    boardId: mongoose.Types.ObjectId;
    userId: string;
    order: number;
    notes?: string;
    salary?: string;
    jobUrl?: string;
    appliedDate?: Date;
    tags?: string[];
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

const JobApplicationSchema = new Schema<IJobApplication>({
    company: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['applied', 'interviewing', 'offer', 'rejected', 'wishlist', 'accepted'],
        default: 'applied'
    },
    columnId: {
        type: Schema.Types.ObjectId,
        ref: 'Column',
        required: true,
        index: true
    },
    boardId: {
        type: Schema.Types.ObjectId,
        ref: 'Board',
        required: true,
        index: true
    },
    userId: {
        type: String,
        required: true,
        index: true
    },
    order: {
        type: Number,
        required: true,
        default: 0
    },
    notes: {
        type: String,
        trim: true
    },
    salary: {
        type: String,
        trim: true
    },
    jobUrl: {
        type: String,
        trim: true
    },
    appliedDate: {
        type: Date
    },
    tags: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.JobApplication || 
    mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);