"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

export default function SearchParamsProvider({
  children,
}: {
  children: (params: Record<string, string | null>) => React.ReactNode;
}) {
  const LazyParams = () => {
    const searchParams = useSearchParams();
    const params: Record<string, string | null> = {};

    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return <>{children(params)}</>;
  };

  const LazyParamsComponent = React.lazy(() => Promise.resolve({ default: LazyParams }));

  return (
    <Suspense fallback={<div>Loading parameters...</div>}>
      <LazyParamsComponent />
    </Suspense>
  );
}
