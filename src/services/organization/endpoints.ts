import { Router } from "express";
import createHttpError from "http-errors";
import { UserAuthMiddleWare } from "../../auth/UserAuthMiddleWare";
import OrganizationUser from "../../db/relation_tables/OrganizationUser";
import User from "../user/schema";
import Organization, { organizationInstance } from "./schema";
const router = Router();

router.get("/my", UserAuthMiddleWare, async (req, res, next) => {
  try {
    const organizations = await OrganizationUser.findAll({
      where: { userId: req.user!.id }
    });
    if (organizations) {
      const organizationsData: organizationInstance[] = [];
      await Promise.all(
        organizations.map(async (org) => {
          const orgData = await Organization.findByPk(org.id);
          if (orgData) {
            organizationsData.push(orgData);
          }
        })
      );
      res.send(organizationsData);
    } else next(createHttpError(404, "No organizations found for this user"));
  } catch (error) {
    next(error);
  }
});

router.get("/:organizationId", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    await Organization.create(req.body);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
});

router.put("/:organizationId", async (req, res, next) => {
  try {
    const targetOrganization = await Organization.findByPk(
      req.params.organizationId
    );
    if (targetOrganization) {
      targetOrganization.update(req.body);
      res.send(targetOrganization);
    } else {
      next(
        createHttpError(
          404,
          "Organization not found with the id of " + req.params.organizationId
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:organizationId", async (req, res, next) => {
  try {
    const targetOrganization = await Organization.findByPk(
      req.params.organizationId
    );
    if (targetOrganization) {
      targetOrganization.destroy();
      res.status(204).send();
    } else {
      next(
        createHttpError(
          404,
          "Organization not found with the id of " + req.params.organizationId
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

router.post("/users/:organizationId/:userId", async (req, res, next) => {
  try {
    const targetOrganization = await Organization.findByPk(
      req.params.organizationId
    );
    const targetUser = await User.findByPk(req.params.userId);
    if (targetOrganization && targetUser) {
      await OrganizationUser.create({
        userId: req.params.userId,
        organizationId: req.params.organizationId
      });
      res.status(201).send();
    } else {
      next(
        createHttpError(
          404,
          "Organization not found with the id of " + req.params.organizationId
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/users/:organizationId/:userId", async (req, res, next) => {
  try {
    const targetOrganization = await Organization.findByPk(
      req.params.organizationId
    );
    if (targetOrganization) {
      const targetOrganizationUser = await OrganizationUser.findOne({
        where: {
          userId: req.params.userId,
          organizationId: req.params.organizationId
        }
      });
      if (targetOrganizationUser) {
        targetOrganizationUser.destroy();
        res.status(204).send();
      } else {
        next(
          createHttpError(
            404,
            "Organization and user connection not found with the provided data"
          )
        );
      }
    } else {
      next(
        createHttpError(
          404,
          "Organization not found with the id of " + req.params.organizationId
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

router.put("/changerole/:organizationId/:userId", async (req, res, next) => {
  try {
    const targetOrganization = await Organization.findByPk(
      req.params.organizationId
    );
    if (targetOrganization && req.body.role) {
      const targetOrganizationUser = await OrganizationUser.findOne({
        where: {
          userId: req.params.userId,
          organizationId: req.params.organizationId
        }
      });
      if (targetOrganizationUser) {
        await targetOrganizationUser.update({ role: req.body.role });
        res.send(targetOrganizationUser);
      } else {
        next(
          createHttpError(
            404,
            "Please provide an existing organization-user connection and a valid role to set"
          )
        );
      }
    } else {
      next(
        createHttpError(
          404,
          "Organization not found with the id of " + req.params.organizationId
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

export default router;
