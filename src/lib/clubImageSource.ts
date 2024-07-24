import { clubImages } from '@/lib/clubImages';

const clubImageSource = (clubKey: string) => {
  if (clubImages[clubKey]) {
    return 'clubs/' + clubImages[clubKey];
  } else {
    // TODO: Add a default image
    throw Error('Club image not found');
  }
};

export { clubImageSource };
