require('chromedriver');
var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder().forBrowser('chrome').build();
const {Builder, By, Key, until} = require('selenium-webdriver');
driver.get('http://localhost:3002');
//driver.get('https://healthcare-frontend-admin.herokuapp.com/');

var email = driver.findElement({xpath:'//input[@id="email"]'});
    email.sendKeys('admin@gmail.com');
var passwd = driver.findElement(By.xpath("//input[@id='password']"));
	passwd.sendKeys('123456');
var submit = driver.findElement(By.xpath("//button[@id='login-button']"));
	submit.click();

driver.getTitle().then(function(title) {console.log(title);});

//driver.quit();