'use client';

import { AxiosError } from 'axios';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useApi } from '@/hooks/apiHook';
import { Club } from '@/types/clubTypes';

type SnakeCaseClub = {
  club_key: string;
  name: string;
};

type ClubsHook = {
  clubs: Club[];
  isLoading: boolean;
  error: string | null;
  hasError: boolean;
};

type ClubsProviderProps = {
  children: ReactNode;
};

const mapClubFields = (snakeCaseClub: SnakeCaseClub): Club => {
  return {
    clubKey: snakeCaseClub['club_key'],
    name: snakeCaseClub['name'],
  };
};

const ClubsContext = createContext<ClubsHook | null>(null);

const ClubsProvider = ({ children }: ClubsProviderProps) => {
  const { api } = useApi();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const hasError = useMemo(() => error !== null, [error]);

  const fetchClubs = useCallback(async () => {
    try {
      const response = await api.get<SnakeCaseClub[]>('api/v1/clubs');

      setClubs(response.data.map(mapClubFields));
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message ?? 'An error occurred');
        console.error(error);
      } else {
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  useEffect(() => {
    void fetchClubs();
  }, [fetchClubs]);

  return (
    <ClubsContext.Provider value={{ clubs, isLoading, error, hasError }}>
      {children}
    </ClubsContext.Provider>
  );
};

const useClubs = () => {
  const clubsHook = useContext(ClubsContext);
  if (!clubsHook) {
    throw new Error('useClubs must be called within a ClubsProvider context');
  }

  return clubsHook;
};

export { ClubsProvider, useClubs };
