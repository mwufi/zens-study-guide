import { db } from "@/db";
import { leetcodeNotes } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { exit } from "process";

export async function createNote(
    userId: number,
    questionId: number,
    noteContent: string,
    tags: string[] = [],
    isFavorite: boolean = false
) {
    try {
        const newNote = await db.insert(leetcodeNotes).values({
            userId,
            questionId,
            notes: noteContent,
            tags,
            isFavorite,
            notesCreatedAt: new Date(),
        }).returning();

        return newNote[0];
    } catch (error) {
        console.error("Error creating note:", error.message);
        console.error("Skipping note creation");
    }
}


export async function getNotes(userId: number, questionId: number) {
    const notes = await db.select().from(leetcodeNotes).where(
        and(
            eq(leetcodeNotes.userId, userId),
            eq(leetcodeNotes.questionId, questionId)));
    return notes[0] || null;
}


export async function updateNote(userId: number, questionId: number, update: { notes?: string, tags?: string[], isFavorite?: boolean }) {
    const existingNote = await getNotes(userId, questionId);

    const { notes, tags, isFavorite } = update;

    if (existingNote) {
        await db.update(leetcodeNotes)
            .set({ ...existingNote, notes: notes || existingNote.notes, tags: tags || existingNote.tags, isFavorite: isFavorite === undefined ? existingNote.isFavorite : isFavorite })
            .where(
                and(
                    eq(leetcodeNotes.userId, userId),
                    eq(leetcodeNotes.questionId, questionId)
                )
            );
    } else {
        await db.insert(leetcodeNotes).values({
            userId,
            questionId,
            notes, tags, isFavorite,
            notesCreatedAt: new Date(),
        });
    }
}


(async () => {
    await createNote(1, 1, "test", ["test"], false);
    const notes = await getNotes(1, 1);
    console.log(notes);

    console.log("setting favorite to true")
    await updateNote(1, 1, { isFavorite: true });
    console.log(await getNotes(1, 1));

    console.log("setting tags to ['test2']")
    await updateNote(1, 1, { tags: ["test2"] });
    console.log(await getNotes(1, 1));

    console.log('end!')
    exit(0)
})()