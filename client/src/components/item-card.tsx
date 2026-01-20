import { motion } from "framer-motion";
import { type Item } from "@shared/schema";
import { useUpdateItem, useDeleteItem } from "@/hooks/use-items";
import { Check, Trash2, Calendar, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ItemCardProps {
  item: Item;
  index: number;
}

export function ItemCard({ item, index }: ItemCardProps) {
  const updateItem = useUpdateItem();
  const deleteItem = useDeleteItem();
  const [isHovered, setIsHovered] = useState(false);

  const toggleComplete = () => {
    updateItem.mutate({ id: item.id, completed: !item.completed });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this item?")) {
      deleteItem.mutate(item.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300",
        item.completed 
          ? "bg-muted/30 border-transparent" 
          : "bg-card border-border/40 shadow-sm hover:shadow-lg hover:border-primary/20 hover:-translate-y-0.5"
      )}
    >
      <button
        onClick={toggleComplete}
        disabled={updateItem.isPending}
        className={cn(
          "flex-shrink-0 w-6 h-6 mt-1 rounded-full border-2 flex items-center justify-center transition-all duration-200",
          item.completed
            ? "bg-green-500 border-green-500 text-white"
            : "border-muted-foreground/30 hover:border-primary text-transparent hover:text-primary/20"
        )}
      >
        <Check className="w-3.5 h-3.5" strokeWidth={3} />
      </button>

      <div className="flex-1 min-w-0 pt-0.5">
        <h3 className={cn(
          "font-display font-semibold text-lg leading-tight transition-colors duration-200",
          item.completed ? "text-muted-foreground line-through" : "text-foreground"
        )}>
          {item.name}
        </h3>
        
        {item.description && (
          <p className={cn(
            "mt-1.5 text-sm leading-relaxed transition-colors",
            item.completed ? "text-muted-foreground/50" : "text-muted-foreground"
          )}>
            {item.description}
          </p>
        )}
      </div>

      <div className={cn(
        "flex flex-col gap-2 transition-opacity duration-200",
        isHovered ? "opacity-100" : "opacity-0 md:opacity-0" 
      )}>
        <button
          onClick={handleDelete}
          disabled={deleteItem.isPending}
          className="p-2 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          title="Delete item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
