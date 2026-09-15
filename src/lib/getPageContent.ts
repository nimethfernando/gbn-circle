// src/lib/getPageContent.ts
// Server-side helper to fetch editable page content with built-in PRD fallbacks

import { prisma } from '@/lib/prisma';
import {
  DEFAULT_PAGE_CONTENTS,
  PageContentMap,
} from './defaultPageContent';

// Deep merge helper to ensure partial edits retain all default fields
function deepMerge<T extends Record<string, unknown>>(target: T, source: Record<string, unknown>): T {
  const output = { ...target } as Record<string, unknown>;
  if (!source || typeof source !== 'object') return output as T;

  for (const key of Object.keys(source)) {
    const srcVal = source[key];
    const tgtVal = output[key];

    if (srcVal === undefined || srcVal === null) {
      continue;
    }

    if (Array.isArray(srcVal)) {
      output[key] = srcVal;
    } else if (
      typeof srcVal === 'object' &&
      typeof tgtVal === 'object' &&
      tgtVal !== null &&
      !Array.isArray(tgtVal)
    ) {
      output[key] = deepMerge(
        tgtVal as Record<string, unknown>,
        srcVal as Record<string, unknown>
      );
    } else {
      output[key] = srcVal;
    }
  }

  return output as T;
}

export async function getPageContent<K extends keyof PageContentMap>(
  slug: K
): Promise<PageContentMap[K]> {
  const fallback = DEFAULT_PAGE_CONTENTS[slug];

  try {
    const record = await prisma.pageContent.findUnique({
      where: { slug },
    });

    if (!record || !record.data) {
      return fallback;
    }

    const parsedData = JSON.parse(record.data) as Record<string, unknown>;
    return deepMerge(fallback as unknown as Record<string, unknown>, parsedData) as unknown as PageContentMap[K];
  } catch (error) {
    console.error(`Error fetching page content for slug "${slug}":`, error);
    return fallback;
  }
}
