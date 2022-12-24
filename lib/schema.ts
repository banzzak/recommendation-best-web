export type KeywordData = {
  keyword: string,
  pre_render: boolean,
  recommended_item:Item
  searched_items: [Item],
};

export type Item = {
  title: string
  original_url: string,
  affliate_url: string,
  original_price: number,
  discounted_price: number,
  image_url: string,
  rating: {
    total_count: number,
    avg_rating:number,
    ratings:{},
  }
}

