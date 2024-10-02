import { useCopilotReadable } from "@copilotkit/react-core";
import React, { useState } from "react";
import pdfToText from "react-pdftotext";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

const PdfUpload: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [parsedText, setParsedText] = useState<string>("");

  useCopilotReadable(
    {
      description: "Resume",
      value: JSON.stringify(parsedText),
    },
    [parsedText]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;

    if (selectedFile)
      pdfToText(selectedFile)
        .then(text => {
          setParsedText(text);
          setPdfFile(selectedFile);
          toast.success("Successfully extracted text from pdf");
        })
        .catch(error => toast.error("Failed to extract text from pdf", error));
  };

  return (
    <div className="max-w-[250px] w-full p-4 rounded-lg bg-white">
      <h2>{pdfFile ? pdfFile.name : "Upload a PDF"}</h2>
      <div className="flex items-center">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="flex items-center cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          <DocumentTextIcon className="h-6 w-6 mr-2" />
          {pdfFile ? "Change file" : "Choose File"}
        </label>
      </div>
    </div>
  );
};

export default PdfUpload;
