const express = require('express');
const router = express.Router();
const puppeteer=require('puppeteer'); // to launch the browser
const axeCore = require('axe-core'); // to run the accessibility tests

router.post('/', async (req, res) => {
    const { url } = req.body; // get the url from the request body
    try{
        const browser = await puppeteer.launch({ headless: true }); // launch the browser
        const page = await browser.newPage(); // open a new page    
        await page.goto(url,{waitUntil:'load'}); // navigate to the url

        await page.addScriptTag({content:axeCore.source}); // add axe-core script to the page
        const results=await page.evaluate(()=>axe.run()); // run the axe-core script on the page
        await browser.close(); // close the browser
        res.json(results); // send the results back to the client

    }catch(err){
        console.error(err); // log the error
        res.status(500).json({error:'An error occurred while analyzing the page.'}); // send an error response
    }
});

module.exports = router;    