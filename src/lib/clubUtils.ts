import { Club } from '@/types/clubTypes';

const clubSearchCompare = (club: Club, value: string): boolean => {
  const regexNonAlphaNumeric = /[^a-zA-Z0-9]/g;
  const regexDiacritics = /[\u0300-\u036f]/g;

  const sanitizedClubName = club.name
    .normalize('NFD')
    .replace(regexDiacritics, '')
    .replace(regexNonAlphaNumeric, '')
    .toLowerCase();
  const sanitizedValue = value
    .normalize('NFD')
    .replace(regexDiacritics, '')
    .replace(regexNonAlphaNumeric, '')
    .toLowerCase();

  return sanitizedClubName.includes(sanitizedValue);
};

export { clubSearchCompare };
