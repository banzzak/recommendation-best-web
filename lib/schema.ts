export type KeywordData = {
  keyword: string,
  preRendering: boolean,
  recommendedItem:Item
  searchedItems: [Item],
};

export type Item = {
  title: string
  originalUrl: string,
  affliateUrl: string,
  finalPrice: number,
  basePrice: number,
  imageUrl: string,
  rating: {
    totalCount: number,
    avgRating:number,
    ratings:{},
  }
}

