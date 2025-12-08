import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedCopyIconProps {
  isCopied: boolean;
}

const AnimatedCopyIcon = ({ isCopied }: AnimatedCopyIconProps) => {
  return (
    <div className="relative h-4 w-4">
      <AnimatePresence mode="wait">
        {isCopied ? (
          <motion.div
            key="check"
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Check className="size-4" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: -90 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Copy className="size-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedCopyIcon;
