import { useRef, useEffect } from 'react';

interface UseSliderProps {
  itemsLength: number;
  onNext: () => void;
  onPrev: () => void;
}

export function useSlider({ itemsLength, onNext, onPrev }: UseSliderProps) {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const handlersRef = useRef({ onNext, onPrev });
  handlersRef.current = { onNext, onPrev };

  const handleDragStart = (clientX: number) => {
    isDragging.current = true;
    startX.current = clientX;
    currentX.current = clientX;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging.current) return;
    currentX.current = clientX;
  };

  const handleDragEnd = () => {
    if (!isDragging.current || !containerRef.current) return;

    const walk = currentX.current - startX.current;
    const containerWidth = containerRef.current.offsetWidth;
    const threshold = containerWidth / 4; // 25% of container width

    if (Math.abs(walk) > threshold) {
      if (walk > 0) {
        handlersRef.current.onPrev();
      } else {
        handlersRef.current.onNext();
      }
    }

    isDragging.current = false;
    startX.current = 0;
    currentX.current = 0;
  };

  useEffect(() => {
    const handleMouseUp = () => handleDragEnd();
    const handleMouseLeave = () => handleDragEnd();
    const handleTouchEnd = () => handleDragEnd();
    const handleTouchCancel = () => handleDragEnd();

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchCancel);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchCancel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dragProps = {
    ref: containerRef,
    className: "cursor-grab active:cursor-grabbing no-select touch-pan-y",
    onMouseDown: (e: React.MouseEvent) => handleDragStart(e.pageX),
    onMouseMove: (e: React.MouseEvent) => handleDragMove(e.pageX),
    onMouseUp: handleDragEnd,
    onMouseLeave: handleDragEnd,
    onTouchStart: (e: React.TouchEvent) => handleDragStart(e.touches[0].pageX),
    onTouchMove: (e: React.TouchEvent) => handleDragMove(e.touches[0].pageX),
    onTouchEnd: handleDragEnd,
    onTouchCancel: handleDragEnd,
  };

  return { dragProps };
}
