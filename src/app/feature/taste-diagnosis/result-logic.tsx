"use client";

import { GET_USER_ID_KEY, getUserId } from "@/lib/getUserId";
import { useEffect } from "react";
import { Scores } from "./types/questions";
import { postResult } from "./actions/actions";

const LAST_POSTED_AT_KEY = "lastPostedAt";

export const useResultLogic = ({ scores }: { scores: Scores }) => {
  useEffect(() => {
    const processResult = async () => {
      const user_id = getUserId();

      const lastPostedAt = localStorage.getItem(LAST_POSTED_AT_KEY);
      // Check if the last posted time is within 5 minutes
      if (lastPostedAt) {
        const lastPostedTime = new Date(lastPostedAt);
        const currentTime = new Date();
        const timeDiff = currentTime.getTime() - lastPostedTime.getTime();
        if (timeDiff < 5 * 60 * 1000) {
          console.warn("Result already posted within the last 5 minutes.");
          return;
        }
      }
      // Update the last posted time
      localStorage.setItem(LAST_POSTED_AT_KEY, new Date().toISOString());

      await postResult({ result: scores, user_id });

      if (!localStorage.getItem(GET_USER_ID_KEY)) {
        localStorage.setItem(GET_USER_ID_KEY, user_id);
      }
    };

    if (scores) {
      processResult();
    }
  }, [scores]);
};
