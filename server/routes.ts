import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  app.get("/api/messages", async (_req, res) => {
    try {
      const messages = await storage.getMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const parsed = insertMessageSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error });
      }
      const message = await storage.createMessage(parsed.data);
      
      // Simulación de notificación en tiempo real (puedes ver esto en los logs)
      console.log(`[REAL-TIME NOTIFICATION] Nuevo mensaje de: ${message.author}`);
      console.log(`Mensaje: ${message.message}`);
      
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: "Failed to create message" });
    }
  });

  app.delete("/api/messages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteMessage(id);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete message" });
    }
  });

  return httpServer;
}
