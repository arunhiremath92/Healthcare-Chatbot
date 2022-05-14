require('chromedriver');
var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder().forBrowser('chrome').build();
const {Builder, By, Key, until} = require('selenium-webdriver');

driver.get('http://localhost:3000/provider-search');
//driver.get('https://digitalhealthcare-frontend.herokuapp.com/provider-search');

var location = driver.findElement({xpath:'//TextField[@id="location"]'});
    location.sendKeys('95050');
var Name = driver.findElement({xpath:'//Select[@id="demo-multiple-name"]'});
    Name.sendKeys('Allergists');
//driver.findElement(webdriver.By.id('location')).sendKeys('95050');
//driver.findElement(webdriver.By.id('demo-multiple-name')).sendKeys('Allergists');

var searchBtn = driver.findElement({xpath:'//button[@id="search-button"]'});
    searchBtn.click();


//driver.getTitle().then(function(title) {console.log(title);});
//driver.quit();