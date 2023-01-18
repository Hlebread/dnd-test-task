import { snapCenterToCursor } from "@dnd-kit/modifiers";

export const TOUCH_SENSOR_CONFIG = {
  activationConstraint: {
    delay: 200,
    tolerance: 0,
  },
};

export const DRAG_OVERLAY_MODIFIERS = [snapCenterToCursor];
