export type KeywordData = {
  keyword: string,
  preRendering: boolean,
  recommendedItem:Item,
  //searchedItems: [Item],
};

export type Item = {
  title: string
  originalUrl: string,
  affiliateUrl: string,
  finalPrice: number,
  basePrice: number,
  imageUrl: string,
  rating: {
    totalCount: number,
    avgRating:number,
    ratings:{},
  }
}

