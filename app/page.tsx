
import TopicsSidebar from '@/components/blocks/TopicsSidebar';

import { db } from '@/db';

async function getLeetcodeQuestions() {
  // get top 100 questions from db using drizzle, sorted by rating
  const questions = await db.query.leetcodeQuestions.findMany({
    limit: 100,
  });
  return questions;
}

export default async function InterviewTopicsViewer() {
  const questions = await getLeetcodeQuestions();

  return (
    <div className="flex h-screen">
      <TopicsSidebar />

      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="w-full">
          <table className="w-full border-collapse">
            <tbody>
              {questions.map((question) => (
                <tr key={question.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {question.isPremium && (
                          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        <span className="font-medium">{question.title}</span>
                        <div className="flex space-x-1">
                          {question.relatedTopics?.slice(0, 3).map((topic, index) => (
                            <span key={index} className="text-xs bg-gray-200 rounded-full px-2 py-1">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`text-sm font-medium ${question.difficulty === 'easy' ? 'text-green-600' :
                          question.difficulty === 'medium' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                          {question.difficulty}
                        </span>
                        <span className="text-sm text-gray-600">
                          {question.likes}/{question.dislikes}
                        </span>
                        <span className="text-sm text-gray-600">
                          {question.rating ? (question.rating * 100).toFixed(1) : 'N/A'}%
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}