import Category from "../services/categories/schema";
import Organization from "../services/organization/schema";
import User from "../services/user/schema";
import Task from "../services/task/schema";
import Workspace from "../services/workspace/schema";

// one-to-many relations
Organization.hasMany(Workspace);
Workspace.belongsTo(Organization);

Workspace.hasMany(Task);
Task.belongsTo(Workspace);

Task.hasMany(Category);
Category.belongsTo(Task);

// many-to-many relations
// Profile.belongsToMany(Profile, {
//     as: "Profile",
//     through: { model: FriendRequest, unique: false, onDelete: "CASCADE" },
//     foreignKey: "ProfileId",
//   });

export default { Category, Organization, User, Task, Workspace };
