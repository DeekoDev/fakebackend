"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ApiKey, Endpoint, Operation, Project } from "@prisma/client";
import { createContext, useContext } from "react";
import { getHookOfContext } from "@/utils/get-hook-of-context";
import { api } from "@/trpc/react";
import { usePathname } from "next/navigation";

interface DashboardContext {
  project: Project | null;
  endpoints: Endpoint[];
  addEndpoint: (endpoint: Endpoint) => void;
  endpoint: Endpoint | null;
  getEndpoint: (endpointId: string) => Endpoint | null;
  endpointOperations: Operation[];
  addOperation: (operation: Operation) => void;
  isPendingOperation: boolean;
  isFetchingOperation: boolean;
  changeIsFetchingOperation: (value: boolean) => void;
  apiKeys: ApiKey[];
  addApiKey: (apiKey: ApiKey) => void;
  isPendingApiKeys: boolean;
}

const dashboardContext = createContext<DashboardContext>({
  project: null,
  endpoints: [],
  addEndpoint: () => {},
  endpoint: null,
  getEndpoint: () => null,
  endpointOperations: [],
  addOperation: () => {},
  isPendingOperation: false,
  isFetchingOperation: false,
  changeIsFetchingOperation: () => {},
  apiKeys: [],
  addApiKey: () => {},
  isPendingApiKeys: false,
});

interface Props {
  children: React.ReactNode;
  project: Project | null;
  endpoints: Endpoint[];
  endpointId?: string;
}

export const DashboardProvider = ({
  children,
  project: _project,
  endpoints: _endpoints,
}: Props) => {
  const [project, setProject] = useState<Project | null>(_project);
  const [endpoints, setEndpoints] = useState<Endpoint[]>(_endpoints);
  const [endpoint, setEndpoint] = useState<Endpoint | null>(null);
  const [createdOperations, setCreatedOperations] = useState<Operation[]>([]);
  const [isFetchingOperation, setIsFetchingOperation] =
    useState<boolean>(false);
  const apiKeysQuery = api.project.getApiKeys.useQuery(project?.id || "");
  const [createdApiKeys, setCreatedApiKeys] = useState<ApiKey[]>([]);

  const endpointOperationsQuery = api.operation.getByEndpointId.useQuery(
    endpoint?.id || "",
    {
      enabled: !!endpoint,
    },
  );

  const pathname = usePathname();

  const endpointOperations = useMemo(() => {
    const _operations = [
      ...createdOperations,
      ...(endpointOperationsQuery.data || []),
    ].reduce<Operation[]>((acc, operation) => {
      if (!acc.find((o) => o.id === operation.id)) {
        return [...acc, operation];
      }

      return acc;
    }, []);

    return _operations;
  }, [endpointOperationsQuery.data, createdOperations]);

  const apiKeys = useMemo(() => {
    const _apiKeys = [...(apiKeysQuery.data || []), ...createdApiKeys].reduce<
      ApiKey[]
    >((acc, curr) => {
      if (!acc.find((o) => o.id === curr.id)) {
        return [...acc, curr];
      }

      return acc;
    }, []);

    return _apiKeys;
  }, [apiKeysQuery.data, createdApiKeys]);

  const addApiKey = (apiKey: ApiKey) => {
    setCreatedApiKeys((prev) => {
      return [apiKey, ...prev];
    });
  };

  useEffect(() => {
    if (pathname.includes("/endpoint")) {
      const endpointId = pathname.split("/").at(-1);
      setEndpoint(endpoints.find((e) => e.id === endpointId) || null);
      setCreatedOperations([]);
    }
  }, [pathname]);

  const addEndpoint = (endpoint: Endpoint) => {
    setEndpoints((prev) => {
      return [...prev, endpoint];
    });
  };

  const addOperation = (operation: Operation) => {
    setCreatedOperations((prev) => {
      return [operation, ...prev];
    });
  };

  const getEndpoint = (endpointId: string) => {
    return (
      _endpoints.find((e) => e.id === endpointId) ||
      endpoints.find((e) => e.id === endpointId) ||
      null
    );
  };

  const changeIsFetchingOperation = (value: boolean) => {
    setIsFetchingOperation(value);
  };

  return (
    <dashboardContext.Provider
      value={{
        project,
        endpoints,
        addEndpoint,
        endpoint,
        getEndpoint,
        addOperation,
        endpointOperations,
        isPendingOperation: endpointOperationsQuery.isLoading,
        isFetchingOperation,
        changeIsFetchingOperation,
        apiKeys,
        addApiKey,
        isPendingApiKeys: apiKeysQuery.isLoading,
      }}
    >
      {children}
    </dashboardContext.Provider>
  );
};

export const useDashboard =
  getHookOfContext<DashboardContext>(dashboardContext);
