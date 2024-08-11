'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function LibraryPage() {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault()
        // Implement search functionality here
        console.log('Searching for:', searchQuery)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Library</h1>
            
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Search Problems</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <Input 
                            type="text" 
                            placeholder="Search for problems..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-grow"
                        />
                        <Button type="submit">Search</Button>
                    </form>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Placeholder for problem cards */}
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Card key={item}>
                        <CardHeader>
                            <CardTitle>Problem {item}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Problem description goes here...</p>
                            <Button className="mt-4">View Details</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
