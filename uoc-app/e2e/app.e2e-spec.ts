/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for uoc-app', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be uoc-app', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('uoc-app');
    })
  });

  it('network-name should be hotelandiav1@0.0.2-deploy.19',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('hotelandiav1@0.0.2-deploy.19.bna');
    });
  });

  it('navbar-brand should be uoc-app',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('uoc-app');
    });
  });

  
    it('Hotel component should be loadable',() => {
      page.navigateTo('/Hotel');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Hotel');
      });
    });

    it('Hotel table should have 4 columns',() => {
      page.navigateTo('/Hotel');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('Hotelandia component should be loadable',() => {
      page.navigateTo('/Hotelandia');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Hotelandia');
      });
    });

    it('Hotelandia table should have 7 columns',() => {
      page.navigateTo('/Hotelandia');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('uocNetworkAdmin component should be loadable',() => {
      page.navigateTo('/uocNetworkAdmin');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('uocNetworkAdmin');
      });
    });

    it('uocNetworkAdmin table should have 3 columns',() => {
      page.navigateTo('/uocNetworkAdmin');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  
    it('uocPersonnel component should be loadable',() => {
      page.navigateTo('/uocPersonnel');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('uocPersonnel');
      });
    });

    it('uocPersonnel table should have 4 columns',() => {
      page.navigateTo('/uocPersonnel');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('B2BPatner component should be loadable',() => {
      page.navigateTo('/B2BPatner');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('B2BPatner');
      });
    });

    it('B2BPatner table should have 3 columns',() => {
      page.navigateTo('/B2BPatner');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('CreateHotel component should be loadable',() => {
      page.navigateTo('/CreateHotel');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreateHotel');
      });
    });
  
    it('AssignHotelandia component should be loadable',() => {
      page.navigateTo('/AssignHotelandia');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AssignHotelandia');
      });
    });
  

});