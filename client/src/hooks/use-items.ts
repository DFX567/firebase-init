import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertItem } from "@shared/routes";
import { items } from "@shared/schema"; // Type only
import { z } from "zod";

// Get Items
export function useItems() {
  return useQuery({
    queryKey: [api.items.list.path],
    queryFn: async () => {
      const res = await fetch(api.items.list.path);
      if (!res.ok) throw new Error("Failed to fetch items");
      return api.items.list.responses[200].parse(await res.json());
    },
  });
}

// Create Item
export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newItem: InsertItem) => {
      const res = await fetch(api.items.create.path, {
        method: api.items.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.items.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create item");
      }
      return api.items.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.items.list.path] });
    },
  });
}

// Update Item (Toggle Complete, Edit Name/Desc)
export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: number } & Partial<InsertItem> & { completed?: boolean }) => {
      const url = buildUrl(api.items.update.path, { id });
      const res = await fetch(url, {
        method: api.items.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!res.ok) {
        if (res.status === 404) throw new Error("Item not found");
        throw new Error("Failed to update item");
      }
      return api.items.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.items.list.path] });
    },
  });
}

// Delete Item
export function useDeleteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.items.delete.path, { id });
      const res = await fetch(url, { method: api.items.delete.method });
      
      if (!res.ok) {
        if (res.status === 404) throw new Error("Item not found");
        throw new Error("Failed to delete item");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.items.list.path] });
    },
  });
}
