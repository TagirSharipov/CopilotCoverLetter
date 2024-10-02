import React from "react";
import { GithubProfile } from "../hooks/useGithub";

const GithubData = ({
  data,
  isLoading = false,
}: {
  data?: GithubProfile;
  isLoading: boolean;
}) => {
  return (
    <div className="max-w-[250px] w-full p-4 rounded-lg bg-white">
      <h2>GitHub</h2>
      <div className="flex items-center">
        <span className="py4">
          {isLoading
            ? "Loading GitHub data..."
            : `${data?.name}, repos: ${data?.repositories?.length}`}
        </span>
      </div>
    </div>
  );
};

export default GithubData;
