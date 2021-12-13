import { Router } from "express";
import createHttpError from "http-errors";
import { UserAuthMiddleWare } from "../../auth/UserAuthMiddleWare";
import WorkspaceUser from "../../db/relation_tables/WorkspaceUser";
import Organization from "../organization/schema";
import User from "../user/schema";
import Workspace from "./schema";
import { workspaceIstance } from "./schema";

const router = Router();

router.get("/my", UserAuthMiddleWare, async (req, res, next) => {
  try {
    const workspaces = await WorkspaceUser.findAll({
      where: { userId: req.user!.id }
    });
    if (workspaces) {
      const workspacesData: workspaceIstance[] = [];
      await Promise.all(
        workspaces.map(async (workspace) => {
          const workData = await Workspace.findByPk(workspace.id);
          if (workData) {
            workspacesData.push(workData);
          }
        })
      );
      res.send(workspacesData);
    } else next(createHttpError(404, "No organizations found for this user"));
  } catch (error) {
    next(error);
  }
});

router.get("/organization/:organizationId", async (req, res, next) => {
  try {
    const targetOrganization = await Organization.findByPk(
      req.params.organizationId
    );
    if (targetOrganization) {
      const workspaces = await Workspace.findOne({
        where: { organizationId: req.params.organizationId }
      });
      if (workspaces) {
        res.send(workspaces);
      } else
        next(
          createHttpError(
            404,
            "Workspaces not found for organziation with the id of " +
              req.params.organizationId
          )
        );
    } else
      next(
        createHttpError(
          404,
          "Organization not found  with the id of " + req.params.organizationId
        )
      );
  } catch (error) {
    next(error);
  }
});

router.get("/:workspaceId", async (req, res, next) => {
  try {
    const workspace = await Workspace.findByPk(req.params.workspaceId);
    if (workspace) {
      res.send(workspace);
    } else
      next(
        createHttpError(
          404,
          "Workspaces not found  with the id of " + req.params.workspaceId
        )
      );
  } catch (error) {
    next(error);
  }
});

router.post("/users/:workspaceId/:userId", async (req, res, next) => {
  try {
    const targetWorkspace = await Workspace.findByPk(req.params.workspaceId);
    const targetUser = await User.findByPk(req.params.userId);
    if (targetWorkspace && targetUser) {
      await WorkspaceUser.create({
        workspaceId: req.params.workspaceId,
        userId: req.params.userId
      });
      res.status(204).send();
    } else
      next(
        createHttpError(404, "Please provide valid user and work space ids")
      );
  } catch (error) {
    next(error);
  }
});

router.delete("/users/:workspaceId/:userId", async (req, res, next) => {
  try {
    const targetWorkspace = await Workspace.findByPk(req.params.workspaceId);
    const targetUser = await User.findByPk(req.params.userId);
    if (targetWorkspace && targetUser) {
      await WorkspaceUser.destroy({
        where: {
          userId: req.params.userId,
          workspaceId: req.params.workspaceId
        }
      });
      res.status(204).send();
    } else
      next(
        createHttpError(404, "Please provide valid user and work space ids")
      );
  } catch (error) {
    next(error);
  }
});

router.post("/:organizationId/create", async (req, res, next) => {
  try {
    const targetOrganization = await Organization.findByPk(
      req.params.organizationId
    );
    if (targetOrganization) {
      await Workspace.create({
        ...req.body,
        organizationId: req.params.organizationId
      });
      res.status(204).send();
    } else
      next(
        createHttpError(
          404,
          "Organization not found  with the id of " + req.params.organizationId
        )
      );
  } catch (error) {
    next(error);
  }
});

router.put("/:workspaceId", async (req, res, next) => {
  try {
    const targetWorkspace = await Workspace.findByPk(req.params.workspaceId);
    if (targetWorkspace) {
      await targetWorkspace.update(req.body);
      res.status(204).send();
    } else
      next(
        createHttpError(
          404,
          "Workspace not found  with the id of " + req.params.workspaceId
        )
      );
  } catch (error) {
    next(error);
  }
});

router.delete("/:workspaceId", async (req, res, next) => {
  try {
    const targetWorkspace = await Workspace.findByPk(req.params.workspaceId);
    if (targetWorkspace) {
      await targetWorkspace.destroy();
      res.status(204).send();
    } else
      next(
        createHttpError(
          404,
          "Workspace not found  with the id of " + req.params.workspaceId
        )
      );
  } catch (error) {
    next(error);
  }
});

export default router;
