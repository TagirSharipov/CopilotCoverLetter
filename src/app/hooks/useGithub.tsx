"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useCopilotReadable } from "@copilotkit/react-core";
import { toast } from "react-toastify";

// Resume data interface
export interface GithubProfile {
  name: string;
  email: string;
  company: string;
  bio: string;
  repositories: {
    name: string;
    url: string;
    created: string;
    description: string;
    language: string;
    stars: number;
  }[];
}

export const useGithubData = () => {
  const [githubData, setGithubData] = useState<GithubProfile | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  // Fetch resume data from API
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    setIsLoading(true);
    axios
      .get("/api/github")
      .then(response => {
        setGithubData(response.data);
        setIsLoading(false);
        toast.success("Successfully fetched Github data");
      })
      .catch(error => {
        setIsLoading(false);
        toast.error("Failed to fetch Github data");
      });
  }, []);

  useCopilotReadable(
    {
      description: "Github Repos",
      value: JSON.stringify(githubData),
    },
    [githubData]
  );

  return { githubData, isLoading };
};
