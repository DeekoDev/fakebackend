"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { getURIParams } from "@/utils/get-uri-params";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { Textarea } from "@/components/ui/textarea";
import { TAB_FORM } from "@/constants/endpoint.constants";
import { METHOD } from "@/constants/operation.constants";
import { Editor } from "@/components/ui/editor";
import { EndpointFormTab } from "./endpoint-form-tab";
import { Copy, MoveLeft } from "lucide-react";
import { useStorage } from "@/hooks/use-storage";
import { EndpointFormBody } from "./endpoint-form-body";
import { EndpointFormArrow } from "./endpoint-form-arrow";
import { api } from "@/trpc/react";
import { formatJsonString } from "@/utils/format-json-string";
import { Skeleton } from "@/components/ui/skeleton";
import { useModal } from "@/components/providers/modal-provider";

interface Props {
  endpointId: string;
}

export const EndpointForm = ({ endpointId }: Props) => {
  const { getEndpoint, addOperation, changeIsFetchingOperation, apiKeys } =
    useDashboard();
  const endpoint = getEndpoint(endpointId);
  const [tab, setTab] = useState(TAB_FORM.PARAMS);
  const [hiddenTabCTA, setHiddenTabCTA] = useStorage(
    "endpoint-form-hidden-tab-cta",
    "local",
    "true",
  );
  const modal = useModal();

  const [paramsValue, setParamsValue] = useState<{ [key: string]: string }>({});
  const [body, setBody] = useState("");

  const createOperationMutation = api.operation.create.useMutation();

  const getOpExample = api.operation.getExampleByEndpointId.useQuery({
    endpointId: endpoint?.id || "",
    method: (endpoint?.method as keyof typeof METHOD) || "GET",
    status: 200,
  });

  const utils = api.useUtils();

  const params = useMemo(() => {
    if (!endpoint) {
      return [];
    }

    return getURIParams(endpoint.URI);
  }, [endpoint]);

  const URIFormatted = useMemo(() => {
    if (!endpoint) {
      return [];
    }

    const params = getURIParams(endpoint.URI);
    const divided = endpoint.URI.split("/").filter((uri) => uri !== "");

    return divided.map((dividedURI) => {
      const paramKey = dividedURI.substring(1, dividedURI.length);

      if (dividedURI.startsWith(":") && params.includes(paramKey)) {
        const value = paramsValue?.[paramKey];

        return {
          uri: paramKey,
          isParam: true,
          value: value?.trim() ? encodeURIComponent(value.trim()) : null,
        };
      }

      return {
        uri: dividedURI,
        isParam: false,
        value: null,
      };
    });
  }, [endpoint, paramsValue]);

  const allParamsFilled = useMemo(() => {
    return URIFormatted.every((u) => {
      if (u.isParam) {
        return !!u.value;
      }

      return true;
    });
  }, [URIFormatted]);

  const URIFormattedString = useMemo(() => {
    return (
      "/" +
      URIFormatted.map((u) => {
        if (u.isParam) {
          return u.value ? u.value : `:${u.uri}`;
        }

        return u.uri;
      }).join("/")
    );
  }, [URIFormatted]);

  // Set body from example
  useEffect(() => {
    const main = () => {
      if (endpoint?.method === METHOD.GET) {
        return;
      }

      if (!getOpExample.data || getOpExample.isPending) {
        return;
      }

      if (body === "" && getOpExample.data.body) {
        setBody(formatJsonString(getOpExample.data.body));
      }
    };

    main();
  }, [getOpExample.data]);

  // set tab to body if no params
  useEffect(() => {
    const main = () => {
      if (!endpoint) return;

      if (params.length === 0 && endpoint.method !== METHOD.GET) {
        setTab(TAB_FORM.BODY);
      }
    };

    main();
  }, [endpoint, params]);

  const handleChangeTab = (tab: string) => {
    if (tab === TAB_FORM.BODY) {
      setHiddenTabCTA("true");
    }

    setTab(tab);
  };

  const handleChangeParamValue = (param: string, value: string) => {
    setParamsValue((prev) => ({
      ...prev,
      [param]: value,
    }));
  };

  const handleChangeBody = (value: string) => {
    setBody(value);
  };

  const handleClickFetch = async () => {
    if (!endpoint) {
      return;
    }

    if (
      createOperationMutation.isPending ||
      getOpExample.isPending ||
      !allParamsFilled
    ) {
      return;
    }

    changeIsFetchingOperation(true);

    const operation = await createOperationMutation.mutateAsync({
      endpointId: endpoint.id,
      URI: URIFormattedString,
      body: body || null,
    });

    utils.operation.invalidate();

    changeIsFetchingOperation(false);
    addOperation(operation);

    setParamsValue({});
    setBody("");
  };

  const handleOpenCopy = () => {
    modal.open("endpoint-definition", {
      endpoint,
      apiKeys,
      URI: URIFormattedString,
      data: body,
    });
  };

  if (!endpoint) {
    return null;
  }

  return (
    <div
      className="sticky bottom-0 min-h-[80px] w-full rounded-t-2xl border border-b-0 bg-dark-600 px-6 pb-6 pt-4"
      style={{
        boxShadow: "0px -18px 16px -6px #121212",
      }}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-4 overflow-hidden pb-4",
          params.length !== 0 && "mb-4 border-b",
        )}
      >
        <p className="overflow-hidden break-words font-medium">
          {URIFormatted?.map((u, i) => {
            if (u.isParam) {
              return (
                <span key={i}>
                  /
                  <span className="bg-green-500/10 py-1 text-green-400">
                    {u.value ? u.value : `:${u.uri}`}
                  </span>
                </span>
              );
            }

            return <span key={i}>/{u.uri}</span>;
          })}
        </p>

        {/* Fetch */}
        <div className="flex gap-2">
          <Button onClick={handleOpenCopy} variant="ghost" size={"icon-sm"}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            size={"sm"}
            onClick={() => handleClickFetch()}
            disabled={
              createOperationMutation.isPending ||
              getOpExample.isPending ||
              !allParamsFilled
            }
          >
            {createOperationMutation.isPending ? "Fetching..." : "Fetch"}
          </Button>
        </div>
      </div>

      {/* params */}
      {tab === TAB_FORM.PARAMS && params.length > 0 && (
        <>
          <p className="text-light-600">Params</p>
          <div className="mt-3 flex flex-col gap-3">
            {params.map((param, i) => {
              return (
                <div
                  key={`${param}_${i}`}
                  className="flex rounded-md border bg-dark-500"
                >
                  <div className="w-[120px] overflow-hidden border-r p-2">
                    <p className="overflow-hidden text-ellipsis">{param}</p>
                  </div>
                  <input
                    disabled={
                      createOperationMutation.isPending ||
                      getOpExample.isPending
                    }
                    className="w-full bg-transparent p-2 outline-none"
                    placeholder="write here"
                    value={paramsValue[param] || ""}
                    onChange={(e) =>
                      handleChangeParamValue(param, e.target.value)
                    }
                  ></input>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* body */}
      {tab === TAB_FORM.BODY && (
        <>
          <p className="text-light-600">Body</p>
          <EndpointFormBody
            isLoading={getOpExample.isPending}
            value={body}
            handleChange={handleChangeBody}
          />
        </>
      )}

      {/* Tabs */}
      {endpoint.method !== METHOD.GET && (
        <div className="flex items-center gap-2 pt-6">
          {params.length > 0 && (
            <EndpointFormTab
              handleClick={() => handleChangeTab(TAB_FORM.PARAMS)}
              isActive={tab === TAB_FORM.PARAMS}
            >
              Params
            </EndpointFormTab>
          )}

          {getOpExample.isPending ? (
            <Skeleton className="h-[40px] w-[80px] rounded-full" />
          ) : (
            <EndpointFormTab
              handleClick={() => handleChangeTab(TAB_FORM.BODY)}
              isActive={tab === TAB_FORM.BODY}
            >
              Body
            </EndpointFormTab>
          )}

          {(hiddenTabCTA === "false" || hiddenTabCTA === null) &&
            !getOpExample.isPending && <EndpointFormArrow />}
        </div>
      )}
    </div>
  );
};
