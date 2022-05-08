const express = require("express");
const cheerio = require("cheerio");
const request = require("request-promise");

const app = express();

app.get("/getTimeStories", async (req, res) => {
  try {
    const modelURL = "https://time.com/";

    const timeLink = new Promise((resolve, reject) => {
      request(modelURL, (i, el, html) => {
        const $ = cheerio.load(html);
        let variant = [];

        $(".homepage-section-v2 .topic-section-wrapper ul li ").each(
          (i, el) => {
            let link = $(el).find("a").attr("href");
            link = link.replace("/", "https://time.com/");
            let textArea = $(el).find("a h3").text();

            let detail = {};

            detail["title"] = textArea;
            detail["link"] = link;

            variant.push(detail);
          }
        );
        resolve(variant);
      });
    });

    const data = await timeLink;

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "FAILED",
      err: error,
    });
  }
});

app.listen(8000, (req, res) => {
  console.log(`app is running on =>  http://localhost:8000/getTimeStories`);
});
