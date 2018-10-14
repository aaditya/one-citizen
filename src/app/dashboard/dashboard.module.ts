import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardGuard } from './dashboard.guard';
import { TransactionComponent } from './transaction/transaction.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { CartComponent } from './cart/cart.component';
import { StoreComponent } from './store/store.component';
import { RewardsComponent } from './rewards/rewards.component';
import { ProfileComponent } from './profile/profile.component';

const authRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [DashboardGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home/profile'
      },
      {
        path: 'subscriptions',
        component: SubscriptionComponent
      },
      {
        path: 'transactions',
        component: TransactionComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'rewards',
        component: RewardsComponent
      },
      {
        path: 'store',
        component: StoreComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DashboardComponent,
    TransactionComponent,
    SubscriptionComponent,
    CartComponent,
    StoreComponent,
    RewardsComponent,
    ProfileComponent
  ]
})
export class DashboardModule { }
