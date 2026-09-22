import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 세 카테고리가 같은 형식을 씁니다. 새 활동은 해당 폴더에 .md 파일 하나만 추가하면 됩니다.
const workSchema = z.object({
  title: z.string(),            // 제목
  date: z.coerce.date(),        // 날짜 (YYYY-MM-DD) — 최신순 정렬에 사용
  summary: z.string(),          // 목록에 보이는 한 줄 설명
  role: z.string().optional(),  // 역할 (예: Vocal, Composer, Director)
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(), // public/images/ 안의 이미지 경로 (예: /images/xxx.jpg)
  link: z.string().url().optional(),   // 외부 링크 (LinkedIn, YouTube 등)
  video: z.string().url().optional(),  // YouTube 임베드 URL
  featured: z.boolean().default(false), // true면 홈 상단에 노출
  draft: z.boolean().default(false),    // true면 사이트에 표시되지 않음
});

const makeCollection = (name: string) =>
  defineCollection({
    loader: glob({ pattern: '**/*.md', base: `./src/content/${name}` }),
    schema: workSchema,
  });

export const collections = {
  music: makeCollection('music'),
  arts: makeCollection('arts'),
  project: makeCollection('project'),
};
