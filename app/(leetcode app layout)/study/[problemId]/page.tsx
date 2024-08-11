
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from '@/db'
import { leetcodeQuestions } from '@/db/schema'
import { eq } from 'drizzle-orm'
import Editor from '@/components/editor/Editor'

async function getLeetcodeQuestion(problemId: string) {
    const question = await db.select().from(leetcodeQuestions).where(eq(leetcodeQuestions.id, parseInt(problemId)))
    console.log(question)
    return question[0] || null
}

export default async function ProblemPage({ params }: { params: { problemId: string } }) {
    const question = await getLeetcodeQuestion(params.problemId)

    if (!question) {
        return <div>Loading...</div>
    }

    return (
        <div>

            <div className="flex h-full">
                <Card className="flex-1 mr-4 overflow-y-auto">
                    <CardHeader>
                        <CardTitle>{question.title}</CardTitle>
                        <div className={`text-sm font-medium ${question.difficulty === 'easy' ? 'text-green-600' :
                            question.difficulty === 'medium' ? 'text-yellow-600' :
                                'text-red-600'
                            }`}>
                            {question.difficulty}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="whitespace-pre-wrap">
                            {question.description}
                        </p>
                    </CardContent>
                </Card>
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Your Solution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Editor />
                    </CardContent>
                </Card>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="border-b border-indigo-100">
                        <CardTitle className="text-indigo-700">Related Problems</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-600 italic">
                            Premium feature: Discover problems that will enhance your understanding of this topic.
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Button variant="outline" className="text-indigo-600 border-indigo-300 hover:bg-indigo-50">
                                Upgrade to Premium
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-50 to-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="border-b border-emerald-100">
                        <CardTitle className="text-emerald-700">Solution Attempts</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-600 italic">
                            Premium feature: Track your progress and review past attempts to refine your approach.
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Button variant="outline" className="text-emerald-600 border-emerald-300 hover:bg-emerald-50">
                                Unlock Premium
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="border-b border-amber-100">
                        <CardTitle className="text-amber-700">Progress Over Time</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-600 italic">
                            Premium feature: Visualize your learning journey with detailed progress charts.
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Button variant="outline" className="text-amber-600 border-amber-300 hover:bg-amber-50">
                                Get Premium Access
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-rose-50 to-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="border-b border-rose-100">
                        <CardTitle className="text-rose-700">Related Topics</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-600 italic">
                            Premium feature: Explore interconnected topics to deepen your understanding.
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Button variant="outline" className="text-rose-600 border-rose-300 hover:bg-rose-50">
                                Upgrade Now
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
