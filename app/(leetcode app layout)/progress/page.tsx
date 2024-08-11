'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const dummyData = [
  { date: '2023-01-01', problemsSolved: 5 },
  { date: '2023-02-01', problemsSolved: 15 },
  { date: '2023-03-01', problemsSolved: 30 },
  { date: '2023-04-01', problemsSolved: 50 },
  { date: '2023-05-01', problemsSolved: 75 },
  { date: '2023-06-01', problemsSolved: 100 },
]

export default function ProgressPage() {
    const [timeRange, setTimeRange] = useState('6M')

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Progress</h1>
            
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Problems Solved Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dummyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="problemsSolved" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Problems Solved</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">100</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Streak</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">7 days</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Difficulty Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Easy: 40</p>
                        <p>Medium: 50</p>
                        <p>Hard: 10</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}