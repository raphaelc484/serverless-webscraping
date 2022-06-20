import { ScheduledHandler } from "aws-lambda";
import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
import axios from "axios";
import fs from "fs";
import path from "path";

export const handler: ScheduledHandler = async (event) => {
  // console.log(event.time);

  if (event) {
    // console.log("faça algo por mim");
    const product = "550";
    let numberCSS = 6416;

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath:
        process.env.CHROME_EXECUTABLE_PATH || (await chromium.executablePath),
      headless: true,
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);

    try {
      await page.goto(
        "https://sintegre.ons.org.br/sites/9/38/paginas/servicos/historico-de-produtos.aspx"
      );
      await page.waitForXPath('//*[@id="username"]');
      await page.type("#username", process.env.SINTEGRE_USERNAME);
      await page.click('[type="submit"]');
      await page.waitForNavigation();
      await page.waitForTimeout(1000);
      await page.type("#password", process.env.SINTEGRE_PASSWORD);
      await page.click('[type="submit"]');
      await page.waitForTimeout(1000);
      await page.waitForNavigation();

      await page.title();

      await page.waitForSelector(".site-atual");

      await page.waitForSelector(`#tituloproduto-${numberCSS}`);

      const f = await page.$("[id='tituloproduto-6416']");

      const text = await (await f.getProperty("textContent")).jsonValue();

      if (text) {
        console.log(text);

        const pathT = path.resolve(__dirname);

        // const t = fs.readFileSync(pathT);

        console.log(pathT);

        // await page.click(
        //   `.item_produto_a6dbcb54 .item_produto_corpo_a6dbcb54 #linkproduto-${numberCSS}`
        // );

        //Esse elemento consegue travar local de download
        // await (page as any)._client.send('Page.setDownloadBehavior', {
        //   behavior: 'allow',
        //   downloadPath: pathSave,
        // });
      }

      // await (page as any)._client.send("Network.clearBrowserCookies");
      // await page.close();
    } catch (error) {
      console.log(error);
      await (page as any)._client.send("Network.clearBrowserCookies");
      await page.close();
    }
  }
};
