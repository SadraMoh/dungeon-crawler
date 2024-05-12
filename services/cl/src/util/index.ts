export const convertPositionToStyle = (x: number, y: number, size: number) => {
  const halfSize = size / 2;
  return { left: `${x - halfSize}px`, top: `${y - halfSize}px` } as const;
};
