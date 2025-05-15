const express = require('express');
const router = express.Router();
const puppeteer=require('puppeteer'); // to launch the browser
const axeCore = require('axe-core'); // to run the accessibility tests
const Analysis = require('../models/Analysis');
 
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

// Route to save analysis
router.post('/save', async (req, res) => {
  try {
    const { url, violations } = req.body;

    const saved = await Analysis.create({ url, violations });
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error saving analysis:', error);
    res.status(500).json({ error: 'Failed to save analysis' });
  }
});

// Route to get all saved analyses
router.get('/all', async (req, res) => {
  try {
    const allAnalyses = await Analysis.find().sort({ date: -1 });
    res.json(allAnalyses);
  } catch (error) {
    console.error('Error fetching analyses:', error);
    res.status(500).json({ error: 'Failed to fetch analyses' });
  }
});

module.exports = router;