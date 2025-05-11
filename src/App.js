import "dotenv/config";

import express from "express";
import * as Sentry from "@sentry/node";
import Youch from "youch";
import "express-async-errors";

import routes from "./routes";

import "./database";

import sentryConfig from "./config/sentry";

class App {
  constructor() {
    this.server = express();
    Sentry.init(sentryConfig);
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(Sentry.Handlers.requestHandler());
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res) => {
      //aqui  é um middleware e ele esta sem o parametro next pq eslint ta reclamando. (err, req, res, next)
      if (process.env.NODE_ENV === "development") {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: "Internal server error." });
    });
  }
}

export default new App().server;
