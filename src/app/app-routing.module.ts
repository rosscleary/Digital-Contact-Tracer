import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportCaseComponent } from './report-case/report-case.component';
import { AddEntryComponent } from './add-entry/add-entry.component';

const routes: Routes = [
  { path: '', component: AddEntryComponent },
  { path: 'report-case', component: ReportCaseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
