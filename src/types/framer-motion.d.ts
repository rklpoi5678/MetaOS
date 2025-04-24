declare module 'framer-motion' {
  import { ComponentType, ReactNode } from 'react';

  interface AnimationProps {
    opacity?: number;
    scale?: number;
    x?: number;
    y?: number;
    rotate?: number;
    backgroundColor?: string;
    boxShadow?: string;
    height?: string | number;
  }

  interface TransitionProps {
    duration?: number;
    delay?: number;
    repeat?: number | 'Infinity';
    repeatType?: 'loop' | 'reverse' | 'mirror';
    ease?: string | number[];
  }

  interface MotionProps {
    children?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
    onTap?: () => void;
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
    whileHover?: AnimationProps;
    whileTap?: AnimationProps;
    animate?: AnimationProps;
    initial?: AnimationProps;
    transition?: TransitionProps;
    viewBox?: string;
    drag?: boolean;
    onDragEnd?: (e: React.DragEvent<HTMLElement>) => void;
    exit?: AnimationProps;
    layoutId?: string;
  }

  export const motion: {
    [key: string]: ComponentType<MotionProps>;
  };

  export function AnimatePresence(props: { children: ReactNode }): JSX.Element;
} 