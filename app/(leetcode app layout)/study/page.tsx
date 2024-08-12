
import { db } from '@/db';
import { sql, and, eq } from 'drizzle-orm';
import Link from 'next/link';
import { leetcodeNotes, leetcodeQuestions } from '@/db/schema';
import SortDifficulty from './SortDifficulty';

async function getTopicTags(): Promise<{ topic: string, question_count: number }[]> {
    const results = await db.execute<{ topic: string, question_count: number }>(
        sql`SELECT topic, question_count FROM topicTags`
    );
    return results;
}

async function getLeetcodeQuestions(difficulty: string) {
    // get top 100 questions from db using drizzle, sorted by rating
    const questions = await db.select().from(leetcodeQuestions).leftJoin(leetcodeNotes, eq(leetcodeQuestions.id, leetcodeNotes.questionId)).limit(100);
    return questions.map(question => ({ ...question.leetcode_questions, is_favorite: question.user_question_data?.isFavorite }));
}

async function getLeetcodeQuestionsByTopic(topic: string, difficulty: string, limit: number = 100) {
    /*
    SELECT *
    FROM leetcode_questions
    WHERE related_topics::jsonb @> where'"Math"'::jsonb 
    LIMIT 3;
    */
    console.log("gettopic", topic);
    const whereDifficulty = difficulty ? eq(leetcodeQuestions.difficulty, difficulty) : undefined;

    const examples = await db
        .select()
        .from(leetcodeQuestions)
        .leftJoin(leetcodeNotes, eq(leetcodeQuestions.id, leetcodeNotes.questionId))
        .where(and(
            sql`${leetcodeQuestions.relatedTopics}::jsonb @> ${JSON.stringify([topic])}::jsonb`,
            whereDifficulty
        ))
        .limit(limit);
    return examples.map(question => ({ ...question.leetcode_questions, is_favorite: question.user_question_data?.isFavorite }));
}

const Question = ({ question }) => {
    return (
        <tr key={question.id} className="py-4 border-b border-gray-200 hover:bg-blue-100">
            <td className="py-4 px-6">
                <Link href={`/study/${question.id}`} className="block">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            {question.is_favorite ? (
                                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            }
                            <span className="font-medium">{question.title}</span>
                            <div className="flex space-x-1">
                                {question.relatedTopics?.slice(0, 3).map((topic, index) => (
                                    <Link
                                        key={index}
                                        href={`/study?topic=${encodeURIComponent(topic)}`}
                                        className="text-xs bg-gray-200 rounded-full px-2 py-1 hover:bg-gray-300 transition-colors"
                                    >
                                        {topic}
                                    </Link>
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
                                {question.rating ? (question.rating).toFixed(1) : 'N/A'}%
                            </span>
                        </div>
                    </div>
                </Link>
            </td>
        </tr>
    )
}

export default async function InterviewTopicsViewer({ searchParams }) {
    const { topic, difficulty } = searchParams;
    let questions;
    if (topic) {
        questions = await getLeetcodeQuestionsByTopic(topic, difficulty);
    } else {
        questions = await getLeetcodeQuestions(difficulty);
    }

    const topicTags = await getTopicTags();

    return (
        <div className="flex flex-col h-screen">
            <div className="flex gap-4">
                <h1>{topic}</h1>
                <SortDifficulty />
            </div>
            <div className="flex flex-wrap gap-2 mt-4 mb-6">
                {topicTags.map((tag) => (
                    <Link
                        href={`/study?topic=${encodeURIComponent(tag.topic)}`}
                        className="text-sm bg-blue-100 text-blue-800 rounded-full px-3 py-1 hover:bg-blue-200 transition-colors"
                    >
                        {tag.topic} ({tag.question_count})
                    </Link>
                ))}
            </div>
            {/* Main content */}
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="w-full">
                    <table className="w-full border-collapse">
                        <tbody>
                            {questions.map((question) => (
                                <Question key={question.id} question={question} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}