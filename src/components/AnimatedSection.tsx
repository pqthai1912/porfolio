import React, { ReactNode, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

/**
 * A section component that animates when it comes into view.
 *
 * @remarks
 *
 * This component uses the `motion` library from `framer-motion` to animate the
 * section when it comes into view. The animation is controlled by the
 * `useAnimation` hook, and the visibility of the element is detected by the
 * `useInView` hook from `react-intersection-observer`.
 *
 * @param children - The children of the component.
 * @param className - The class name of the component.
 * @param style - The style of the component.
 * @param id - The ID of the component for navigation.
 */
const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  style,
  id,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    /**
     * The threshold at which the element is considered visible. A value of 0.2
     * means that the element must be at least 20% visible before the animation
     * starts.
     */
    threshold: 0.2,

    /**
     * Whether the animation should only trigger once. If set to `true`, the
     * animation will only play the first time the element comes into view.
     */
    triggerOnce: false,
  });

  useEffect(() => {
    /**
     * If the element is visible, start the animation.
     */
    if (inView) {
      controls.start("visible");
    } else {
      /**
       * If the element is not visible, start the animation in the "hidden" state.
       */
      controls.start("hidden");
    }
  }, [controls, inView]);

  const variants = {
    /**
     * The animation for when the element is not visible.
     */
    hidden: { opacity: 0, y: 50 },

    /**
     * The animation for when the element is visible.
     */
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },

    /**
     * The animation for when the element is exiting.
     */
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        exit="exit"
        variants={variants}
        className={className}
        style={style}
        id={id}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedSection;
