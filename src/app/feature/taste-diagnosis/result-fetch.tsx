"use client";

import { useResultLogic } from "./result-logic";
import { Scores } from "./types/questions";

export const ResultFetch = ({ scores }: { scores: Scores }) => {
  useResultLogic({ scores });

  return <></>;
};
