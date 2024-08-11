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

leetcode_question
url, name, description, link, notes, difficulty, tags

each leetcode_question has many leetcode_question_solutions

leetcode_solution
language, code, notes

We can have attempts at solutions.

leetcode_question_solution_attempt - tracks the learner's progress on a solution
language, code, success, timeStarted, timeCompleted, testCasesPassed, testCasesFailed

We can also run the code and see the results.

leetcode_run - tracks the results of a run
question_id, language, code, success, testCasesPassed, testCasesFailed

Using this schema, we can model a user's progress on leetcode.
They browse `leetcode_question`s and click on one. Then, they can write code, starting a `leetcode_question_solution_attempt`, and run it, creating a `leetcode_run`.

The user can also 