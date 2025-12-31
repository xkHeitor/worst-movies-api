import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  Application,
} from "express";

export type HttpRequest = ExpressRequest;
export type HttpResponse = ExpressResponse;
export type HttpApp = Application;
