import { getCollection, type CollectionEntry } from 'astro:content';
import type { CategorySlug } from '../site.config';

export type Work =
  | CollectionEntry<'music'>
  | CollectionEntry<'arts'>
  | CollectionEntry<'project'>;

const byDateDesc = (a: Work, b: Work) => b.data.date.getTime() - a.data.date.getTime();

export async function getWorks(slug: CategorySlug): Promise<Work[]> {
  const items = (await getCollection(slug, ({ data }) => !data.draft)) as Work[];
  return items.sort(byDateDesc);
}

export async function getAllWorks(): Promise<Work[]> {
  const all = await Promise.all([getWorks('music'), getWorks('arts'), getWorks('project')]);
  return all.flat().sort(byDateDesc);
}
