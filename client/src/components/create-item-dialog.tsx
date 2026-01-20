import { useState } from "react";
import { useCreateItem } from "@/hooks/use-items";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertItemSchema, type InsertItem } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function CreateItemDialog() {
  const [open, setOpen] = useState(false);
  const createItem = useCreateItem();
  const { toast } = useToast();

  const form = useForm<InsertItem>({
    resolver: zodResolver(insertItemSchema),
    defaultValues: {
      name: "",
      description: "",
      completed: false,
    },
  });

  const onSubmit = (data: InsertItem) => {
    createItem.mutate(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
        toast({
          title: "Success",
          description: "Item created successfully",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="
          fixed bottom-8 right-8 md:bottom-12 md:right-12 z-40
          h-14 w-14 rounded-full 
          bg-primary text-primary-foreground 
          shadow-lg shadow-primary/25 
          hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 hover:scale-105
          active:translate-y-0 active:scale-95
          flex items-center justify-center
          transition-all duration-300 ease-out
        ">
          <Plus className="w-6 h-6" strokeWidth={3} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl border-border/50 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-bold">New Task</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground/80 ml-1">
              Task Name
            </label>
            <input
              {...form.register("name")}
              className="
                w-full px-4 py-3 rounded-xl
                bg-muted/30 border-2 border-transparent
                text-foreground placeholder:text-muted-foreground/50
                focus:outline-none focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/10
                transition-all duration-200
              "
              placeholder="What needs to be done?"
              autoFocus
            />
            {form.formState.errors.name && (
              <p className="text-xs text-destructive ml-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-foreground/80 ml-1">
              Description <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <textarea
              {...form.register("description")}
              rows={3}
              className="
                w-full px-4 py-3 rounded-xl
                bg-muted/30 border-2 border-transparent
                text-foreground placeholder:text-muted-foreground/50
                focus:outline-none focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/10
                transition-all duration-200 resize-none
              "
              placeholder="Add details..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-5 py-2.5 rounded-xl font-medium text-muted-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createItem.isPending}
              className="
                px-6 py-2.5 rounded-xl font-semibold
                bg-primary text-primary-foreground
                shadow-lg shadow-primary/20
                hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5
                active:translate-y-0 active:shadow-sm
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                flex items-center gap-2
                transition-all duration-200
              "
            >
              {createItem.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {createItem.isPending ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
