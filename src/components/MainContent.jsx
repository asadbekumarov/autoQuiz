import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuestionForm from './QuestionForm';
import SettingsPanel from './SettingsPanel';
import DownloadPDFButton from './DownloadPDFButton';
import PDFPreview from './PDFPreview';
import useQuestions from '../hooks/useQuestions';
import useSettings from '../hooks/useSettings';

const MainContent = () => {
    const {
        questions,
        editingQuestion,
        addQuestion,
        deleteQuestion,
        editQuestion,
        updateQuestion,
        cancelEdit
    } = useQuestions();

    const { questionsPerPage, setQuestionsPerPage } = useSettings();

    return (
        <div>
            <ToastContainer />
            <div>
                <div>
                    <QuestionForm
                        onAdd={addQuestion}
                        editingQuestion={editingQuestion}
                        onUpdate={updateQuestion}
                        onCancelEdit={cancelEdit}
                    />
                    <SettingsPanel value={questionsPerPage} onChange={setQuestionsPerPage} />

                    <div>
                        <DownloadPDFButton questions={questions} questionsPerPage={questionsPerPage} />
                    </div>
                </div>

                <PDFPreview
                    questions={questions}
                    questionsPerPage={questionsPerPage}
                    onDelete={deleteQuestion}
                    onEdit={editQuestion}
                />
            </div>
        </div>
    );
};

export default MainContent; 