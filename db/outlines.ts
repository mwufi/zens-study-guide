
import fs from 'fs/promises';
import path from 'path';

export async function fetchOutline(name: string): Promise<any> {
    try {
        const filePath = path.join(process.cwd(), 'app', 'data', `${name}.json`);
        const fileContents = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error(`Error fetching outline for ${name}:`, error);
        throw new Error(`Failed to fetch outline for ${name}`);
    }
}
