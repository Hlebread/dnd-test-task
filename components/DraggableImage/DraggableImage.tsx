import React, { useMemo } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";

import {
  DraggableImageContainer,
  DraggableImageImage,
} from "./DraggableImage.styled";

export interface IDraggableImageProps {
  src: string;
}

export default function DraggableImage({ src }: IDraggableImageProps) {
  const dndConfig = useMemo(
    () => ({
      id: src,
    }),
    [src]
  );

  const { isOver, setNodeRef: setDroppableRef } = useDroppable(dndConfig);

  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef: setDraggableRef,
  } = useDraggable(dndConfig);

  return (
    <DraggableImageContainer
      ref={setDroppableRef}
      showOverlay={isDragging || isOver}
    >
      <DraggableImageImage
        ref={setDraggableRef}
        src={src}
        {...attributes}
        {...listeners}
      />
    </DraggableImageContainer>
  );
}
