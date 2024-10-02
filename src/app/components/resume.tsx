// import React from "react";
import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import { CopilotChat } from "@copilotkit/react-ui";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import { CopilotContext } from "@/context/CopilotContextProvider";
import { useGithubData } from "../hooks/useGithub";
import PdfUpload from "./PdfUpload";
import GithubData from "./GithubData";

import "./resume.css";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const CoverLetterAndResume = () => {
  const { githubData, isLoading } = useGithubData();

  return (
    <div className="flex flex-col h-screen">
      <div>
        <div className="px-4 sm:px-6 lg:px-8 bg-slate-50 py-4">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-semibold leading-6 text-gray-900">
              ResumeBuilder
            </h1>
          </div>
        </div>
        <div className="sm:flex p-4 gap-8">
          <PdfUpload />

          <GithubData data={githubData} isLoading={isLoading} />
        </div>
      </div>

      <div className="flex flex-grow">
        <div className="w-full p-4 rounded-lg bg-white">
          <TabGroup>
            <TabList className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                    selected
                      ? "bg-white shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                Master your resume
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                    selected
                      ? "bg-white shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                Create Cover letter
              </Tab>
            </TabList>
            <TabPanels className="mt-2">
              <TabPanel className="bg-white rounded-xl p-3">
                <Resume />
              </TabPanel>
              <TabPanel className="bg-white rounded-xl p-3">
                <CoverLetter />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
        <div className="max-h-screen-minus-100">
          <CopilotChat
            labels={{
              title: "Your Assistant",
              initial: "Hi! 👋 Let's do it",
            }}
          />
        </div>
      </div>
    </div>
  );
};
const CoverLetter = () => {
  const {
    coverLetter = "",
    jobDescription,
    updateJobDescription = () => {},
  } = useContext(CopilotContext) || {};

  return (
    <div>
      <h2 className="text-lg font-semibold leading-6 text-gray-900 mb-4 p-2">
        Insert job description
      </h2>
      <textarea
        className="p-2"
        id="jobDescription"
        value={jobDescription}
        onChange={event => {
          updateJobDescription(event.target.value);
        }}
        rows={10}
        cols={113}
      />
      {/* Cover Letter Start */}
      <div className="mt-8 flow-root bg-slate-200">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div>
              <h2 className="text-lg font-semibold leading-6 text-gray-900 mb-4 p-2">
                Cover Letter
                <ClipboardDocumentIcon
                  className="h-5 w-5 ml-2 inline cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(coverLetter).then(() => {
                      toast.success("Copied to clipboard");
                    });
                  }}
                />
              </h2>

              <div className="min-w-full divide-y divide-gray-300 p-2">
                <div className="divide-y divide-gray-200 bg-white p-2">
                  <ReactMarkdown>{coverLetter}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cover Letter End */}
      {/* Cover Letter Preview Start */}
      <div className="mt-8 flow-root bg-slate-200">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div>
              <h2 className="text-lg font-semibold leading-6 text-gray-900 mb-4 p-2">
                Cover Letter Preview
              </h2>
              <div className="min-w-full divide-y divide-gray-300">
                {/* <Thead /> */}
                <div className="divide-y divide-gray-200 bg-white">
                  <textarea
                    className="p-2"
                    id="coverLetter"
                    defaultValue={coverLetter}
                    rows={10}
                    cols={113}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Resume = () => {
  const { resume = "" } = useContext(CopilotContext) || {};

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8 bg-slate-50 py-4">
        {/* Cover Letter Preview End */}
        {/* Resume Start */}
        <div className="mt-8 flow-root bg-slate-200">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <h2 className="text-lg font-semibold leading-6 text-gray-900 mb-4 p-2">
                Resume
              </h2>
              <div className="min-w-full divide-y divide-gray-300">
                {/* <Thead /> */}
                <div className="divide-y divide-gray-200 bg-white">
                  <ReactMarkdown>{resume}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Resume End */}
        {/* Cover Letter Preview Start */}
        <div className="mt-8 flow-root bg-slate-200">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div>
                <h2 className="text-lg font-semibold leading-6 text-gray-900 mb-4 p-2">
                  Resume Preview
                </h2>
                <div className="min-w-full divide-y divide-gray-300">
                  {/* <Thead /> */}
                  <div className="divide-y divide-gray-200 bg-white">
                    {/* {letter} */}
                    {/* <ReactMarkdown>{letter}</ReactMarkdown> */}
                    <textarea
                      className="p-2"
                      id="resume"
                      defaultValue={resume}
                      rows={10}
                      cols={113}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Cover Letter Preview End */}
      </div>
    </div>
  );
};
