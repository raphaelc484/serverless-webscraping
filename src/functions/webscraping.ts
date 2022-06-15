import { ScheduledHandler } from "aws-lambda";
import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

export const handler: ScheduledHandler = async (event) => {
  // console.log(event.time);

  if (event) {
    // console.log("faça algo por mim");
    const product = "550";
    let numberCSS = 6416;

    try {
      const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: true,
      });

      const page = await browser.newPage();

      await page.goto("https://google.com.br");
    } catch (error) {
      console.log(error);
    }
  }
};
