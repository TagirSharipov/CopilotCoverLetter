export const useCopilotTask = () => {
  const fetchCopilotTask = async (input: string) => {
    const response = await fetch("/api/copilotkit/chat", {
      method: "POST",
      body: JSON.stringify({ prompt: input }),
    });
    const data = await response.json();
    return data;
  };
  return { fetchCopilotTask };
};
