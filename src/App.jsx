import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuestionForm from './components/QuestionForm';
import QuestionList from './components/QuestionList';
import SettingsPanel from './components/SettingsPanel';
import DownloadPDFButton from './components/DownloadPDFButton';
import PreviewPDFButton from './components/PreviewPDFButton';
import PDFPreview from './components/PDFPreview';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [questionsPerPage, setQuestionsPerPage] = useState(10);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const addQuestion = (q) => {
    setQuestions([...questions, { ...q, id: uuidv4() }]);
    toast.success('✅ Savol muvaffaqiyatli qo\'shildi!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const deleteQuestion = (questionId) => {
    setQuestions(questions.filter(q => q.id !== questionId));
    if (editingQuestion && editingQuestion.id === questionId) {
      setEditingQuestion(null);
    }
    toast.error('🗑️ Savol o\'chirildi!', {
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
    toast.info('✏️ Savolni tahrirlash rejimi', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const updateQuestion = (questionId, updatedQuestion) => {
    setQuestions(questions.map(q => q.id === questionId ? { ...updatedQuestion, id: questionId } : q));
    setEditingQuestion(null);
    toast.success('✅ Savol muvaffaqiyatli yangilandi!', {
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
    toast.warning('❌ Tahrirlash bekor qilindi', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      <div className="max-w-4xl mx-auto p-2 sm:p-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">🧠 AutoQuiz — Test Yaratish</h1>

        <div className="max-w-2xl mx-auto space-y-4">
          <QuestionForm
            onAdd={addQuestion}
            editingQuestion={editingQuestion}
            onUpdate={updateQuestion}
            onCancelEdit={cancelEdit}
          />
          <SettingsPanel value={questionsPerPage} onChange={setQuestionsPerPage} />

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center mb-4 sm:mb-6">
            <PreviewPDFButton questions={questions} questionsPerPage={questionsPerPage} />
            <DownloadPDFButton questions={questions} questionsPerPage={questionsPerPage} />
          </div>
        </div>

        <QuestionList
          questions={questions}
          onDelete={deleteQuestion}
          onEdit={editQuestion}
        />
        <PDFPreview questions={questions} questionsPerPage={questionsPerPage} />
      </div>
    </div>
  );
};

export default App;
