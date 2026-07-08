import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'posts');
    
    if (!fs.existsSync(postsDirectory)) {
      return NextResponse.json({ posts: [] });
    }
    
    const fileNames = fs.readdirSync(postsDirectory);

    const posts = await Promise.all(fileNames
      .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx?$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        const matterResult = matter(fileContents);
        const mdxSource = await serialize(matterResult.content);

        return {
          slug,
          title: matterResult.data.title || slug,
          date: matterResult.data.date || 'Unknown Date',
          mdxSource,
        };
      })
    );

    posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to load posts' }, { status: 500 });
  }
}
