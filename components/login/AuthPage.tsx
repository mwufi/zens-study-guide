import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"

export default function AuthPage() {
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                body: JSON.stringify({ action: 'login', username: loginData.username, password: loginData.password }),
            });
            if (response.status === 404) {
                throw new Error('User not found');
            }
        } catch (error) {
            if (error instanceof Error && error.message === 'User not found') {
                toast.error('User not found', {
                    description: "Please check your username.",
                });
                return;
            }
            // Handle other errors
            toast.error('Some error occurred', {
                description: "Please check your username.",
            });
            return;
        }
    }

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/auth', {
            method: 'POST',
            body: JSON.stringify({ action: 'signup', username: signupData.username, email: signupData.email, password: signupData.password }),
        });
        if (response.status === 400) {
            toast.error('Username/email already exists', {
                description: "Please choose a different username/email.",
            });
            return;
        }
        else if (response.status === 200) {
            toast.success('Signup successful', {
                description: "Welcome to the playground!",
            });
        } else {
            toast.error('Some error occurred', {
                description: "Please try again later.",
            });
        }
    };

    return (
        <div className="flex items-center justify-center h-full min-h-[80vh] bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Welcome</CardTitle>
                    <CardDescription>Login or create a new account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="login">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Sign up</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <form onSubmit={handleLogin}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="login-username">Username</Label>
                                        <Input
                                            id="login-username"
                                            placeholder="Enter your username"
                                            value={loginData.username}
                                            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="login-password">Password</Label>
                                        <Input
                                            id="login-password"
                                            type="password"
                                            placeholder="Enter your password"
                                            value={loginData.password}
                                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <Button className="w-full mt-4" type="submit">Login</Button>
                            </form>
                        </TabsContent>
                        <TabsContent value="signup">
                            <form onSubmit={handleSignup}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-username">Username</Label>
                                        <Input
                                            id="signup-username"
                                            placeholder="Choose a username"
                                            value={signupData.username}
                                            onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-email">Email</Label>
                                        <Input
                                            id="signup-email"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={signupData.email}
                                            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-password">Password</Label>
                                        <Input
                                            id="signup-password"
                                            type="password"
                                            placeholder="Choose a password"
                                            value={signupData.password}
                                            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <Button className="w-full mt-4" type="submit">Sign up</Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}