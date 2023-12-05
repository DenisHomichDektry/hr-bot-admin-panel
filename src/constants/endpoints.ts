export enum ENDPOINTS {
  LOGIN = 'auth/google',
  TEST = 'auth/test',
  KNOWLEDGE_BASE_CATEGORY = 'knowledge-base/category',
  KNOWLEDGE_BASE_CATEGORY_BATCH = 'knowledge-base/category/batch',
  KNOWLEDGE_BASE_ITEMS = 'knowledge-base/category/:categoryId/item',
  KNOWLEDGE_BASE_ITEM = 'knowledge-base/item',
  KNOWLEDGE_BASE_CATEGORY_ID = 'knowledge-base/category/:id',
  KNOWLEDGE_BASE_ITEM_ID = 'knowledge-base/item/:id',
}

export enum TAGS {
  CATEGORY = 'Category',
  ITEM = 'Item',
}
