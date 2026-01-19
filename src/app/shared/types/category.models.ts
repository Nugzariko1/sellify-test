export interface CategoryResponse {
  id: string;
  name: string;
  description?: string;
  slug: string;
  parentId?: string;
  isActive: boolean;
  level: number;
  hasSubCategories: boolean;
  createdAt: string;
  updatedAt: string;
  iconUrl?: string;
}
