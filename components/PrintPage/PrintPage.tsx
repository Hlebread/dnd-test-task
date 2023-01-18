import { Dispatch, SetStateAction, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import Actions from "../actions";
import DraggableImage, { DraggableImageOverlay } from "../DraggableImage";
import type { PageData } from "../../types";

import { DRAG_OVERLAY_MODIFIERS, TOUCH_SENSOR_CONFIG } from "./constants";
import {
  Header,
  Wrapper,
  PageLayout,
  PrintWrapper,
  Title,
} from "./PrintPage.styled";

export interface IPrintPageProps {
  data: PageData[];
  setData: Dispatch<SetStateAction<PageData[]>>;
}

export default function PrintPage({ data, setData }: IPrintPageProps) {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, TOUCH_SENSOR_CONFIG)
  );

  const [activeImage, setActiveImage] = useState(null);

  const onDragStart = ({ active }: DragStartEvent) => {
    setActiveImage(active.id);
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (over?.id && active.id !== over.id) {
      setData((prevData) =>
        prevData.map(({ images, ...rest }) => ({
          ...rest,
          images: images.map((image) => {
            if (image === active.id) {
              return over.id as string;
            }

            if (image === over.id) {
              return active.id as string;
            }

            return image;
          }),
        }))
      );
      setActiveImage(null);
    }
  };

  return (
    <DndContext
      id="swapImages"
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      collisionDetection={pointerWithin}
      sensors={sensors}
    >
      <Wrapper>
        {Object.values(data).map((entry, i) => (
          <PrintWrapper key={i}>
            <Header>
              <Title>{entry.title}</Title>
              <Actions />
            </Header>

            <PageLayout>
              {entry.images.map((image) => (
                <DraggableImage key={image} src={image} />
              ))}
            </PageLayout>
          </PrintWrapper>
        ))}
      </Wrapper>

      <DragOverlay dropAnimation={null} modifiers={DRAG_OVERLAY_MODIFIERS}>
        {activeImage && (
          <DraggableImageOverlay src={activeImage} draggable={false} />
        )}
      </DragOverlay>
    </DndContext>
  );
}
