import { model, Model, Schema } from "mongoose";

interface InfractionI {
    _id: number;
    user: string;
    reason: string;
    moderator: string;
    type: 'BAN'|'WARN'|'KICK'|'TIMEOUT'|'SOFT-BAN'
}

export type Infraction = Model<InfractionI>;
const infractionSchema = new Schema<InfractionI, Infraction>({
    _id: Number,
    type: { required: true, type: String },
    user: { required: true, type: String },
    reason: { required: true, type: String },
    moderator: { required: true, type: String },
});

export default model('infractions', infractionSchema);
