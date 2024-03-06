"use client";

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface ErrorStateProps {
  error: Error;
}

const ErrorState = ({ error }: ErrorStateProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title="An error occurred"
      subtitle="We were unable to load the page you requested. Please try again."
    />
  );
};

export default ErrorState;
