import { fetchTopics } from "@/db/topics";
import Link from "next/link";
import AddTopicButton from "./AddTopicButton";

export default function TopicsSidebar() {
    const topics = fetchTopics();

    return (
        <div className="w-64 bg-gray-100 p-4 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Topics</h2>
            {topics.map((topic) => (
                <Link
                    key={topic.slug}
                    href={`/topics/${topic.slug}`}
                    className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded transition-colors duration-200"
                >
                    {topic.name}
                </Link>
            ))}
            <AddTopicButton />
        </div>
    )

}