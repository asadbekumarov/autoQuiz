// src/pages/TemplatesPage.js
import { MdAssignment } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const TemplatesPage = () => {
  const navigate = useNavigate();

  const handleUseTemplate = (template) => {
    localStorage.setItem('templateToUse', JSON.stringify(template));
    navigate('/create');
  };

  const templates = [
    {
      id: 1,
      type: 'Multiple Choice',
      title: 'Multiple Choice',
      description: 'Bitta to‘g‘ri javobli savollar.',
      options: ['Variant 1', 'Variant 2', 'Variant 3', 'Variant 4'],
    }
  ];

  return (
    <div className="bg-green-50 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="flex items-center justify-center text-3xl font-bold text-gray-800 mb-2 text-center">
          <MdAssignment className="mr-2" />
          Test Shablonlari
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Tayyor shablonlardan foydalanib tezda test yarating!
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col cursor-pointer hover:shadow-lg transition"
              onClick={() => handleUseTemplate(template)}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{template.title}</h2>
              <p className="text-gray-600 mb-4 text-sm">{template.description}</p>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {template.options.map((option, idx) => (
                  <li key={idx} className="mb-1">
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
