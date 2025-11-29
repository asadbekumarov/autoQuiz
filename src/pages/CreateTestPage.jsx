// import { useState, useEffect } from 'react';
// import { Edit, Trash2, Plus, Eye, Save, Download } from 'lucide-react';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';


// function CreateTestPage() {
//     const [questions, setQuestions] = useState([]);
//     const [testName, setTestName] = useState('');
//     const [currentQuestion, setCurrentQuestion] = useState({
//         text: '',
//         answers: ['', '', '', ''],
//     });
//     const [editIndex, setEditIndex] = useState(null);
//     const [showSaveModal, setShowSaveModal] = useState(false);
//     const [localSavedTests, setLocalSavedTests] = useState([]);

//     useEffect(() => {
//         const saved = JSON.parse(localStorage.getItem('savedTests') || '[]');
//         setLocalSavedTests(saved);

//         // Check if there's a template to use
//         const templateToUse = localStorage.getItem('templateToUse');
//         if (templateToUse) {
//             const template = JSON.parse(templateToUse);
//             setTestName(template.title);
//             setQuestions(template.questions);
//             localStorage.removeItem('templateToUse');
//         }
//     }, []);

//     const handleInputChange = (index, value) => {
//         const updatedAnswers = [...currentQuestion.answers];
//         updatedAnswers[index] = value;
//         setCurrentQuestion({ ...currentQuestion, answers: updatedAnswers });
//     };

//     const handleAddQuestion = () => {
//         const filledAnswers = currentQuestion.answers.filter(ans => ans.trim() !== '');
//         if (currentQuestion.text.trim() === '') {
//             alert('Savol matnini kiriting');
//             return;
//         }
//         if (filledAnswers.length < 2) {
//             alert('Kamida 2 ta javob variantini kiriting!');
//             return;
//         }

//         let questionText = currentQuestion.text.trim();
//         if (!questionText.endsWith('?')) questionText += '?';

//         const updatedQuestion = { ...currentQuestion, text: questionText };

//         if (editIndex !== null) {
//             const updated = [...questions];
//             updated[editIndex] = updatedQuestion;
//             setQuestions(updated);
//             setEditIndex(null);
//         } else {
//             setQuestions([...questions, updatedQuestion]);
//         }

//         setCurrentQuestion({ text: '', answers: ['', '', '', ''] });
//     };

//     const handleDelete = (index) => {
//         setQuestions(questions.filter((_, i) => i !== index));
//     };

//     const handleEdit = (index) => {
//         setCurrentQuestion(questions[index]);
//         setEditIndex(index);
//     };

//     const handleSaveTest = () => {
//         if (questions.length === 0) {
//             alert('Test saqlash uchun kamida 1 ta savol qo\'shing');
//             return;
//         }
//         if (!testName.trim()) {
//             alert('Test nomini kiriting');
//             return;
//         }

//         const newTest = {
//             id: Date.now(),
//             name: testName.trim(),
//             questions,
//             createdAt: new Date().toISOString(),
//             questionsCount: questions.length,
//         };

//         const updatedTests = [...localSavedTests, newTest];
//         setLocalSavedTests(updatedTests);
//         localStorage.setItem('savedTests', JSON.stringify(updatedTests));

//         setTestName('');
//         setQuestions([]);
//         setShowSaveModal(false);
//         alert('Test muvaffaqiyatli saqlandi!');
//     };

//     const handlePreview = () => {
//         if (questions.length === 0) {
//             alert('Ko\'rish uchun kamida 1 ta savol qo\'shing');
//             return;
//         }

//         const previewWindow = window.open('', '_blank');
//         previewWindow.document.write(`
//             <!DOCTYPE html>
//             <html>
//             <head>
//                 <title>Test Preview</title>
//                 <script src="https://cdn.tailwindcss.com"></script>
//                 <style>
//                     @media print {
//                         @page {
//                             size: A4;
//                             margin: 0;
//                         }
//                     body {
//                             margin: 0;
//                             padding: 0;
//                         }
//                     }
//                     .page {
//                         width: 210mm;
//                         height: 297mm;
//                         margin: 0 auto;
//                         padding: 10mm;
//                         box-sizing: border-box;
//                         page-break-after: always;
//                         position: relative;
//                     }
//                     .page:last-child {
//                         page-break-after: avoid;
//                     }
//                     .columns-container {
//                         display: flex;
//                         gap: 5mm;
//                         height: 100%;
//                     }
//                     .column {
//                         flex: 1;
//                         display: flex;
//                         flex-direction: column;
//                         gap: 8mm;
//                     }
//                     .question-item {
//                         flex: 1;
//                         padding: 3mm;
//                         box-sizing: border-box;
//                         // border: 1px solid #e5e7eb;
//                         border-radius: 2mm;
//                     }
//                     .question-content {
//                         margin-bottom: 2mm;
//                         font-weight: 500;
//                     }
//                     .answer-option {
//                         margin-left: 5mm;
//                         margin-bottom: 1mm;
//                         font-size: 10pt;
//                     }
//                 </style>
//             </head>
//             <body class="bg-white">
//         `);

//         // Split questions into pages with 10 questions per page
//         const questionsPerPage = 10;
//         const totalPages = Math.ceil(questions.length / questionsPerPage);

//         for (let page = 0; page < totalPages; page++) {
//             previewWindow.document.write(`
//                 <div class="page bg-white">
//                     <div class="text-center mb-6">
//                         <h1 class="text-xl font-bold text-gray-800 mb-1">${testName || 'Test Preview'}</h1>

//                         <div class="my-2"></div>
//                     </div>
//             `);

//             const startIdx = page * questionsPerPage;
//             const endIdx = Math.min(startIdx + questionsPerPage, questions.length);
//             const pageQuestions = questions.slice(startIdx, endIdx);

//             // Split questions into 2 columns: left column (questions 1-5) and right column (questions 6-10)
//             const leftColumnQuestions = pageQuestions.slice(0, 5);
//             const rightColumnQuestions = pageQuestions.slice(5, 10);

//             previewWindow.document.write('<div class="columns-container">');

//             // Left Column
//             previewWindow.document.write('<div class="column">');
//             leftColumnQuestions.forEach((q, i) => {
//                 const globalIndex = startIdx + i;
//                 previewWindow.document.write(`
//                     <div class="question-item">
//                         <div class="question-content font-medium text-gray-800">
//                             ${globalIndex + 1}. ${q.text}
//                         </div>
//                         <div class="answer-options">
//                             ${q.answers.filter(a => a.trim()).map((a, j) => `
//                                 <div class="answer-option flex items-center">
//                                     <div class="w-3 h-3 rounded mr-1"></div>
//                                     <span>${String.fromCharCode(97 + j)}) ${a}</span>
//                                 </div>
//                             `).join('')}
//                         </div>
//                     </div>
//                 `);
//             });
//             // Fill empty spaces if less than 5 questions
//             for (let i = leftColumnQuestions.length; i < 5; i++) {
//                 previewWindow.document.write('<div class="question-item"></div>');
//             }
//             previewWindow.document.write('</div>');

//             // Right Column
//             previewWindow.document.write('<div class="column">');
//             rightColumnQuestions.forEach((q, i) => {
//                 const globalIndex = startIdx + 5 + i;
//                 previewWindow.document.write(`
//                     <div class="question-item">
//                         <div class="question-content font-medium text-gray-800">
//                             ${globalIndex + 1}. ${q.text}
//                         </div>
//                         <div class="answer-options">
//                             ${q.answers.filter(a => a.trim()).map((a, j) => `
//                                 <div class="answer-option flex items-center">
//                                     <div class="w-3 h-3 rounded mr-1"></div>
//                                     <span>${String.fromCharCode(97 + j)}) ${a}</span>
//                                 </div>
//                     `).join('')}
//                 </div>
//                     </div>
//             `);
//             });
//             // Fill empty spaces if less than 5 questions
//             for (let i = rightColumnQuestions.length; i < 5; i++) {
//                 previewWindow.document.write('<div class="question-item"></div>');
//             }
//             previewWindow.document.write('</div>');

//             previewWindow.document.write('</div>'); // Close columns-container
//             previewWindow.document.write('</div>'); // Close page
//         }

//         previewWindow.document.write('</body></html>');
//         previewWindow.document.close();
//     };

//     const handleDownload = async () => {
//         if (questions.length === 0) {
//             alert('Yuklab olish uchun kamida 1 ta savol qo\'shing');
//             return;
//         }

//         const format = prompt('Qaysi formatda yuklab olmoqchisiz? (pdf/png)', 'pdf').toLowerCase();

//         if (!format || (format !== 'pdf' && format !== 'png')) {
//             alert('Noto\'g\'ri format kiritildi. Iltimos, "pdf" yoki "png" ni kiriting.');
//             return;
//         }

//         if (format === 'pdf') {
//             // Create temporary preview element
//             const tempContainer = document.createElement('div');
//             tempContainer.className = 'fixed top-0 left-0 w-full h-full bg-white z-50 overflow-hidden';
//             tempContainer.style.cssText = 'width: 210mm; height: 297mm; margin: 0; padding: 0;';

//             // Split questions into pages
//             const questionsPerPage = 10;
//             const totalPages = Math.ceil(questions.length / questionsPerPage);

//             for (let page = 0; page < totalPages; page++) {
//                 const pageDiv = document.createElement('div');
//                 pageDiv.className = 'page bg-white';
//                 pageDiv.style.cssText = `
//                     width: 210mm;
//                     height: 297mm;
//                     padding: 10mm;
//                     box-sizing: border-box;
//                     position: relative;
//                     page-break-after: ${page < totalPages - 1 ? 'always' : 'avoid'};
//                 `;

//                 // Header
//                 const headerDiv = document.createElement('div');
//                 headerDiv.className = 'text-center mb-6';
//                 headerDiv.innerHTML = `
//                     <h1 class="text-xl font-bold text-gray-800 mb-1">${testName || 'Test'}</h1>
//                     <div class="text-xs text-gray-600 flex justify-between">

//                     </div>
//                     <div class="my-2"></div>
//                 `;
//                 pageDiv.appendChild(headerDiv);

//                 // Questions
//                 const startIdx = page * questionsPerPage;
//                 const endIdx = Math.min(startIdx + questionsPerPage, questions.length);
//                 const pageQuestions = questions.slice(startIdx, endIdx);

//                 // Split questions into 2 columns: left column (questions 1-5) and right column (questions 6-10)
//                 const leftColumnQuestions = pageQuestions.slice(0, 5);
//                 const rightColumnQuestions = pageQuestions.slice(5, 10);

//                 // Create columns container
//                 const columnsContainer = document.createElement('div');
//                 columnsContainer.style.cssText = 'display: flex; gap: 5mm; height: calc(100% - 60px);';

//                 // Left Column
//                 const leftColumn = document.createElement('div');
//                 leftColumn.style.cssText = 'flex: 1; display: flex; flex-direction: column; gap: 8mm;';

//                 leftColumnQuestions.forEach((q, i) => {
//                     const globalIndex = startIdx + i;
//                     const questionDiv = document.createElement('div');
//                     questionDiv.style.cssText = 'flex: 1; padding: 3mm; box-sizing: border-box; ';
//                     questionDiv.innerHTML = `
//                         <div class="question-content font-medium text-gray-800 mb-2">
//                             ${globalIndex + 1}. ${q.text}
//                         </div>
//                         <div class="answer-options">
//                             ${q.answers.filter(a => a.trim()).map((a, j) => `
//                                 <div class="answer-option flex items-center mb-1" style="margin-left: 5mm; margin-bottom: 1mm; font-size: 10pt;">
//                                     <div class="w-3 h-3 rounded mr-1"></div>
//                                     <span>${String.fromCharCode(97 + j)}) ${a}</span>
//                                 </div>
//                             `).join('')}
//                         </div>
//                     `;
//                     leftColumn.appendChild(questionDiv);
//                 });

//                 // Fill empty spaces if less than 5 questions
//                 for (let i = leftColumnQuestions.length; i < 5; i++) {
//                     const emptyDiv = document.createElement('div');
//                     emptyDiv.style.cssText = 'flex: 1; padding: 3mm; box-sizing: border-box;';
//                     leftColumn.appendChild(emptyDiv);
//                 }

//                 // Right Column
//                 const rightColumn = document.createElement('div');
//                 rightColumn.style.cssText = 'flex: 1; display: flex; flex-direction: column; gap: 8mm;';

//                 rightColumnQuestions.forEach((q, i) => {
//                     const globalIndex = startIdx + 5 + i;
//                     const questionDiv = document.createElement('div');
//                     questionDiv.style.cssText = 'flex: 1; padding: 3mm; box-sizing: border-box;';
//                     questionDiv.innerHTML = `
//                         <div class="question-content font-medium text-gray-800 mb-2">
//                             ${globalIndex + 1}. ${q.text}
//                         </div>
//                         <div class="answer-options">
//                             ${q.answers.filter(a => a.trim()).map((a, j) => `
//                                 <div class="answer-option flex items-center mb-1" style="margin-left: 5mm; margin-bottom: 1mm; font-size: 10pt;">
//                                     <div class="w-3 h-3 rounded mr-1"></div>
//                                     <span>${String.fromCharCode(97 + j)}) ${a}</span>
//                                 </div>
//                             `).join('')}
//                         </div>
//                     `;
//                     rightColumn.appendChild(questionDiv);
//                 });
//                 for (let i = rightColumnQuestions.length; i < 5; i++) {
//                     const emptyDiv = document.createElement('div');
//                     emptyDiv.style.cssText = 'flex: 1; padding: 3mm; box-sizing: border-box;';
//                     rightColumn.appendChild(emptyDiv);
//                 }

//                 columnsContainer.appendChild(leftColumn);
//                 columnsContainer.appendChild(rightColumn);
//                 pageDiv.appendChild(columnsContainer);

//                 tempContainer.appendChild(pageDiv);
//             }

//             // Add to document temporarily
//             document.body.appendChild(tempContainer);

//             // Generate PDF
//             const doc = new jsPDF({
//                 orientation: 'portrait',
//                 unit: 'mm',
//                 format: 'a4',
//             });

//             const pages = tempContainer.querySelectorAll('.page');

//             for (let i = 0; i < pages.length; i++) {
//                 if (i > 0) doc.addPage();

//                 const canvas = await html2canvas(pages[i], {
//                     scale: 2,
//                     useCORS: true,
//                     logging: false
//                 });

//                 const imgData = canvas.toDataURL('image/png');
//                 doc.addImage(imgData, 'PNG', 0, 0, 210, 297);
//             }

//             // Remove temporary element
//             document.body.removeChild(tempContainer);

//             // Save PDF
//             doc.save(`${testName || 'test'}-${Date.now()}.pdf`);

//         } else if (format === 'png') {
//             // Create temporary preview element for PNG
//             const tempContainer = document.createElement('div');
//             tempContainer.className = 'fixed top-0 left-0 w-full h-full bg-white z-50 overflow-hidden';
//             tempContainer.style.cssText = 'width: 210mm; height: 297mm; margin: 0; padding: 0;';

//             // Header
//             tempContainer.innerHTML = `
//                 <div class="page bg-white" style="width: 210mm; height: 297mm; padding: 10mm; box-sizing: border-box;">
//                     <div class="text-center mb-6">
//                         <h1 class="text-xl font-bold text-gray-800 mb-1">${testName || 'Test'}</h1>

//                         <div class=" my-2"></div>
//                 </div>
//             `;

//             // First 10 questions (2 columns x 5 questions each)
//             const displayQuestions = questions.slice(0, 10);
//             const leftColumnQuestions = displayQuestions.slice(0, 5);
//             const rightColumnQuestions = displayQuestions.slice(5, 10);

//             // Create columns container
//             tempContainer.innerHTML += '<div style="display: flex; gap: 5mm; height: calc(100% - 60px);">';

//             // Left Column
//             tempContainer.innerHTML += '<div style="flex: 1; display: flex; flex-direction: column; gap: 8mm;">';
//             leftColumnQuestions.forEach((q, i) => {
//                 tempContainer.innerHTML += `
//                     <div style="flex: 1; padding: 3mm; box-sizing: border-box; ">
//                         <div class="question-content font-medium text-gray-800 mb-2">
//                             ${i + 1}. ${q.text}
//                         </div>
//                         <div class="answer-options">
//                             ${q.answers.filter(a => a.trim()).map((a, j) => `
//                                 <div class="answer-option flex items-center mb-1" style="margin-left: 5mm; margin-bottom: 1mm; font-size: 10pt;">
//                                     <div class="w-3 h-3 rounded mr-1"></div>
//                                     <span>${String.fromCharCode(97 + j)}) ${a}</span>
//                                 </div>
//                             `).join('')}
//                         </div>
//                     </div>
//                 `;
//             });
//             // Fill empty spaces
//             for (let i = leftColumnQuestions.length; i < 5; i++) {
//                 tempContainer.innerHTML += '<div style="flex: 1; padding: 3mm; box-sizing: border-box;"></div>';
//             }
//             tempContainer.innerHTML += '</div>';

//             // Right Column
//             tempContainer.innerHTML += '<div style="flex: 1; display: flex; flex-direction: column; gap: 8mm;">';
//             rightColumnQuestions.forEach((q, i) => {
//                 tempContainer.innerHTML += `
//                     <div style="flex: 1; padding: 3mm; box-sizing: border-box;">
//                         <div class="question-content font-medium text-gray-800 mb-2">
//                             ${i + 6}. ${q.text}
//                         </div>
//                         <div class="answer-options">
//                             ${q.answers.filter(a => a.trim()).map((a, j) => `
//                                 <div class="answer-option flex items-center mb-1" style="margin-left: 5mm; margin-bottom: 1mm; font-size: 10pt;">
//                                     <div class="w-3 h-3 rounded mr-1"></div>
//                                     <span>${String.fromCharCode(97 + j)}) ${a}</span>
//                             </div>
//                         `).join('')}
//                         </div>
//                     </div>
//                 `;
//             });
//             // Fill empty spaces
//             for (let i = rightColumnQuestions.length; i < 5; i++) {
//                 tempContainer.innerHTML += '<div style="flex: 1; padding: 3mm; box-sizing: border-box;"></div>';
//             }
//             tempContainer.innerHTML += '</div>';

//             tempContainer.innerHTML += '</div>'; // Close columns container
//             tempContainer.innerHTML += '</div>'; // Close page
//             document.body.appendChild(tempContainer);

//             // Generate PNG
//             const canvas = await html2canvas(tempContainer, {
//                 scale: 2,
//                 useCORS: true,
//                 logging: false
//             });

//             // Remove temporary element
//             document.body.removeChild(tempContainer);

//             // Save PNG
//             const link = document.createElement('a');
//             link.download = `${testName || 'test'}-${Date.now()}.png`;
//             link.href = canvas.toDataURL('image/png');
//             link.click();
//         }
//     };

//     return (
//         <section className="bg-green-50 min-h-screen py-8 px-4">
//             <div className="max-w-5xl mx-auto">
//                 <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//                     <h1 className="text-3xl font-bold text-gray-800 mb-6">Test yaratish</h1>

//                     <div className="mb-6">
//                         <input
//                             type="text"
//                             placeholder="Test nomini kiriting..."
//                             value={testName}
//                             onChange={(e) => setTestName(e.target.value)}
//                             className="w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-green-400 focus:outline-none text-lg font-semibold"
//                         />
//                     </div>

//                     <div className="max-h-64 overflow-y-auto pr-2 mb-6">
//                         {questions.map((q, index) => (
//                             <div
//                                 key={index}
//                                 className="bg-white  rounded-lg p-4 mb-4 flex justify-between items-center"
//                             >
//                                 <div className="flex-1">
//                                     <h3 className="font-semibold text-gray-800">{index + 1}. {q.text}</h3>
//                                     <ul className="list-none pl-6 text-gray-600 mt-1">
//                                         {q.answers.filter(a => a.trim()).map((a, i) => (
//                                             <li key={i}>{String.fromCharCode(97 + i)}) {a}</li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                                 <div className="flex gap-2">
//                                     <button onClick={() => handleEdit(index)} className="text-blue-600 hover:text-blue-800 p-2">
//                                         <Edit className="w-5 h-5" />
//                                     </button>
//                                     <button onClick={() => handleDelete(index)} className="text-red-600 hover:text-red-800 p-2">
//                                         <Trash2 className="w-5 h-5" />
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="bg-white border-2 rounded-lg p-6 space-y-6 mb-6">
//                         <input
//                             type="text"
//                             placeholder="Savol matni"
//                             value={currentQuestion.text}
//                             onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
//                             className="w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-green-400 focus:outline-none text-base font-semibold"
//                         />
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             {currentQuestion.answers.map((ans, i) => (
//                                 <input
//                                     key={i}
//                                     type="text"
//                                     placeholder={`${String.fromCharCode(97 + i)}) Javob`}
//                                     value={ans}
//                                     onChange={(e) => handleInputChange(i, e.target.value)}
//                             className="w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-green-400 focus:outline-none text-base font-semibold"
//                                 />
//                             ))}
//                         </div>
//                         <div className="text-center w-full">
//                             <button
//                                 onClick={handleAddQuestion}
//                                 className="w-full flex justify-center items-center gap-2 py-3 rounded-lg text-green-700 bg-green-100 transition"
//                             >
//                                 <Plus className="w-4 h-4" />
//                                 {editIndex !== null ? 'Savolni yangilash' : "Savol qo'shish"}
//                             </button>
//                         </div>
//                     </div>

//                     <div className="bg-white p-4 rounded-lg flex items-center justify-between flex-wrap gap-4">
//                         <p className="text-gray-800 font-medium">{questions.length} ta savol yaratildi</p>
//                         <div className="flex flex-wrap gap-4">
//                             <button
//                                 onClick={handlePreview}
//                                 className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 flex items-center gap-1 transition"
//                             >
//                                 <Eye className="w-3 h-3" /> Ko'rish
//                             </button>
//                             <button
//                                 onClick={() => setShowSaveModal(true)}
//                                 className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center gap-1 transition"
//                             >
//                                 <Save className="w-4 h-4" /> Saqlash
//                             </button>
//                             <button
//                                 onClick={handleDownload}
//                                 className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1 transition"
//                             >
//                                 <Download className="w-4 h-4" /> Yuklab olish
//                             </button>
//                         </div>
//                     </div>

//                     {localSavedTests.length > 0 && (
//                         <div className="mt-6 bg-blue-50 p-4 rounded-lg">
//                             <p className="text-blue-800 font-medium">
//                                 📊 {localSavedTests.length} ta test saqlandi
//                             </p>
//                         </div>
//                     )}
//                 </div>

//                 {/* Saqlash Modal */}
//                 {showSaveModal && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                         <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//                             <h3 className="text-xl font-bold mb-4">Testni saqlash</h3>
//                             <input
//                                 type="text"
//                                 placeholder="Test nomini kiriting..."
//                                 value={testName}
//                                 onChange={(e) => setTestName(e.target.value)}
//                                 className="w-full p-3 rounded mb-4 focus:ring-2 focus:ring-green-400 focus:outline-none"
//                             />
//                             <div className="flex gap-4">
//                                 <button
//                                     onClick={handleSaveTest}
//                                     className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
//                                 >
//                                     Saqlash
//                                 </button>
//                                 <button
//                                     onClick={() => setShowSaveModal(false)}
//                                     className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
//                                 >
//                                     Bekor qilish
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// }

// export default CreateTestPage;
import { useState, useEffect, useRef } from "react";
import { Edit, Trash2, Plus, Download, Eye, Save, CheckCircle2, Shuffle, Settings } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CreateTestPage() {
    const [testName, setTestName] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({
        text: "",
        answers: ["", "", "", ""],
        correctIndex: null,
    });
    const [editIndex, setEditIndex] = useState(null);
    const [localSavedTests, setLocalSavedTests] = useState([]);
    const [settingsOpen, setSettingsOpen] = useState(true);
    const [config, setConfig] = useState({
        school: "",
        subject: "",
        className: "",
        date: new Date().toISOString().slice(0, 10),
        twoColumns: true,
        latexEnabled: false,
    });
    const [dragIndex, setDragIndex] = useState(null);
    const answerRefs = useRef([]);
    const previewRef = useRef(null);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("savedTests") || "[]");
        setLocalSavedTests(saved);
    }, []);

    const handleInputChange = (index, value) => {
        const updated = [...currentQuestion.answers];
        updated[index] = value;
        setCurrentQuestion({ ...currentQuestion, answers: updated });
    };

    const handleAddQuestion = () => {
        if (!currentQuestion.text.trim()) return alert("Savol matnini kiriting");
        const pairs = currentQuestion.answers
            .map((a, idx) => ({ a, idx }))
            .filter((p) => p.a.trim());
        const validAnswers = pairs.map((p) => p.a);
        if (validAnswers.length < 2)
            return alert("Kamida 2 ta javob variantini kiriting!");

        let newCorrectIndex = null;
        if (currentQuestion.correctIndex !== null) {
            const found = pairs.findIndex((p) => p.idx === currentQuestion.correctIndex);
            newCorrectIndex = found !== -1 ? found : null;
        }

        const formatted = {
            text: currentQuestion.text.trim().endsWith("?")
                ? currentQuestion.text.trim()
                : currentQuestion.text.trim() + "?",
            answers: validAnswers,
            correctIndex: newCorrectIndex,
        };

        if (editIndex !== null) {
            const updated = [...questions];
            updated[editIndex] = formatted;
            setQuestions(updated);
            setEditIndex(null);
        } else {
            setQuestions([...questions, formatted]);
        }

        setCurrentQuestion({ text: "", answers: ["", "", "", ""], correctIndex: null });
    };

    const handleDelete = (index) =>
        setQuestions(questions.filter((_, i) => i !== index));

    const handleEdit = (index) => {
        setCurrentQuestion(questions[index]);
        setEditIndex(index);
    };

    const handleSaveTest = () => {
        if (!testName.trim()) return alert("Test nomini kiriting");
        if (questions.length === 0)
            return alert("Kamida 1 ta savol qo‘shing!");

        const newTest = {
            id: Date.now(),
            name: testName,
            questions,
            createdAt: new Date().toISOString(),
            settings: config,
        };

        const updated = [...localSavedTests, newTest];
        localStorage.setItem("savedTests", JSON.stringify(updated));
        setLocalSavedTests(updated);

        alert("Test saqlandi!");
        setTestName("");
        setQuestions([]);
    };

    const handleDownloadPDF = async () => {
        if (questions.length === 0) return alert("Savollar mavjud emas");

        const doc = new jsPDF({ unit: "mm", format: "a4" });
        const element = previewRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const img = canvas.toDataURL("image/png");
        doc.addImage(img, "PNG", 0, 0, 210, 297);
        doc.save(`${testName || "test"}.pdf`);
    };

    const handleDownloadPNG = async () => {
        if (questions.length === 0) return alert("Savollar mavjud emas");

        const canvas = await html2canvas(previewRef.current, { scale: 2 });
        const link = document.createElement("a");
        link.download = `${testName || "test"}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    const handleDragStart = (index) => setDragIndex(index);
    const handleDragOver = (e) => e.preventDefault();
    const handleDrop = (index) => {
        if (dragIndex === null || dragIndex === index) return;
        const updated = [...questions];
        const [moved] = updated.splice(dragIndex, 1);
        updated.splice(index, 0, moved);
        setQuestions(updated);
        setDragIndex(null);
    };

    const shuffleArray = (arr) => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    const handleRandomize = () => {
        const randomized = questions.map((q) => {
            const indices = q.answers.map((_, idx) => idx);
            const shuffledIdx = shuffleArray(indices);
            const newAnswers = shuffledIdx.map((si) => q.answers[si]);
            let newCorrect = q.correctIndex;
            if (q.correctIndex !== null) {
                newCorrect = shuffledIdx.findIndex((si) => si === q.correctIndex);
            }
            return { ...q, answers: newAnswers, correctIndex: newCorrect };
        });
        setQuestions(shuffleArray(randomized));
    };

    const focusNextField = (i) => {
        const nextRef = answerRefs.current[i + 1];
        if (nextRef && nextRef.focus) nextRef.focus();
    };

    useEffect(() => {
        if (config.latexEnabled && previewRef.current) {
            window.MathJax?.typesetPromise?.([previewRef.current]).catch(() => {});
        }
    }, [questions, testName, config]);

    return (
        <section className="bg-green-50 min-h-screen py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Test yaratish</h1>

                    <input
                        type="text"
                        placeholder="Test nomini kiriting..."
                        value={testName}
                        onChange={(e) => setTestName(e.target.value)}
                        className="w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-green-400 focus:outline-none text-lg font-semibold mb-6"
                    />

                    <div className="mb-4">
                        <button
                            onClick={() => setSettingsOpen(!settingsOpen)}
                            className="flex items-center gap-2 text-sm px-3 py-2 rounded bg-gray-100 hover:bg-gray-200"
                        >
                            <Settings className="w-4 h-4" /> Test Sozlamalari
                        </button>
                        {settingsOpen && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <input
                                    type="text"
                                    placeholder="Maktab/Tashkilot"
                                    value={config.school}
                                    onChange={(e) => setConfig({ ...config, school: e.target.value })}
                                    className="w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Fan"
                                    value={config.subject}
                                    onChange={(e) => setConfig({ ...config, subject: e.target.value })}
                                    className="w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Sinf"
                                    value={config.className}
                                    onChange={(e) => setConfig({ ...config, className: e.target.value })}
                                    className="w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                                />
                                <input
                                    type="date"
                                    placeholder="Sana"
                                    value={config.date}
                                    onChange={(e) => setConfig({ ...config, date: e.target.value })}
                                    className="w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                                />
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={config.twoColumns}
                                        onChange={(e) => setConfig({ ...config, twoColumns: e.target.checked })}
                                    />
                                    2 ustunli ko'rinish
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={config.latexEnabled}
                                        onChange={(e) => setConfig({ ...config, latexEnabled: e.target.checked })}
                                    />
                                    LaTeX/MathJax formatlash
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Savollar ro‘yxati */}
                    {questions.length > 0 && (
                        <div className="max-h-64 overflow-y-auto pr-2 mb-6">
                            {questions.map((q, index) => (
                                <div
                                    key={index}
                                    className="bg-white border rounded-lg p-4 mb-4 flex justify-between items-start"
                                    draggable
                                    onDragStart={() => handleDragStart(index)}
                                    onDragOver={handleDragOver}
                                    onDrop={() => handleDrop(index)}
                                >
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800">
                                            {index + 1}. {q.text}
                                        </h3>
                                        <ul className="pl-6 text-gray-600 mt-1 list-disc">
                                            {q.answers.map((a, i) => (
                                                <li key={i} className="flex items-center gap-2">
                                                    {String.fromCharCode(97 + i)}) {a}
                                                    {q.correctIndex === i && (
                                                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(index)}
                                            className="text-blue-600 hover:text-blue-800 p-2"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="text-red-600 hover:text-red-800 p-2"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Savol qo‘shish */}
                    <div className="bg-white border-2 rounded-lg p-6 space-y-6 mb-6">
                        <input
                            type="text"
                            placeholder="Savol matni"
                            value={currentQuestion.text}
                            onChange={(e) =>
                                setCurrentQuestion({ ...currentQuestion, text: e.target.value })
                            }
                            className="w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-green-400 focus:outline-none text-base font-semibold"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentQuestion.answers.map((ans, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <input
                                        ref={(el) => (answerRefs.current[i] = el)}
                                        type="text"
                                        placeholder={`${String.fromCharCode(97 + i)}) Javob`}
                                        value={ans}
                                        onChange={(e) => handleInputChange(i, e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                if (i < currentQuestion.answers.length - 1) {
                                                    focusNextField(i);
                                                } else {
                                                    handleAddQuestion();
                                                }
                                            }
                                        }}
                                        className="w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-green-400 focus:outline-none text-base font-semibold"
                                    />
                                    <label className="flex items-center gap-1 text-sm">
                                        <input
                                            type="radio"
                                            name="correctAnswer"
                                            checked={currentQuestion.correctIndex === i}
                                            onChange={() => setCurrentQuestion({ ...currentQuestion, correctIndex: i })}
                                        />
                                        To'g'ri
                                    </label>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={handleAddQuestion}
                            className="w-full flex justify-center items-center gap-2 py-3 rounded-lg text-green-700 bg-green-100 transition"
                        >
                            <Plus className="w-4 h-4" />
                            {editIndex !== null ? "Savolni yangilash" : "Savol qo'shish"}
                        </button>
                    </div>

                    {/* Tugmalar */}
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={handleSaveTest}
                            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg"
                        >
                            <Save className="w-5 h-5" /> Saqlash
                        </button>
                        <button
                            onClick={handleRandomize}
                            className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg"
                        >
                            <Shuffle className="w-5 h-5" /> Aralashtirish
                        </button>
                        <button
                            onClick={handleDownloadPDF}
                            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            <Download className="w-5 h-5" /> PDF
                        </button>
                        <button
                            onClick={handleDownloadPNG}
                            className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg"
                        >
                            <Eye className="w-5 h-5" /> PNG
                        </button>
                    </div>
                </div>

                {/* Preview */}
                {questions.length > 0 && (
                    <div
                        ref={previewRef}
                        className="bg-white rounded-lg shadow-md p-6 mt-8 print:w-[210mm] print:h-[297mm]"
                    >
                        <div className="mb-4">
                            <h2 className="text-center text-xl font-bold text-gray-800">
                                {testName || "Test Preview"}
                            </h2>
                            <div className="flex justify-between text-xs text-gray-600 mt-2">
                                <span>{config.school}</span>
                                <span>{config.subject}</span>
                                <span>{config.className}</span>
                                <span>{config.date}</span>
                            </div>
                            <div className="mt-2 text-sm">O'quvchi: ______________________________</div>
                        </div>
                        <div className={config.twoColumns ? "grid grid-cols-2 gap-4" : "grid grid-cols-1 gap-4"}>
                            {questions.map((q, i) => (
                                <div key={i} className="border rounded-lg p-3">
                                    <p className="font-medium mb-2">
                                        {i + 1}. {q.text}
                                    </p>
                                    {q.answers.map((a, j) => (
                                        <div key={j} className="text-sm ml-4">
                                            {String.fromCharCode(97 + j)}) {a}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
