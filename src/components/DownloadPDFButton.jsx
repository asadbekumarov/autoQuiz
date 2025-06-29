import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from 'react-toastify';

const DownloadPDFButton = ({ questions, questionsPerPage }) => {
    const [isLoading, setIsLoading] = useState(false);
    const maxQuestionsPerPage = 10;

    const handleDownload = async () => {
        if (!questions || questions.length === 0) {
            toast.error('PDF yaratish uchun kamida bitta savol bo\'lishi kerak!');
            return;
        }

        setIsLoading(true);
        toast.info('📄 PDF yaratilmoqda...', { autoClose: false });

        try {
            const pdf = new jsPDF('p', 'mm', 'a4');

            for (let i = 0; i < questions.length; i += maxQuestionsPerPage) {
                const group = questions.slice(i, i + maxQuestionsPerPage);
                const div = document.createElement('div');
                div.style.width = '800px';
                div.style.padding = '40px';
                div.style.fontSize = '16px';
                div.style.fontFamily = 'Arial, sans-serif';
                div.style.backgroundColor = 'white';
                div.style.color = 'black';
                div.style.position = 'absolute';
                div.style.left = '-9999px';
                div.style.top = '0';

                // Add page header
                const header = document.createElement('div');
                header.innerHTML = `<h1 style="text-align: center; margin-bottom: 30px; font-size: 24px; font-weight: bold;">Test Savollari</h1>`;
                div.appendChild(header);

                // Add page number
                const pageNumber = document.createElement('div');
                const currentPage = Math.floor(i / maxQuestionsPerPage) + 1;
                const totalPages = Math.ceil(questions.length / maxQuestionsPerPage);
                pageNumber.innerHTML = `<div style="text-align: center; margin-bottom: 20px; font-size: 14px; color: #666;">Sahifa ${currentPage} / ${totalPages}</div>`;
                div.appendChild(pageNumber);

                // Create grid container for questions
                const gridContainer = document.createElement('div');
                gridContainer.style.display = 'grid';
                gridContainer.style.gridTemplateColumns = 'repeat(5, 1fr)';
                gridContainer.style.gap = '10px';
                div.appendChild(gridContainer);

                group.forEach((q, idx) => {
                    const qEl = document.createElement('div');
                    qEl.style.padding = '10px';
                    qEl.style.border = '1px solid #ddd';
                    qEl.style.borderRadius = '6px';
                    qEl.style.fontSize = '12px';

                    let optionsHtml = `
                        <div style="margin: 2px 0; font-size: 11px;">A) ${q.options.A}</div>
                        <div style="margin: 2px 0; font-size: 11px;">B) ${q.options.B}</div>
                    `;

                    if (q.options.C && q.options.C.trim()) {
                        optionsHtml += `<div style="margin: 2px 0; font-size: 11px;">C) ${q.options.C}</div>`;
                    }

                    if (q.options.D && q.options.D.trim()) {
                        optionsHtml += `<div style="margin: 2px 0; font-size: 11px;">D) ${q.options.D}</div>`;
                    }

                    qEl.innerHTML = `
                        <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px;">
                            ${i + idx + 1}. ${q.question}
                        </div>
                        <div style="margin-left: 10px;">
                            ${optionsHtml}
                        </div>
                    `;
                    gridContainer.appendChild(qEl);
                });

                document.body.appendChild(div);

                try {
                    const canvas = await html2canvas(div, {
                        scale: 2,
                        useCORS: true,
                        allowTaint: true,
                        backgroundColor: '#ffffff'
                    });

                    const imgData = canvas.toDataURL('image/png');
                    const imgWidth = 190;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;

                    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
                    document.body.removeChild(div);

                    if (i + maxQuestionsPerPage < questions.length) {
                        pdf.addPage();
                    }
                } catch (canvasError) {
                    console.error('Canvas generation error:', canvasError);
                    document.body.removeChild(div);
                    throw new Error('PDF sahifasi yaratishda xatolik');
                }
            }

            const fileName = `test-savollar-${new Date().toISOString().split('T')[0]}.pdf`;
            pdf.save(fileName);

            toast.dismiss();
            toast.success('✅ PDF muvaffaqiyatli saqlandi!');

        } catch (error) {
            console.error('PDF yaratishda xatolik:', error);
            toast.dismiss();
            toast.error('❌ PDF yaratishda xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={isLoading || !questions || questions.length === 0}
            className={`
                px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base
                ${isLoading || !questions || questions.length === 0
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }
            `}
        >
            {isLoading ? '⏳ PDF yaratilmoqda...' : '📄 PDF saqlash'}
        </button>
    );
};

export default DownloadPDFButton;
