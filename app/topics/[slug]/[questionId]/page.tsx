import { fetchTopicBySlug } from "@/db/topics";
import Link from "next/link";
import { Star, Heart, Share2, RefreshCw } from "lucide-react";

export default function QuestionPage({ params }: { params: { slug: string; questionId: string } }) {
    const { slug, questionId } = params;
    const topic = fetchTopicBySlug(slug);

    if (!topic) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Topic not found</h1>
                <p>The requested topic does not exist.</p>
            </div>
        );
    }

    const question = topic.questions.find(q => q.id === questionId);

    if (!question) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Question not found</h1>
                <p>The requested question does not exist in this topic.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <Link href={`/topics/${slug}`} className="text-blue-600 hover:underline mb-4 inline-block">
                &larr; Back to {topic.name}
            </Link>
            <div className="flex flex-col lg:flex-row">
                <div className="flex-1 mb-4 lg:mb-0 lg:mr-4">
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-4">
                            <div className="space-x-2">
                                <button className="text-gray-600 hover:text-yellow-500">
                                    <Star className="h-5 w-5" />
                                    <span className="sr-only">Star</span>
                                </button>
                                <button className="text-gray-600 hover:text-red-500">
                                    <Heart className="h-5 w-5" />
                                    <span className="sr-only">Favorite</span>
                                </button>
                                <button className="text-gray-600 hover:text-blue-500">
                                    <Share2 className="h-5 w-5" />
                                    <span className="sr-only">Share</span>
                                </button>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">{question.question}</h2>
                        <div className="mb-6">
                            <p className="text-gray-700">{question.response}</p>
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Expand on this
                        </button>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-xl font-bold mb-4">Your Notes</h3>
                        <textarea
                            className="w-full p-2 border rounded"
                            rows={4}
                            placeholder="Add your notes here..."
                        ></textarea>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-xl font-bold mb-4">Chat with AI</h3>
                        <div className="border rounded p-4">
                            <div className="mb-4 h-40 overflow-y-auto bg-gray-100 p-2 rounded">
                                {/* Chat messages would go here */}
                            </div>
                            <div className="flex">
                                <input
                                    type="text"
                                    className="flex-grow p-2 border rounded-l"
                                    placeholder="Type your message..."
                                />
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-r">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block lg:w-1/3">
                    <h3 className="text-xl font-bold mb-4">Comments</h3>
                    <div className="space-y-4">
                        {[
                            { username: "Alice", comment: "Great explanation!", date: "2023-06-01" },
                            { username: "Bob", comment: "This helped me understand the concept better.", date: "2023-06-02" },
                            { username: "Charlie", comment: "Could you provide more examples?", date: "2023-06-03" }
                        ].map((comment, index) => (
                            <div key={index} className="bg-gray-100 p-4 rounded">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold">{comment.username}</span>
                                    <span className="text-sm text-gray-500">{comment.date}</span>
                                </div>
                                <p>{comment.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
