import { model, Model, Schema } from 'mongoose';

interface ReactionRoleGroupI {
    _id: number;
    name: string;
    color: string;
    image: string;
    description: string;
}

export type ReactionRoleGroup = Model<ReactionRoleGroupI>;
const reactionRoleGroupSchema = new Schema<ReactionRoleGroupI, ReactionRoleGroup>({
    _id: Number,
    name: { required: true, type: String },
    color: { required: true, type: String },
    image: { required: false, type: String },
    description: { required: true, type: String }
});

export default model('reactionRoleGroups', reactionRoleGroupSchema);
