import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';
import { ForumComponent } from './forum/forum.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostNavigatorComponent } from './post-navigator/post-navigator.component';
import { MatPaginatorGotoComponent } from './mat-paginator-goto/mat-paginator-goto.component';

@NgModule({
  declarations: [
    AppComponent,
    ForumComponent,
    PostDetailComponent,
    PostNavigatorComponent,
    MatPaginatorGotoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatSelectModule, MatFormFieldModule, MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
