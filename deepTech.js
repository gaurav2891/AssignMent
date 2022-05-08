const cheerio = require("cheerio");
const request = require("request-promise");

const modelURL = "https://time.com/";

const timeLink = new Promise((resolve, reject) => {
  request(modelURL, (i, el, html) => {
    const $ = cheerio.load(html);
    let variant = [];

    $(".homepage-section-v2 .topic-section-wrapper ul li ").each((i, el) => {
      // console.log(el);
      let link = $(el).find("a").attr("href");
      link = link.replace("/", "https://time.com/");
      let textArea = $(el).find("a h3").text();

      let detail = {};

      detail["title"] = textArea;
      detail["link"] = link;

      variant.push(detail);
    });
    // console.log(variant);

    resolve(variant);
  });
});
