export const formatImagePath = (img: string | null, width: string = 'w500') => {
  if (!img) return;
  return `https://image.tmdb.org/t/p/${width}${img}`;
};
