describe('Main page of augmented reality', function() {
    'use strict';

    var url = '/index.html';

    beforeEach(function () {
    	browser.ignoreSynchronization = true
    	browser.get(url);
    	browser.driver.wait(function() {
            return element(by.xpath('//*[@id="augmented-object"]')).isPresent().then(function(IsVisible) {
                return IsVisible;
            });
        }, 10000);
    });

    it('should be loaded and display some buttons.', function () {
    	expect(element(by.xpath('//html/body/div/div[2]/bl/bl-progress/div')).isPresent()).toBe(true);
    	expect(element(by.xpath('//html/body/div/div[2]/bl/div[1]/div[1]/label/input')).isPresent()).toBe(true);
    	expect(element(by.xpath('//html/body/div/div[2]/bl/div[3]/div/label/input')).isPresent()).toBe(true);
    });
    
    it('after clicking on logo the color is displayed.', function () {
    	element(by.xpath('//html/body/div/div[2]/bl/div[1]/div[2]/label')).isSelected().then((result) => {
    		if (result) {
    			expect(element(by.xpath('//html/body/div/div[2]/bl/div[2]/input')).isDisplayed()).toBe(false);
    	    	element(by.xpath('//html/body/div/div[2]/bl/div[1]/div[2]/label')).click();
    	    	expect(element(by.xpath('//html/body/div/div[2]/bl/div[2]/input')).isDisplayed()).toBe(true);
    		} else {
    	    	expect(element(by.xpath('//html/body/div/div[2]/bl/div[2]/input')).isDisplayed()).toBe(true);
    		}
    	});
    	
    });
    
    it('after threshold checkbox the threshold progress is displayed.', function () {
    	element(by.xpath('//html/body/div/div[2]/bl/div[3]/div/label/input')).isSelected().then((result) => {
    		if (result) {
    			expect(element(by.xpath('//html/body/div/div[2]/bl/div[4]/bl-progress/div')).isDisplayed()).toBe(true);
    	    	element(by.xpath('//html/body/div/div[2]/bl/div[3]/div/label/input')).click();
    	    	expect(element(by.xpath('//html/body/div/div[2]/bl/div[4]/bl-progress/div')).isDisplayed()).toBe(false);
    		} else {
    			expect(element(by.xpath('//html/body/div/div[2]/bl/div[4]/bl-progress/div')).isDisplayed()).toBe(false);
    	    	element(by.xpath('//html/body/div/div[2]/bl/div[3]/div/label/input')).click();
    	    	expect(element(by.xpath('//html/body/div/div[2]/bl/div[4]/bl-progress/div')).isDisplayed()).toBe(true);
    		}
    	});
    });
    
});