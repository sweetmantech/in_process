import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FC, useEffect, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  checkInview?: boolean;
}

export const FadeIn: FC<FadeInProps> = ({
  children,
  className,
  checkInview = true,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView || !checkInview) {
      controls.start("visible");
      return;
    }

    controls.start("hidden");
  }, [controls, inView, checkInview]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 1 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 100 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
