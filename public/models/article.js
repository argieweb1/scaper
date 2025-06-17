class Article {
  constructor(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
  }

  static fromJson(json) {
    return new Article(json.id, json.title, json.content);
  }
}

export default Article;