import { motion } from "framer-motion";
import { ReactNode, memo } from "react";

interface PageTransitionProps {
  children: ReactNode;
  pageKey: string;
  variant?: 'fade' | 'slide' | 'scale' | 'flip';
}

function PageTransition({ 
  children, 
  pageKey,
}: PageTransitionProps) {
  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export default memo(PageTransition);
