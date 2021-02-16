export interface CommunityTabsData {
  id: number;
  name: string;
  cover?: string;
  cover_image?: string;
  description: string;
  comm_admin?: string;
}

export interface CommunitiesData {
  communityTabs: CommunityTabsData[];
}
