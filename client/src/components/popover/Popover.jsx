import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef, useId } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  arrow,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  safePolygon,
} from "@floating-ui/react";
import "./popover.css";
const Popover = ({ children, renderPopover }) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);
  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(6),
      flip(),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
    whileElementsMounted: autoUpdate,
    transform: false,
    placement: "bottom-start",
  });
  const hover = useHover(context, { handleClose: safePolygon() });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const id = useId();
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);
  return (
    <div className="wrapper" ref={refs.setReference} {...getReferenceProps()}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, transform: "scale(0)" }}
              animate={{ opacity: 1, transform: "scale(1)" }}
              exit={{ opacity: 0, transform: "scale(0)" }}
              transition={{ duration: 0.2 }}
              ref={refs.setFloating}
              style={{
                transformOrigin: `${middlewareData.arrow?.x}px top`,
                ...floatingStyles,
              }}
              {...getFloatingProps()}
            >
              <div
                className="wrapper_render_popover"
                ref={arrowRef}
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y,
                }}
              ></div>
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  );
};

export default Popover;
