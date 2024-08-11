## Learning

we want to create a system for learning new things.

Generate a tree of topics and questions.

Store new kinds of things.
For example, leetcode questions.

- For every object, we want to have a schema.

Everything will be interconnected.

You can store new types of stuff. How do we make this super easy? Well, via examples.

To create something like this:

```
{
    "name": "Leetcode Question",
    "description": "Questions I gathered from leetcode",
    "properties": [
        {
            "name": "question",
            "type": "string",
            "description": "The question"
        },
        {
            "name": "notes",
            "type": "string",
            "description": "notes for the question"
        }
    ]
}
```

We can generate it from a form that has it.
{

    "example": {
        "question": "What is the capital of France?",
        "answer": "Paris",
        "notes": {
            "difficulty": "easy",
            "tags": ["easy", "math", "leetcode"]
        }
    }

}

## Modeling leetcode questions
First, we're going to need to create a schema for leetcode questions.

LeetCodeQuestion
url, name, description, link, notes, difficulty, tags

each LeetCodeQuestion has many LeetCodeQuestionSolutions

leetcode_solution
language, code, notes

We can have attempts at solutions.

LeetCodeQuestionSolutionAttempt - tracks the learner's progress on a solution
language, code, success, timeStarted, timeCompleted, testCasesPassed, testCasesFailed

We can also run the code and see the results.

LeetCodeRun - tracks the results of a run
question_id, language, code, success, testCasesPassed, testCasesFailed

Using this schema, we can model a user's progress on leetcode.
They browse `LeetCodeQuestion`s and click on one. Then, they can write code, starting a `LeetCodeQuestion_solution_attempt`, and run it, creating a `LeetCodeRun`.

The user can also 


# Prompt

I'm using drizzle-orm to model an app.

Write a `schema.ts` file for an app like Leetcode that can recommend users questions, track their progress and whether they've mastered it, and run their code.

<schema description>
Leetcode problems look like this:

This is data from 1,825 Leetcode problems and was last updated in April 2021. It contains the following info:

id: problem id
title: problem name
description: problem description
is_premium: whether the questions requires a premium account
difficulty: easy, medium, or hard
solution_link: how often the answer submitted is correct
acceptance_rate: how often the answer submitted is correct
frequency: how often the problem is attempted
url: url to the problem
discuss_count: how many comments are submitted by users
accepted: how many times the answer was accepted
submissions: how many times the answer was submitted
companies: which companies were tagged as having asked this specific problem
related_topics: related topics to the current problem
likes: how many likes the problem got
dislikes: how many dislikes the problem got
rating: likes / (likes + dislikes)
asked_by_faang: whether or not the question was asked by facebook, apple, amazon, google, or netflix
similar_questions: similar problems with problem name, slug, and difficulty

On top of that, I wnat to add user-specific data to each problem. For example, each user can add notes to a problem, and track their progress on it.

favorites: can favorite a problem so that they can find it again
user tags: can add tags to problem so that they can find it again
notes: date added, freeform content, tags, etc


each LeetCodeQuestion has many LeetCodeQuestionSolutions

LeetCodeQuestionSolution
- language, code, explanation


We can have attempts at solutions.

LeetCodeQuestionSolutionAttempt - tracks the learner's progress on a solution
language, code, success, timeStarted, timeCompleted, testCasesPassed, testCasesFailed

We can also run the code and see the results.

LeetCodeRun - tracks the results of a run
question_id, language, code, success, testCasesPassed, testCasesFailed

Using this schema, we can model a user's progress on leetcode.
They browse `LeetCodeQuestion`s and click on one. Then, they can write code, starting a `LeetCodeQuestionSolutionAttempt`, and run it, creating a `LeetCodeRun`.
<end schema description>

Let's write a schema.ts file that models this, in Drizzle ORM.

