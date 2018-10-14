import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SplashComponent } from './splash/splash.component';
import { HttpClientModule } from '@angular/common/http';
import { ReviewComponent } from './dashboard/modals/review/review.component';
import { ReaderComponent } from './dashboard/modals/reader/reader.component';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: SplashComponent },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'home', loadChildren: './dashboard/dashboard.module#DashboardModule' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    SplashComponent,
    ReviewComponent,
    ReaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    JwSocialButtonsModule,
    NgbModule
  ],
  providers: [
    Title
  ],
  entryComponents: [
    ReviewComponent,
    ReaderComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
