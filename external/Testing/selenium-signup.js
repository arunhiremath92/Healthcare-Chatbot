require('chromedriver');
var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder().forBrowser('chrome').build();
driver.get('http://localhost:3000/signup');
//driver.get('https://digitalhealthcare-frontend.herokuapp.com/signup');
const {Builder, By, Key, until} = require('selenium-webdriver');

//signup automation
var fistName = driver.findElement({xpath:'//input[@id="firstName"]'});
	fistName.sendKeys('yi');
var lastName = driver.findElement(By.xpath("//input[@id='lastName']"));
	lastName.sendKeys('hu');
var email = driver.findElement(By.xpath("//input[@id='email']"));
	email.sendKeys('usertest@gmail.com');
var password = driver.findElement(By.xpath("//input[@id='password']"));
	password.sendKeys('123456');	
var submit = driver.findElement(By.xpath("//button[@id='signup-submit']"));
	submit.click();

//driver.quit();