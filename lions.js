// Created By MiggySmallz
// Date: November 25 2021 @ 4:00 EST

const { truncateSync } = require('fs');
const { truncate } = require('fs/promises');
const { nextTick } = require('process');
const puppeteer = require('puppeteer');


var args = process.argv.slice(2);
const minPrice = args[0]
const maxPrice = args[1]

async function initializeBrowser()
{
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox","--disable-setuid-sandbox"]
        
    });

    try{
        
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0); 
        await page.goto(`https://crypto.com/nft/marketplace?search=Loaded+Lion&minPrice=${minPrice}&maxPrice=${maxPrice}`);
        const [el] = await page.$x('/html/body/div[2]/div[1]/div/div[1]/div[2]/div[2]/div/div/div/div[1]');
        await page.waitForTimeout(3000)
        await page.evaluate(_ => {
            window.scrollBy(0, window.innerHeight)
        })
        await autoScroll(page);
        await page.waitForTimeout(1000)
        
        
        
        const els = await page.$$('div.css-10yi4wi');
        console.log(`There are ${els.length} lions in this range\n`);

        for (let i = 0; i < els.length; i++) {
            const lionName = await els[i].$eval('div[class^=NftCard_nftName]', div => div.textContent)
            const lionBuyType = await els[i].$eval('div[class=css-1phsfx]', div => div.textContent)
            const lionPrice = await els[i].$eval('div[class=css-qhhkrs]', div => div.textContent)
            const lionLikes = await els[i].$eval('div[class=css-1nhwfv9]', div => div.textContent)
            
            console.log("Name:" + lionName);
            console.log("Buy Type:" + lionBuyType);
            console.log("Price:" + lionPrice);
            console.log("Likes:" + lionLikes + "\n");
        }
        await browser.close();
    }
    catch(err) {
        console.log(err);
        await browser.close();
    } 
}

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

initializeBrowser();







