import Attachment from "../services/attachment/schema";
import Category from "../services/category/schema";
import Comment from "../services/comment/schema";
import Organization from "../services/organization/schema";
import OrganizationUser from "./relation_tables/OrganizationUser";
import Message from "../services/message/schema";
import User from "../services/user/schema";
import Task from "../services/task/schema";
import TaskUser from "./relation_tables/TaskUser";
import Workspace from "../services/workspace/schema";
import WorkspaceUser from "./relation_tables/WorkspaceUser";

// one-to-many relations
Organization.hasMany(Workspace);
Workspace.belongsTo(Organization);

Workspace.hasMany(Task);
Task.belongsTo(Workspace);

Task.hasMany(Category);
Category.belongsTo(Task);

Task.hasMany(Comment);
Comment.belongsTo(Task);

User.hasMany(Comment);
Comment.belongsTo(User);

Task.hasMany(Attachment);
Attachment.belongsTo(Task);

Workspace.hasMany(Message);
Message.belongsTo(Workspace);

User.hasMany(Message);
Message.belongsTo(User);

// many-to-many relations
User.belongsToMany(Organization, {
  through: { model: OrganizationUser }
});

User.belongsToMany(Workspace, {
  through: { model: WorkspaceUser }
});

User.belongsToMany(Task, {
  through: { model: TaskUser }
});

export default {
  Category,
  Comment,
  Organization,
  OrganizationUser,
  Message,
  User,
  Task,
  TaskUser,
  Workspace,
  WorkspaceUser
};
