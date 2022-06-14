import { ScheduledHandler } from "aws-lambda";
import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";

export const handler: ScheduledHandler = async (event) => {
  // console.log(event.time);

  if (event) {
    // console.log("faça algo por mim");
    const product = "550";
    let numberCSS = 6416;

    try {
      const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
      });

      const page = await browser.newPage();

      await page.goto("https://google.com.br");
    } catch (error) {
      console.log(error);
    }
  }
};
