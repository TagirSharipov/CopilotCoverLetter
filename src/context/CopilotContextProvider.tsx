import { createContext, useState } from "react";
import { addTextToPDF } from "@/lib/utils";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import jsPDF from "jspdf";

type CopilotContextType = {
  jobDescription: string;
  updateJobDescription: (description: string) => void;
  coverLetter: string;
  resume: string;
};

export const CopilotContext = createContext<CopilotContextType | undefined>(
  undefined
);

import { ReactNode } from "react";
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";

export const CopilotContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  useCopilotAction(
    {
      name: "createCoverLetter",
      description:
        "Create a cover letter basing on job description and resume.",
      parameters: [
        {
          name: "coverLetterMarkdown",
          type: "string",
          description:
            "Markdown text for a cover letter to introduce yourself and briefly summarize your professional background as a software developer.",
          required: true,
        },
      ],
      handler: async ({ coverLetterMarkdown }) => {
        setCoverLetter(coverLetterMarkdown);
      },
    },
    []
  );

  useCopilotAction(
    {
      name: "createResume",
      description:
        "Create a resume for a software developer job application basing on my github repos and resume.",
      parameters: [
        {
          name: "resumeMarkdown",
          type: "string",
          description:
            "Markdown text for a resume that displays your professional background and relevant skills.",
          required: true,
        },
      ],
      handler: async ({ resumeMarkdown }) => {
        setResume(resumeMarkdown);
      },
    },
    []
  );

  useCopilotAction(
    {
      name: "downloadPdfs",
      description: "Download pdfs of the cover letter and resume.",
      parameters: [
        {
          name: "coverLetterPdfA4",
          type: "string",
          description:
            "A Pdf that contains the cover letter converted from markdown text and fits A4 paper.",
          required: true,
        },
        {
          name: "resumePdfA4Paper",
          type: "string",
          description:
            "A Pdf that contains the resume converted from markdown text and fits A4 paper.",
          required: true,
        },
      ],
      handler: async () => {
        const marginLeft = 10;
        const marginTop = 10;
        const maxWidth = 180;

        const coverLetterDoc = new jsPDF();

        addTextToPDF(
          coverLetterDoc,
          coverLetter,
          marginLeft,
          marginTop,
          maxWidth
        );
        coverLetterDoc.save("coverLetter.pdf");

        const resumeDoc = new jsPDF();
        addTextToPDF(resumeDoc, resume, marginLeft, marginTop, maxWidth);
        resumeDoc.save("resume.pdf");
      },
    },
    [coverLetter, resume]
  );

  useCopilotReadable(
    {
      description: "Job Description",
      value: JSON.stringify(jobDescription),
    },
    [jobDescription]
  );

  function updateJobDescription(description: string) {
    setJobDescription(description);
  }

  useCopilotChatSuggestions({
    instructions: `Ask me to create a resume for a software developer job application, suggest me to add  github repos to resume. Ask me to generate a cover letter basing on a job description`,
  });

  return (
    <CopilotContext.Provider
      value={{
        coverLetter,
        resume,
        jobDescription,
        updateJobDescription,
      }}
    >
      {children}
    </CopilotContext.Provider>
  );
};
