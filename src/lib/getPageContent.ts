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

export interface SiteVisibilitySettings {
  // Members & Community
  showMemberSection: boolean;
  showMemberNav: boolean;

  // Social Media Links & Visibility
  showInstagram: boolean;
  instagramUrl: string;
  showLinkedIn: boolean;
  linkedInUrl: string;

  // Homepage Section Visibility
  showEventsSection: boolean;
  showLeadershipSection: boolean;
  showInspirationSection: boolean;
  showJourneySection: boolean;
  showGlobalNetworkSection: boolean;
  showExperienceSection: boolean;

  // Navigation Menu Visibility
  showEventsNav: boolean;
  showBlogsNav: boolean;
  showCommunityNav: boolean;
  showLeadershipNav: boolean;
}

export async function getSiteVisibility(): Promise<SiteVisibilitySettings> {
  const fallback = DEFAULT_PAGE_CONTENTS.home.visibility!;
  try {
    const homeContent = await getPageContent('home');
    const vis = homeContent?.visibility;
    return {
      showMemberSection: vis?.showMemberSection ?? fallback.showMemberSection ?? false,
      showMemberNav: vis?.showMemberNav ?? fallback.showMemberNav ?? false,

      showInstagram: vis?.showInstagram ?? fallback.showInstagram ?? true,
      instagramUrl: vis?.instagramUrl || fallback.instagramUrl || "https://www.instagram.com/gbncircle?stkn=dTNpdGd1d3c2YjJ4&utm_source=qr",
      showLinkedIn: vis?.showLinkedIn ?? fallback.showLinkedIn ?? false,
      linkedInUrl: vis?.linkedInUrl || fallback.linkedInUrl || "https://www.linkedin.com/company/gbn-circle/",

      showEventsSection: vis?.showEventsSection ?? fallback.showEventsSection ?? true,
      showLeadershipSection: vis?.showLeadershipSection ?? fallback.showLeadershipSection ?? true,
      showInspirationSection: vis?.showInspirationSection ?? fallback.showInspirationSection ?? true,
      showJourneySection: vis?.showJourneySection ?? fallback.showJourneySection ?? true,
      showGlobalNetworkSection: vis?.showGlobalNetworkSection ?? fallback.showGlobalNetworkSection ?? true,
      showExperienceSection: vis?.showExperienceSection ?? fallback.showExperienceSection ?? true,

      showEventsNav: vis?.showEventsNav ?? fallback.showEventsNav ?? true,
      showBlogsNav: vis?.showBlogsNav ?? fallback.showBlogsNav ?? true,
      showCommunityNav: vis?.showCommunityNav ?? fallback.showCommunityNav ?? true,
      showLeadershipNav: vis?.showLeadershipNav ?? fallback.showLeadershipNav ?? true,
    };
  } catch {
    return {
      showMemberSection: false,
      showMemberNav: false,

      showInstagram: true,
      instagramUrl: "https://www.instagram.com/gbncircle?stkn=dTNpdGd1d3c2YjJ4&utm_source=qr",
      showLinkedIn: false,
      linkedInUrl: "https://www.linkedin.com/company/gbn-circle/",

      showEventsSection: true,
      showLeadershipSection: true,
      showInspirationSection: true,
      showJourneySection: true,
      showGlobalNetworkSection: true,
      showExperienceSection: true,

      showEventsNav: true,
      showBlogsNav: true,
      showCommunityNav: true,
      showLeadershipNav: true,
    };
  }
}
