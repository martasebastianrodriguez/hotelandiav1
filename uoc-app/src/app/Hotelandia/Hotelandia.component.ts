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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HotelandiaService } from './Hotelandia.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-hotelandia',
  templateUrl: './Hotelandia.component.html',
  styleUrls: ['./Hotelandia.component.css'],
  providers: [HotelandiaService]
})
export class HotelandiaComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  hotelandiaId = new FormControl('', Validators.required);
  ownershipType = new FormControl('', Validators.required);
  habitacionIndividual = new FormControl('', Validators.required);
  habitacionDoble = new FormControl('', Validators.required);
  suite = new FormControl('', Validators.required);
  nickName = new FormControl('', Validators.required);

  constructor(public serviceHotelandia: HotelandiaService, fb: FormBuilder) {
    this.myForm = fb.group({
      hotelandiaId: this.hotelandiaId,
      ownershipType: this.ownershipType,
      habitacionIndividual: this.habitacionIndividual,
      habitacionDoble: this.habitacionDoble,
      suite: this.suite,
      nickName: this.nickName
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceHotelandia.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.uoc.reservahotel.hotelandia.Hotelandia',
      'hotelandiaId': this.hotelandiaId.value,
      'ownershipType': this.ownershipType.value,
      'habitacionIndividual': this.habitacionIndividual.value,
      'habitacionDoble': this.habitacionDoble.value,
      'suite': this.suite.value,
      'nickName': this.nickName.value
    };

    this.myForm.setValue({
      'hotelandiaId': null,
      'ownershipType': null,
      'habitacionIndividual': null,
      'habitacionDoble': null,
      'suite': null,
      'nickName': null
    });

    return this.serviceHotelandia.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'hotelandiaId': null,
        'ownershipType': null,
        'habitacionIndividual': null,
        'habitacionDoble': null,
        'suite': null,
        'nickName': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.uoc.reservahotel.hotelandia.Hotelandia',
      'ownershipType': this.ownershipType.value,
      'habitacionIndividual': this.habitacionIndividual.value,
      'habitacionDoble': this.habitacionDoble.value,
      'suite': this.suite.value,
      'nickName': this.nickName.value
    };

    return this.serviceHotelandia.updateAsset(form.get('hotelandiaId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceHotelandia.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceHotelandia.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'hotelandiaId': null,
        'ownershipType': null,
        'habitacionIndividual': null,
        'habitacionDoble': null,
        'suite': null,
        'nickName': null
      };

      if (result.hotelandiaId) {
        formObject.hotelandiaId = result.hotelandiaId;
      } else {
        formObject.hotelandiaId = null;
      }

      if (result.ownershipType) {
        formObject.ownershipType = result.ownershipType;
      } else {
        formObject.ownershipType = null;
      }

      if (result.habitacionIndividual) {
        formObject.habitacionIndividual = result.habitacionIndividual;
      } else {
        formObject.habitacionIndividual = null;
      }

      if (result.habitacionDoble) {
        formObject.habitacionDoble = result.habitacionDoble;
      } else {
        formObject.habitacionDoble = null;
      }

      if (result.suite) {
        formObject.suite = result.suite;
      } else {
        formObject.suite = null;
      }

      if (result.nickName) {
        formObject.nickName = result.nickName;
      } else {
        formObject.nickName = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'hotelandiaId': null,
      'ownershipType': null,
      'habitacionIndividual': null,
      'habitacionDoble': null,
      'suite': null,
      'nickName': null
      });
  }

}
