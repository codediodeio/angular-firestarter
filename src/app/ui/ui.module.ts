import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserLoginComponent } from './user-login/user-login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NotificationMessageComponent } from './notification-message/notification-message.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SsrPageComponent } from './ssr-page/ssr-page.component';

//


//----------------------------NGMaterial
//JGAngularMaterial imports
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule, MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';

import { MatCardModule } from '@angular/material/card';

import { MatTooltipModule } from '@angular/material/tooltip';

import { MatChipsModule } from '@angular/material/chips';

//confirming dialog
//@urir https://www.primefaces.org/primeng/#/confirmdialog
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
 


import { ButtonModule } from 'primeng/button';
import { GixMdcSamplesComponent } from '../gix/gix-mdc-samples/gix-mdc-samples.component';
import { NotificationToasterComponent } from './notification-toaster/notification-toaster.component';

import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatRippleModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSidenavModule,
    MatMenuModule,
    MatDatepickerModule,
    MatRadioModule,
    FormsModule,
    MatNativeDateModule,
    //--------------
    MatInputModule,
    MatCardModule,
    MatTooltipModule,
    MatChipsModule,
    MatButtonModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
    MatStepperModule
  ],
  declarations: [
    UserLoginComponent,
    HomePageComponent,
    MainNavComponent,
    LoadingSpinnerComponent,
    NotificationMessageComponent,
    UserProfileComponent,
    UserFormComponent,
    SsrPageComponent,
    GixMdcSamplesComponent,
    NotificationToasterComponent
  ],
  exports: [
    MainNavComponent,
    LoadingSpinnerComponent,
    NotificationMessageComponent,
    NotificationToasterComponent,
    UserProfileComponent,
    UserFormComponent,
    ReactiveFormsModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatRippleModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSidenavModule,
    MatMenuModule,
    MatDatepickerModule,
    MatRadioModule,
    FormsModule,
    MatNativeDateModule,
    //--------------
    MatInputModule,
    MatCardModule,
    MatTooltipModule,
    MatChipsModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
    MatButtonModule,
    MatStepperModule
  ]
})
export class UiModule { }
