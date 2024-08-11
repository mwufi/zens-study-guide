import topicsData from "@/app/topicsData.json";

interface Topic {
    name: string;
    slug: string;
    questions: {
        id: string;
        question: string;
        response: string;
    }[];
}

export const fetchTopics = (): Topic[] => {
    return Object.keys(topicsData).map((topic) => ({
        name: topic,
        slug: topic.toLowerCase().replace(/ /g, "-"),
        questions: topicsData[topic].questions,
    }));
};

export const fetchTopicBySlug = (slug: string): Topic | undefined => {
    return fetchTopics().find((topic) => topic.slug === slug);
};