import React, { FC, useCallback, useRef, useState } from "react";
import { StyledImage, StyledImageContainer } from "./Carousels.styles";

const LEFT = "LEFT";
const RIGHT = "RIGHT";

interface CarouselsProps {
  images: string[];
  imageWidth: number;
  imageHeight: number;
}

export const Carousels: FC<CarouselsProps> = ({
  images,
  imageWidth,
  imageHeight,
}) => {
  const ratio = 0.8;
  const gap = 16;

  const [imagesInView, setImagesInView] = useState<string[]>(
    images.slice(0, 5)
  );

  const animationTraces = useRef<boolean[]>([]);
  animationTraces.current = imagesInView.map(() => false);

  const [direction, setDirection] = useState<string>("");

  const container = useRef<HTMLDivElement>(null);

  const getStyles = useCallback(
    (index: number, direction: string) => {
      let middleIndex;

      if (direction === RIGHT) {
        middleIndex = 1;
      } else if (direction === LEFT) {
        middleIndex = 3;
      } else {
        middleIndex = 2;
      }

      if (index === middleIndex) {
        return {
          top: 0,
          left: 0,
          zIndex: middleIndex,
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
        };
      }

      let distanceWidth, distanceHeight;

      if (index !== middleIndex) {
        distanceHeight = (imageHeight * (1 - ratio)) / 2;
      }

      const distance = index - middleIndex;
      const distanceCut = imageWidth * (1 - ratio);

      distanceWidth =
        ((imageWidth * ratio + gap) * Math.abs(distance) + distanceCut) *
        (distance < 0 ? -1 : 1);

      return {
        zIndex: -Math.abs(distance),
        left: `${distanceWidth}px`,
        top: `${distanceHeight}px`,
        width: `${imageWidth * ratio}px`,
        height: `${imageHeight * ratio}px`,
      };
    },
    [imageHeight, imageWidth]
  );

  const showPre = useCallback(() => setDirection(LEFT), []);
  const showNext = useCallback(() => setDirection(RIGHT), []);

  const resetImagesInView = useCallback(() => {
    if (!direction) {
      return;
    }

    const cloneImages = [...imagesInView];
    let newImages: string[] = [];

    if (direction === RIGHT) {
      newImages = [
        cloneImages[cloneImages.length - 1],
        ...cloneImages.slice(0, cloneImages.length - 1),
      ];
    } else if (direction === LEFT) {
      newImages = [...cloneImages.slice(1, cloneImages.length), cloneImages[0]];
    }

    setImagesInView(newImages);
    setDirection("");
  }, [direction, imagesInView]);

  const handleTransitionEnd = useCallback(
    (index: number) => () => {
      animationTraces.current[index] = true;

      const hasAnimationInProgress = animationTraces.current.some(
        (finished) => !finished
      );

      if (!hasAnimationInProgress) {
        resetImagesInView();
      }
    },
    [resetImagesInView]
  );

  return (
    <>
      <StyledImageContainer
        style={{
          width: `${imageWidth * (1 + ratio) + gap}px`,
          height: `${imageHeight}px`,
        }}
        ref={container}
      >
        {imagesInView.map((img, index) => (
          <StyledImage
            src={img}
            key={index}
            style={getStyles(index, direction)}
            hasTransition={Boolean(direction)}
            onTransitionEnd={handleTransitionEnd(index)}
          />
        ))}
      </StyledImageContainer>
      <div>
        <button onClick={showPre}>pre</button>
        <button onClick={showNext}>next</button>
      </div>
    </>
  );
};
