import styled from "styled-components";

export interface IDraggableImageContainerProps {
  showOverlay: boolean;
}

export const DraggableImageContainer = styled.div<IDraggableImageContainerProps>`
  position: relative;
  width: calc(50% - 10px);

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #6539bd;
    opacity: 0.2;
    border-radius: inherit;
    display: ${({ showOverlay }) => (showOverlay ? "block" : "none")};
    animation: isOverAnimation ease-in 0.1s;
  }

  @keyframes isOverAnimation {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.2;
    }
  }
`;

export const DraggableImageImage = styled.img`
  max-width: 100%;
  cursor: grab;
  animation: imageEnteringAnimation ease-in 0.4s;

  @keyframes imageEnteringAnimation {
    from {
      opacity: 0.1;
    }
    to {
      opacity: 1;
    }
  }
`;

export const DraggableImageOverlay = styled.img`
  width: 80px;
  height: 80px;
  border: 4px solid white;
  border-radius: 50%;
  cursor: grabbing;
  user-select: none;
  animation: overlayEnteringAnimation cubic-bezier(0.175, 0.885, 0.32, 1.275)
    0.2s;

  @keyframes overlayEnteringAnimation {
    from {
      opacity: 0;
      transform: scale(0.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
