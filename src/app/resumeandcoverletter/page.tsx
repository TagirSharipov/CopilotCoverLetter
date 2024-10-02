"use client";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-textarea/styles.css";
import "@copilotkit/react-ui/styles.css";
import React, { useState } from "react";
import { CoverLetterAndResume } from "../components/resume";
import { CopilotContextProvider } from "@/context/CopilotContextProvider";

const apiKey = process.env.NEXT_PUBLIC_COPILOT_CLOUD_API_KEY;

function BuildResume() {
  const [input, setInput] = useState("");
  return (
    <CopilotKit publicApiKey={apiKey}>
      <CopilotContextProvider>
        <CoverLetterAndResume />
      </CopilotContextProvider>
    </CopilotKit>
  );
}

export default BuildResume;
