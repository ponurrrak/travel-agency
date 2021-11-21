export const formatTime = secondsToPromo => (
  (typeof secondsToPromo === 'number' && secondsToPromo >= 0) ?
    new Date(secondsToPromo *1000).toISOString().split('T')[1].split('.')[0]
    :
    null
);

/*export const formatTime = secondsToPromo => {
  if(typeof secondsToPromo !== 'number' || secondsToPromo < 0){
    return null;
  }
  const hours = Math.floor(secondsToPromo / 3600);
  const minutes = Math.floor((secondsToPromo % 3600) / 60);
  const seconds = Math.floor(secondsToPromo % 60);
  return [hours, minutes, seconds].map(timePart =>
    (timePart + '').padStart(2, 0)
  ).join(':');
};*/
