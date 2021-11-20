export const formatTime = secondsToPromo => (
  (typeof secondsToPromo === 'number' && secondsToPromo >= 0) ?
    new Date(secondsToPromo *1000).toISOString().split('T')[1].split('.')[0]
    :
    null
);
