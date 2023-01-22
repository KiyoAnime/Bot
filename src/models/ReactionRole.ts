import { model, Model, Schema } from "mongoose";

interface ReactionRoleI {
    _id: number;
    name: string;
    role: string;
    emoji: string;
    group: number;
    description: string;
}

export type ReactionRole = Model<ReactionRoleI>;
const reactionRoleSchema = new Schema<ReactionRoleI, ReactionRole>({
    _id: Number,
    name: { required: true, type: String },
    role: { required: true, type: String },
    emoji: { required: false, type: String },
    group: { required: true, type: Number },
    description: { required: false, type: String }
});

export default model('reactionRoles', reactionRoleSchema);
