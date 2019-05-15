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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { HotelComponent } from './Hotel/Hotel.component';
import { HotelandiaComponent } from './Hotelandia/Hotelandia.component';

import { uocNetworkAdminComponent } from './uocNetworkAdmin/uocNetworkAdmin.component';
import { uocPersonnelComponent } from './uocPersonnel/uocPersonnel.component';
import { B2BPatnerComponent } from './B2BPatner/B2BPatner.component';

import { CreateHotelComponent } from './CreateHotel/CreateHotel.component';
import { AssignHotelandiaComponent } from './AssignHotelandia/AssignHotelandia.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Hotel', component: HotelComponent },
  { path: 'Hotelandia', component: HotelandiaComponent },
  { path: 'uocNetworkAdmin', component: uocNetworkAdminComponent },
  { path: 'uocPersonnel', component: uocPersonnelComponent },
  { path: 'B2BPatner', component: B2BPatnerComponent },
  { path: 'CreateHotel', component: CreateHotelComponent },
  { path: 'AssignHotelandia', component: AssignHotelandiaComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
