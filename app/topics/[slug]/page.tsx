
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchTopicBySlug } from "@/db/topics";
import Link from "next/link";

export default function TopicPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const topic = fetchTopicBySlug(slug);

    if (!topic) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Topic not found</h1>
                <p>The requested topic does not exist.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Topic: {slug}</h1>
            {topic.questions.map((question) => (
                <Link href={`/topics/${slug}/${question.id}`} key={question.id}>
                    <Card 
                        className="mb-4 hover:bg-gray-100 transition-colors duration-200 border-none shadow-none cursor-pointer"
                    >
                        <CardHeader>
                            <CardTitle>{question.question}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700">{question.response}</p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
