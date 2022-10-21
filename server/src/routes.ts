import { Application, Request, Response } from "express";
import {
  createComicHandler,
  deleteComicHandler,
  getComicHandler,
  getListComicsHandler,
  updateComicHandler,
} from "./controller/comic.controller";

import {
  createProductHandler,
  deleteProductHandler,
  getListProductHandler,
  getProductHandler,
  updateProductHandler,
} from "./controller/product.controller";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
} from "./controller/session.controller";
import {
  createUserHandler,
  getCurrentUser,
} from "./controller/user.controller";
import requiredUser from "./middleware/requiredUser";
import validateResource from "./middleware/validateResource";
import {
  createComicSchema,
  deleteComicSchema,
  getComicSchema,
  updateComicSchema,
} from "./schema/comic.schema";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schema/product.schema";
import { createUserSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Application) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    return res.sendStatus(200);
  });

  // users
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);
  app.get("/api/me", requiredUser, getCurrentUser);

  // session
  app.post(
    "/api/sessions",
    validateResource(createUserSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requiredUser, getUserSessionHandler);
  app.delete("/api/sessions", requiredUser, deleteSessionHandler);

  app.get("/api/comics", getListComicsHandler);
  app.post(
    "/api/comics",
    [validateResource(createComicSchema)],
    createComicHandler
  );
  app.get(
    "/api/comics/:comicId",
    [requiredUser, validateResource(getComicSchema)],
    getComicHandler
  );
  app.put(
    "/api/comics/:comicId",
    [validateResource(updateComicSchema)],
    updateComicHandler
  );
  app.delete(
    "/api/comics/:comicId",
    validateResource(deleteComicSchema),
    deleteComicHandler
  );

  app.get("/api/products", getListProductHandler);
  app.post(
    "/api/products",
    [requiredUser, validateResource(createProductSchema)],
    createProductHandler
  );
  app.put(
    "/api/products/:productId",
    [requiredUser, validateResource(updateProductSchema)],
    updateProductHandler
  );
  app.get(
    "/api/products/:productId",
    validateResource(getProductSchema),
    getProductHandler
  );
  app.delete(
    "/api/products/:productId",
    [requiredUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );
}

export default routes;
