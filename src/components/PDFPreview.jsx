import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { toast } from 'react-toastify';

const PDFPreview = ({ questions, questionsPerPage }) => {
    const [imgData, setImgData] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const previewRef = useRef();

    // Calculate total pages
    const totalPages = Math.ceil(questions.length / questionsPerPage);
    const maxQuestionsPerPage = 10;

    useEffect(() => {
        if (!questions.length) {
            setImgData(null);
            return;
        }

        setIsLoading(true);
        // Only preview the current page for performance
        html2canvas(previewRef.current, { scale: 1.5, useCORS: true, allowTaint: true }).then(canvas => {
            setImgData(canvas.toDataURL('image/png'));
            setIsLoading(false);
        }).catch(error => {
            console.error('PDF preview error:', error);
            toast.error('PDF ko\'rinishi yaratishda xatolik!');
            setIsLoading(false);
        });
    }, [questions, questionsPerPage, currentPage]);

    // Get questions for current page
    const startIndex = currentPage * maxQuestionsPerPage;
    const endIndex = startIndex + maxQuestionsPerPage;
    const pageQuestions = questions.slice(startIndex, endIndex);

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="mt-6 sm:mt-8 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                <h3 className="font-semibold text-base sm:text-lg">PDF Ko'rinishi:</h3>
                {totalPages > 1 && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 0}
                            className={`px-2 sm:px-3 py-1 rounded text-sm ${currentPage === 0
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            ← Oldingi
                        </button>
                        <span className="text-xs sm:text-sm">
                            Sahifa {currentPage + 1} / {totalPages}
                        </span>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages - 1}
                            className={`px-2 sm:px-3 py-1 rounded text-sm ${currentPage === totalPages - 1
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            Keyingi →
                        </button>
                    </div>
                )}
            </div>

            <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
                <div
                    ref={previewRef}
                    style={{
                        width: '800px',
                        padding: '40px',
                        fontSize: '16px',
                        fontFamily: 'Arial, sans-serif',
                        background: 'white',
                        color: 'black',
                        borderRadius: '8px',
                        boxShadow: '0 0 8px #ccc',
                    }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '30px', fontSize: '24px', fontWeight: 'bold' }}>
                        Test Savollari
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '14px', color: '#666' }}>
                        Sahifa {currentPage + 1} / {totalPages}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                        {pageQuestions.map((q, idx) => (
                            <div key={q.id} style={{
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                breakInside: 'avoid',
                                fontSize: '12px'
                            }}>
                                <div style={{ fontWeight: 'bold', marginBottom: '6px', fontSize: '14px' }}>
                                    {startIndex + idx + 1}. {q.question}
                                </div>
                                <div style={{ marginLeft: '10px' }}>
                                    <div style={{ margin: '2px 0', fontSize: '11px' }}>A) {q.options.A}</div>
                                    <div style={{ margin: '2px 0', fontSize: '11px' }}>B) {q.options.B}</div>
                                    {q.options.C && <div style={{ margin: '2px 0', fontSize: '11px' }}>C) {q.options.C}</div>}
                                    {q.options.D && <div style={{ margin: '2px 0', fontSize: '11px' }}>D) {q.options.D}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-8">
                    <div className="text-gray-400 italic">PDF ko'rinishi yaratilmoqda...</div>
                </div>
            ) : imgData ? (
                <div className="w-full overflow-x-auto">
                    <img
                        src={imgData}
                        alt="PDF Preview"
                        className="w-full max-w-2xl border rounded shadow mt-2 mx-auto"
                        style={{ background: 'white' }}
                    />
                </div>
            ) : (
                <div className="text-gray-400 italic text-center py-8">Savollar kiritilganda PDF ko'rinishi shu yerda chiqadi.</div>
            )}
        </div>
    );
};

export default PDFPreview;