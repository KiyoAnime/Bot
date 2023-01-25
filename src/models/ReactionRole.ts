import { model, Model, Schema } from "mongoose";

interface ReactionRoleI {
    _id: number;
    name: string;
    role: string;
    group: number;
    emoji?: string;
    description: string;
}

export type ReactionRole = Model<ReactionRoleI>;
const reactionRoleSchema = new Schema<ReactionRoleI, ReactionRole>({
    _id: Number,
    name: { required: true, type: String },
    role: { required: true, type: String },
    group: { required: true, type: Number },
    emoji: { required: false, type: String },
    description: { required: false, type: String }
});

export default model('reactionRoles', reactionRoleSchema);
