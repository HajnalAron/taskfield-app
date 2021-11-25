import Category from "../services/categories/schema";
import Organization from "../services/organization/schema";
import OrganizationUser from "./relation_tables/OrganizationUser";
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

// many-to-many relations
User.belongsToMany(Organization, {
  as: "administartor",
  through: { model: OrganizationUser },
  foreignKey: "administratorId"
});

User.belongsToMany(Workspace, {
  as: "member",
  through: { model: WorkspaceUser },
  foreignKey: "memberId"
});

User.belongsToMany(Task, {
  as: "assignee",
  through: { model: TaskUser },
  foreignKey: "assigneeId"
});

export default {
  Category,
  Organization,
  OrganizationUser,
  User,
  Task,
  TaskUser,
  Workspace,
  WorkspaceUser
};
