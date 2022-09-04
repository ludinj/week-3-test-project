export class Post {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.subTitle = data.subTitle;
    this.author = data.author;
    this.body = data.body;
    this.createDate = data.createDate;
    this.image = data.image;
    this.likes = data.likes;
    this.tags = data.tags;
    this.comments = data.comments;
  }

  renderFeatured() {
    return `
    <div class="image">
      <img
        src="${this.image}"
        alt="image"
      />
    </div>
    <div class="featured__info">
      <h2>${this.title}</h2>
      <p>-${this.subTitle}</p>
      <p>
       ${this.body}
      </p>
          </div>
    <small>${this.createDate}</small>
  `;
  }
  renderGridItem() {
    return `
    <img
      src="${this.image}"
      alt="image"
    />
    <div class="grid__item__info">
      <h4>${this.title}</h4>
      <p>
      ${this.body}
      </p>
      <small>${this.createDate}</small>
    </div>
`;
  }
}

export class FetchData {
  static instance = null;
  constructor(url, method, body) {
    if (FetchData.instance === null) {
      FetchData.instance = this;
      this.method = method;
      this.url = url;
      this.body = body;
      return this;
    } else {
      return FetchData.instance;
    }
  }
  async getData() {
    const res = await fetch(this.url);
    const data = await res.json();

    if (typeof data === 'object') {
      return data;
    }
    if (Array.isArray(data)) {
      return data.sort((a, b) => {
        return new Date(b.createDate) - new Date(a.createDate);
      });
    }
  }
  async setData() {
    console.log(this.body);
    const res = await fetch(this.url, {
      method: this.method,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        ...this.body,
      }),
    });
    const data = await res.json();

    return data;
  }
}

export const fetchData = new FetchData();

export class Comment {
  constructor(data) {
    this.id = data.id;
    this.comment = data.comment;
    this.postId = data.postId;
    this.user = data.user;
  }
}
