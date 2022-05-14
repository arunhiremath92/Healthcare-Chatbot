require('chromedriver');
var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder().forBrowser('chrome').build();
const {Builder, By, Key, until} = require('selenium-webdriver');
driver.get('http://localhost:3002');
//driver.get('https://healthcare-frontend-admin.herokuapp.com/');

async function getChatHistory(){

    var email = driver.findElement({xpath:'//input[@id="email"]'});
        email.sendKeys('admin@gmail.com');
    var passwd = driver.findElement(By.xpath("//input[@id='password']"));
        passwd.sendKeys('123456');
    var submit = driver.findElement(By.xpath("//button[@id='login-button']"));
        submit.click();

    await driver.wait(until.elementLocated(webdriver.By.id('Manage Chat History')), 15000);

    var button = driver.findElement(By.xpath("//button[@id='Manage Chat History']"));
        button.click();
    //driver.findElement(webdriver.By.id('Manage Chat History')).click();

}

getChatHistory();
//driver.quit();