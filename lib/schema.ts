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
  originalPrice: number,
  discountedPrice: number,
  imageUrl: string,
  rating: {
    totalCount: number,
    avgRating:number,
    ratings:{},
  }
}

