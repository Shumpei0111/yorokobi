"use client";

import { GET_USER_ID_KEY, getUserId } from "@/lib/getUserId";
import { useEffect } from "react";
import { Scores } from "./types/questions";

const LAST_POSTED_AT_KEY = "lastPostedAt";

export const useResultLogic = ({
  scores,
  csrfToken,
}: {
  scores: Scores;
  csrfToken: string | null;
}) => {
  useEffect(() => {
    if (!csrfToken) {
      console.error("Invalid CSRF token");
      return;
    }

    const postResult = async () => {
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

      // Post the result to the API
      await fetch("/api/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          result: scores,
          user_id,
        }),
      });
      if (!localStorage.getItem(GET_USER_ID_KEY)) {
        localStorage.setItem(GET_USER_ID_KEY, user_id);
      }
    };

    (async () => {
      if (scores) {
        await postResult();
      }
    })();
  }, [scores, csrfToken]);
};
