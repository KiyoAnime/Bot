import { model, Model, Schema } from "mongoose";

interface InfractionI {
    _id: number;
    user: string;
    reason: string;
    createdAt: Date;
    duration?: string;
    moderator: string;
    type: 'BAN'|'WARN'|'KICK'|'TIMEOUT'|'SOFT-BAN';
}

export type Infraction = Model<InfractionI>;
const infractionSchema = new Schema<InfractionI, Infraction>({
    _id: Number,
    type: { required: true, type: String },
    user: { required: true, type: String },
    reason: { required: true, type: String },
    duration: { required: false, type: String },
    moderator: { required: true, type: String },
}, { timestamps: true });

export default model('infractions', infractionSchema);
