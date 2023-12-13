export enum ENDPOINTS {
  LOGIN = 'auth/google',
  TEST = 'auth/test',
  KNOWLEDGE_BASE_CATEGORY = 'knowledge-base/category',
  KNOWLEDGE_BASE_CATEGORY_BATCH = 'knowledge-base/category/batch',
  KNOWLEDGE_BASE_ITEMS = 'knowledge-base/category/:categoryId/item',
  KNOWLEDGE_BASE_ITEM = 'knowledge-base/item',
  KNOWLEDGE_BASE_CATEGORY_ID = 'knowledge-base/category/:id',
  KNOWLEDGE_BASE_ITEM_ID = 'knowledge-base/item/:id',
  USER = 'user',
  USER_ID = 'user/:id',
  USER_ROLE = 'user/role',
  ONBOARDING = 'onboarding',
  ONBOARDING_ID = 'onboarding/:id',
  FEEDBACK = 'feedback',
}

export enum TAGS {
  CATEGORY = 'Category',
  ITEM = 'Item',
  USER = 'User',
  USER_ROLE = 'UserRole',
  ONBOARDING = 'Onboarding',
  FEEDBACK = 'Feedback',
}
