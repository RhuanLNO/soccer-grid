"use client";

import { createContext, ReactNode, useContext } from "react";
import axios, { AxiosInstance } from "axios";

type ApiHook = {
  api: AxiosInstance;
};

type ApiProviderParams = {
  children: ReactNode;
};

const ApiContext = createContext<ApiHook | null>(null);

const ApiProvider = ({ children }: ApiProviderParams) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  if (!baseURL) {
    throw new Error("NEXT_PUBLIC_API_URL must be defined");
  }

  const api = axios.create({
    baseURL,
  });

  return <ApiContext.Provider value={{ api }}>{children}</ApiContext.Provider>;
};

const useApi = () => {
  const apiHook = useContext(ApiContext);

  if (!apiHook) {
    throw new Error("useApi must be called within a ApiProvider context");
  }

  return apiHook;
};

export { ApiProvider, useApi };
