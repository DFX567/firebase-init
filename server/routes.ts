import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Basic API routes can go here if needed, but for a pure Firebase app 
  // with a static frontend, we mainly just serve the frontend (handled by server/index.ts).
  
  return httpServer;
}
