import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const addQuestion = (q) => {
    setQuestions([...questions, { ...q, id: uuidv4() }]);
    toast.success("✅ Savol muvaffaqiyatli qo'shildi!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const deleteQuestion = (questionId) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
    if (editingQuestion && editingQuestion.id === questionId) {
      setEditingQuestion(null);
    }
    toast.error("🗑️ Savol o'chirildi!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const editQuestion = (question) => {
    setEditingQuestion(question);
    toast.info("✏️ Savolni tahrirlash rejimi", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const updateQuestion = (questionId, updatedQuestion) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...updatedQuestion, id: questionId } : q
      )
    );
    setEditingQuestion(null);
    toast.success("✅ Savol muvaffaqiyatli yangilandi!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const cancelEdit = () => {
    setEditingQuestion(null);
    toast.warning("❌ Tahrirlash bekor qilindi", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return {
    questions,
    editingQuestion,
    addQuestion,
    deleteQuestion,
    editQuestion,
    updateQuestion,
    cancelEdit,
  };
};

export default useQuestions;
