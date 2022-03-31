module.exports = (eleventyConfig) => {
  // if SECRET is given, build site with secret included
  const { SECRET } = process.env;

  const counter = new KeyedCounter(0);

  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setBrowserSyncConfig({
    socket: {
      domain: "localhost:8080",
    },
  });
  eleventyConfig.addWatchTarget(".env");

  eleventyConfig.addShortcode("expunged", function () {
    const cnt = counter.increment(this.page.date);
    const text = this.ctx.secretText[cnt] || "";
    if (SECRET) {
      return `<span class="revealed">${text}</span>`;
    } else {
      return `<s class="expunged">${"█".repeat([...text].length)}</s>`;
    }
  });

  return {
    dir: {
      input: "src",
      output: SECRET ? "dist/__secret__" : "dist",
    },
  };
};

class KeyedCounter {
  currentKey;
  count = 0;
  initialValue;
  constructor(initialValue) {
    this.initialValue = initialValue;
    this.count = initialValue;
  }
  increment(key) {
    if (this.currentKey !== key) {
      this.count = this.initialValue;
      this.currentKey = key;
    }
    return this.count++;
  }
}
