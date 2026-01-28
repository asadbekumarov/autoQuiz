import React, { useState, useEffect } from 'react';
import { Trash2, Eye, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaFileAlt } from 'react-icons/fa';

function MyTestsPage() {
    const getLang = () => {
        try {
            const s = JSON.parse(localStorage.getItem('settings') || '{}');
            return s.language || 'uz';
        } catch { return 'uz'; }
    };
    const [lang, setLang] = useState(getLang());
    const t = (key) => {
        const dict = {
            uz: { myTestsTitle: 'Mening testlarim', search: 'Qidirish...', questionCount: 'Savollar soni:', addedDate: "Qo'shilgan sana:", view: "Ko'rish", download: 'Yuklab olish', delete: "O'chirish", close: 'Yopish', noTestsFound: 'Hech qanday test topilmadi 😔' },
            en: { myTestsTitle: 'My Tests', search: 'Search...', questionCount: 'Questions:', addedDate: 'Added:', view: 'View', download: 'Download', delete: 'Delete', close: 'Close', noTestsFound: 'No tests found 😔' },
            ru: { myTestsTitle: 'Мои тесты', search: 'Поиск...', questionCount: 'Количество вопросов:', addedDate: 'Добавлено:', view: 'Просмотр', download: 'Скачать', delete: 'Удалить', close: 'Закрыть', noTestsFound: 'Тесты не найдены 😔' },
        };
        return (dict[lang] || dict.uz)[key] || key;
    };
    useEffect(() => {
        const onSettingsChanged = () => setLang(getLang());
        window.addEventListener('settingsChanged', onSettingsChanged);
        return () => window.removeEventListener('settingsChanged', onSettingsChanged);
    }, []);
    const [searchTerm, setSearchTerm] = useState('');
    const [savedTests, setSavedTests] = useState([]);
    const [selectedTest, setSelectedTest] = useState(null);

    useEffect(() => {
        let storedTests = [];
        try { storedTests = JSON.parse(localStorage.getItem('savedTests') || '[]'); } catch { storedTests = []; }
        setSavedTests(storedTests);
    }, []);

    const filteredTests = savedTests.filter(test =>
        (test.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    const [page, setPage] = useState(0);
    const pageSize = 20;
    const pageCount = Math.ceil(filteredTests.length / pageSize);
    const pagedTests = filteredTests.slice(page * pageSize, page * pageSize + pageSize);

    const handleDeleteTest = (id) => {
        const updatedTests = savedTests.filter(test => test.id !== id);
        setSavedTests(updatedTests);
        localStorage.setItem('savedTests', JSON.stringify(updatedTests));
    };

    const handleDownloadTest = async (test) => {
        const format = prompt('Qaysi formatda yuklab olmoqchisiz? (pdf/png)', 'pdf').toLowerCase();

        if (!format || (format !== 'pdf' && format !== 'png')) {
            alert('Noto\'g\'ri format kiritildi. Iltimos, "pdf" yoki "png" ni kiriting.');
            return;
        }

        if (format === 'pdf') {
            // Create temporary preview element
            const tempContainer = document.createElement('div');
            tempContainer.className = 'fixed top-0 left-0 w-full h-full bg-white z-50 overflow-hidden';
            tempContainer.style.cssText = 'width: 210mm; height: 297mm; margin: 0; padding: 0;';

            // Split questions into pages
            const questionsPerPage = 10;
            const totalPages = Math.ceil(test.questions.length / questionsPerPage);

            for (let page = 0; page < totalPages; page++) {
                const pageDiv = document.createElement('div');
                pageDiv.className = 'page bg-white';
                pageDiv.style.cssText = `
                    width: 210mm;
                    height: 297mm;
                    padding: 10mm;
                    box-sizing: border-box;
                    position: relative;
                    page-break-after: ${page < totalPages - 1 ? 'always' : 'avoid'};
                `;

                // Header
                const headerDiv = document.createElement('div');
                headerDiv.className = 'text-center mb-6';
                const s = test.settings || {};
                headerDiv.innerHTML = `
                    <h1 class="text-xl font-bold text-gray-800 mb-1">${test.name}</h1>
                    <div class="text-xs text-gray-600 flex justify-between">
                        <span>${s.school || ''}</span>
                        <span>${s.subject || ''}</span>
                        <span>${s.className || ''}</span>
                        <span>${s.date || ''}</span>
                    </div>
                    <div class="mt-1 text-sm text-left">O'quvchi: ______________________________</div>
                `;
                pageDiv.appendChild(headerDiv);

                
                const startIdx = page * questionsPerPage;
                const endIdx = Math.min(startIdx + questionsPerPage, test.questions.length);
                const pageQuestions = test.questions.slice(startIdx, endIdx);

                const twoCols = (test.settings && test.settings.twoColumns) !== false;
                const leftColumnQuestions = twoCols ? pageQuestions.slice(0, 5) : pageQuestions;
                const rightColumnQuestions = twoCols ? pageQuestions.slice(5, 10) : [];

                // Create columns container
                const columnsContainer = document.createElement('div');
                columnsContainer.style.cssText = twoCols
                    ? 'display: flex; gap: 5mm; height: calc(100% - 60px);'
                    : 'display: block; height: calc(100% - 60px)';

                // Left Column
                const leftColumn = document.createElement('div');
                leftColumn.style.cssText = twoCols
                    ? 'flex: 1; display: flex; flex-direction: column; gap: 8mm;'
                    : 'display: flex; flex-direction: column; gap: 8mm;';

                leftColumnQuestions.forEach((q, i) => {
                    const globalIndex = startIdx + i;
                    const questionDiv = document.createElement('div');
                    questionDiv.style.cssText = 'flex: 1; padding: 3mm; box-sizing: border-box;';
                    questionDiv.innerHTML = `
                        <div class="question-content font-medium text-gray-800 mb-2">
                            ${globalIndex + 1}. ${q.text}
                        </div>
                        <div class="answer-options">
                            ${q.answers.filter(a => a.trim()).map((a, j) => `
                                <div class="answer-option flex items-center mb-1" style="margin-left: 5mm; margin-bottom: 1mm; font-size: 10pt;">
                                    <div class="w-3 h-3 border border-gray-400 rounded mr-1"></div>
                                    <span>${String.fromCharCode(97 + j)}) ${a}</span>
                                </div>
                            `).join('')}
                        </div>
                    `;
                    leftColumn.appendChild(questionDiv);
                });

                // Fill empty spaces if less than 5 questions
                if (twoCols) {
                    for (let i = leftColumnQuestions.length; i < 5; i++) {
                        const emptyDiv = document.createElement('div');
                        emptyDiv.style.cssText = 'flex: 1; padding: 3mm; box-sizing: border-box;';
                        leftColumn.appendChild(emptyDiv);
                    }
                }

                // Right Column
                const rightColumn = document.createElement('div');
                rightColumn.style.cssText = 'flex: 1; display: flex; flex-direction: column; gap: 8mm;';

                rightColumnQuestions.forEach((q, i) => {
                    const globalIndex = startIdx + 5 + i;
                    const questionDiv = document.createElement('div');
                    questionDiv.style.cssText = 'flex: 1; padding: 3mm; box-sizing: border-box; ';
                    questionDiv.innerHTML = `
                        <div class="question-content font-medium text-gray-800 mb-2">
                            ${globalIndex + 1}. ${q.text}
                        </div>
                        <div class="answer-options">
                            ${q.answers.filter(a => a.trim()).map((a, j) => `
                                <div class="answer-option flex items-center mb-1" style="margin-left: 5mm; margin-bottom: 1mm; font-size: 10pt;">
                                    <div class="w-3 h-3 border border-gray-400 rounded mr-1"></div>
                                    <span>${String.fromCharCode(97 + j)}) ${a}</span>
                                </div>
                            `).join('')}
                        </div>
                    `;
                    rightColumn.appendChild(questionDiv);
                });

                // Fill empty spaces if less than 5 questions
                if (twoCols) {
                    for (let i = rightColumnQuestions.length; i < 5; i++) {
                        const emptyDiv = document.createElement('div');
                        emptyDiv.style.cssText = 'flex: 1; padding: 3mm; box-sizing: border-box;';
                        rightColumn.appendChild(emptyDiv);
                    }
                }

                columnsContainer.appendChild(leftColumn);
                if (twoCols) columnsContainer.appendChild(rightColumn);
                pageDiv.appendChild(columnsContainer);

                tempContainer.appendChild(pageDiv);
            }

            // Add to document temporarily
            document.body.appendChild(tempContainer);

            // Generate PDF
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const pages = tempContainer.querySelectorAll('.page');

            for (let i = 0; i < pages.length; i++) {
                if (i > 0) doc.addPage();

                const canvas = await html2canvas(pages[i], {
                    scale: 2,
                    useCORS: true,
                    logging: false
                });

                const imgData = canvas.toDataURL('image/png');
                doc.addImage(imgData, 'PNG', 0, 0, 210, 297);
            }

            // Remove temporary element
            document.body.removeChild(tempContainer);

            // Save PDF
            doc.save(`${test.name}-${Date.now()}.pdf`);

        } else if (format === 'png') {
            // Create temporary preview element for PNG
            const tempContainer = document.createElement('div');
            tempContainer.className = 'fixed top-0 left-0 w-full h-full bg-white z-50 overflow-hidden';
            tempContainer.style.cssText = 'width: 210mm; height: 297mm; margin: 0; padding: 0;';

            // Header
            const s = test.settings || {};
            tempContainer.innerHTML = `
                <div class="page bg-white" style="width: 210mm; height: 297mm; padding: 10mm; box-sizing: border-box;">
                    <div class="text-center mb-6">
                        <h1 class="text-xl font-bold text-gray-800 mb-1">${test.name}</h1>
                        <div class="text-xs text-gray-600 flex justify-between">
                            <span>${s.school || ''}</span>
                            <span>${s.subject || ''}</span>
                            <span>${s.className || ''}</span>
                            <span>${s.date || ''}</span>
                        </div>
                        <div class="mt-1 text-sm text-left">O'quvchi: ______________________________</div>
                    </div>
            `;

            // First 10 questions (2 columns x 5 questions each)
            const twoCols = (test.settings && test.settings.twoColumns) !== false;
            const displayQuestions = test.questions.slice(0, twoCols ? 10 : 10);
            const leftColumnQuestions = twoCols ? displayQuestions.slice(0, 5) : displayQuestions;
            const rightColumnQuestions = twoCols ? displayQuestions.slice(5, 10) : [];

            // Create columns container
            tempContainer.innerHTML += twoCols
                ? '<div style="display: flex; gap: 5mm; height: calc(100% - 60px);">'
                : '<div style="display: block; height: calc(100% - 60px);">';

            // Left Column
            tempContainer.innerHTML += twoCols
                ? '<div style="flex: 1; display: flex; flex-direction: column; gap: 8mm;">'
                : '<div style="display: flex; flex-direction: column; gap: 8mm;">';
            leftColumnQuestions.forEach((q, i) => {
                tempContainer.innerHTML += `
                    <div style="flex: 1; padding: 3mm; box-sizing: border-box; border: 1px solid #e5e7eb; border-radius: 2mm;">
                        <div class="question-content font-medium text-gray-800 mb-2">
                            ${i + 1}. ${q.text}
                        </div>
                        <div class="answer-options">
                            ${q.answers.filter(a => a.trim()).map((a, j) => `
                                <div class="answer-option flex items-center mb-1" style="margin-left: 5mm; margin-bottom: 1mm; font-size: 10pt;">
                                    <div class="w-3 h-3 border border-gray-400 rounded mr-1"></div>
                                    <span>${String.fromCharCode(97 + j)}) ${a}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            });
            // Fill empty spaces
            if (twoCols) {
                for (let i = leftColumnQuestions.length; i < 5; i++) {
                    tempContainer.innerHTML += '<div style="flex: 1; padding: 3mm; box-sizing: border-box;"></div>';
                }
            }
            tempContainer.innerHTML += '</div>';

            // Right Column
            if (twoCols) tempContainer.innerHTML += '<div style="flex: 1; display: flex; flex-direction: column; gap: 8mm;">';
            rightColumnQuestions.forEach((q, i) => {
                tempContainer.innerHTML += `
                    <div style="flex: 1; padding: 3mm; box-sizing: border-box; border: 1px solid #e5e7eb; border-radius: 2mm;">
                        <div class="question-content font-medium text-gray-800 mb-2">
                            ${i + 6}. ${q.text}
                        </div>
                        <div class="answer-options">
                            ${q.answers.filter(a => a.trim()).map((a, j) => `
                                <div class="answer-option flex items-center mb-1" style="margin-left: 5mm; margin-bottom: 1mm; font-size: 10pt;">
                                    <div class="w-3 h-3 border border-gray-400 rounded mr-1"></div>
                                    <span>${String.fromCharCode(97 + j)}) ${a}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            });
            if (twoCols) {
                for (let i = rightColumnQuestions.length; i < 5; i++) {
                    tempContainer.innerHTML += '<div style="flex: 1; padding: 3mm; box-sizing: border-box;"></div>';
                }
                tempContainer.innerHTML += '</div>';
            }

            tempContainer.innerHTML += '</div>'; // Close columns container
            tempContainer.innerHTML += '</div>'; // Close page
            document.body.appendChild(tempContainer);

            // Generate PNG
            const canvas = await html2canvas(tempContainer, {
                scale: 2,
                useCORS: true,
                logging: false
            });

            // Remove temporary element
            document.body.removeChild(tempContainer);

            // Save PNG
            const link = document.createElement('a');
            link.download = `${test.name}-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };

    return (
        <section className="bg-green-50 min-h-screen py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="flex items-center justify-center text-3xl font-bold text-gray-800 mb-6 text-center"><FaFileAlt />
                    {t('myTestsTitle')}</h1>

                <div className="mb-6 relative max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder={t('search')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border-2 border-green-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none text-lg"
                    />
                </div>

                {filteredTests.length > 0 ? (
                    <div>
                        <div className="grid m-auto gap-4 md:grid-cols-2">
                            {pagedTests.map((test) => (
                                <div
                                    key={test.id}
                                    className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition"
                                >
                                    <div className="mb-4">
                                        <h2 className="text-lg font-semibold text-gray-800 mb-2">{test.name}</h2>
                                        <p className="text-gray-600 text-sm">
                                            {t('questionCount')} {test.questionsCount || test.questions.length}
                                        </p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            {t('addedDate')} {new Date(test.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 mt-auto">
                                        <button
                                            onClick={() => setSelectedTest(test)}
                                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2"
                                        >
                                        <Eye className="w-4 h-4" /> {t('view')}
                                        </button>
                                        <button
                                            onClick={() => handleDownloadTest(test)}
                                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded flex items-center justify-center gap-2"
                                        >
                                        <Download className="w-4 h-4" /> {t('download')}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTest(test.id)}
                                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded flex items-center justify-center gap-2"
                                        >
                                        <Trash2 className="w-4 h-4" /> {t('delete')}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {pageCount > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-6">
                                <button disabled={page===0} onClick={()=>setPage(p=>Math.max(0,p-1))} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">Oldingi</button>
                                <span className="text-sm">{page+1} / {pageCount}</span>
                                <button disabled={page>=pageCount-1} onClick={()=>setPage(p=>Math.min(pageCount-1,p+1))} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">Keyingi</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-10">{t('noTestsFound')}</p>
                )}

                {selectedTest && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 overflow-y-auto max-h-[90vh]">
                            <h2 className="text-xl font-bold mb-4">{selectedTest.name}</h2>
                            <p className="text-gray-600 mb-4">
                                Qo'shilgan sana: {new Date(selectedTest.createdAt).toLocaleDateString()}
                            </p>
                            <div className="space-y-4">
                                {selectedTest.questions.map((q, i) => (
                                    <div key={i} className="border rounded p-3 bg-gray-50">
                                        <p className="font-semibold">{i + 1}. {q.text}</p>
                                        <ul className="pl-5 list-disc text-gray-700 mt-1">
                                            {q.answers.filter(a => a.trim()).map((a, j) => (
                                                <li key={j}>{String.fromCharCode(97 + j)}) {a}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2 mt-6">
                                <button
                                    onClick={() => handleDownloadTest(selectedTest)}
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded flex items-center justify-center gap-2"
                                >
                                    <Download className="w-4 h-4" /> {t('download')}
                                </button>
                                <button
                                    onClick={() => setSelectedTest(null)}
                                    className="flex-1 bg-gray-300 hover:bg-gray-400 py-2 rounded transition"
                                >
                                    {t('close')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default MyTestsPage;
