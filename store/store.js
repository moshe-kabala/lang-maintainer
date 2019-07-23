class Store {
  constructor() {
    this.texts = {};
    this.indexes = new Map();
    this.groups = [];
  }

  insertGroups() {
      // todo
  }

  insertTexts({ texts, fileName, section, path }) {
    for (const text of texts) {
      if (!this.texts[text]) {
        this.texts[text] = text;
      }
    }

    for (const text of texts) {
      if (!this.indexes.has(text)) {
        this.indexes.set(text, []);
      }
      this.indexes.get(text).push({ fileName, section, path });
    }
  }

  toJson() {
    return {
      indexes: [...this.indexes],
      texts: this.texts,
      groups: this.groups
    };
  }
}

module.exports = Store;
