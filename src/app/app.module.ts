import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MomentFormatPipe } from './services/moment-format.pipe';
import { MatDividerModule } from '@angular/material/divider';
import { NewSessionComponent } from './features/new-session/new-session.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditSessionComponent } from './features/edit-session/edit-session.component';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    MomentFormatPipe,
    NewSessionComponent,
    EditSessionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-right', // Adjust the position as needed
        preventDuplicates: true, // Prevent duplicate toasts
      }
    )
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
