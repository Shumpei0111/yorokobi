"use client";

import { useCSRF } from "@/providers/CSRFProvider";
import { useResultLogic } from "./result-logic";
import { Scores } from "./types/questions";

export const ResultFetch = ({ scores }: { scores: Scores }) => {
  const { csrfToken } = useCSRF();
  useResultLogic({ scores, csrfToken });

  return <></>;
};
