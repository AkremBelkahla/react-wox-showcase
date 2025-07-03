import { useState, useRef, useEffect } from 'react';

interface UseSliderProps {
  itemsLength: number;
  onNext: () => void;
  onPrev: () => void;
}

export function useSlider({ itemsLength, onNext, onPrev }: UseSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    setCurrentX(clientX);
  };

  const handleDragEnd = () => {
    if (!isDragging || !containerRef.current) return;
    
    const walk = currentX - startX;
    const containerWidth = containerRef.current.offsetWidth;
    const threshold = containerWidth / 4; // 25% of container width

    if (Math.abs(walk) > threshold) {
      if (walk > 0) {
        onPrev();
      } else {
        onNext();
      }
    }
    
    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
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
  }, [isDragging, startX, currentX]);

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