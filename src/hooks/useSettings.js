import { useState } from "react";

const useSettings = () => {
  const [questionsPerPage, setQuestionsPerPage] = useState(10);

  return {
    questionsPerPage,
    setQuestionsPerPage,
  };
};

export default useSettings;
