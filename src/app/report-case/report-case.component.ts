import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from 'rxjs';

import { Entry } from "../entry.model";
import { EntryService } from "../entry.service";

@Component({
  selector: "app-report-case",
  templateUrl: "./report-case.component.html",
  styleUrls: ["./report-case.component.css"]
})

export class ReportCaseComponent {
  entries: Entry[] = [];
  private entriesSub: Subscription;

  constructor(public entryService: EntryService) {}

  ngOnInit() {
    this.entryService.getEntries();
    this.entriesSub = this.entryService.getEntryUpdateListener()
      .subscribe((entries: Entry[]) => {
        this.entries = entries;
      });
  }

  ngOnDestroy() {
    this.entriesSub.unsubscribe();
  }

  displayedEntries: Entry[] = [];
  displayedRisks: String[] = [];
  listDisplayed = false;
  onReportCase(form: NgForm) {
    for(let entry of this.entries) {
      console.log(Date.now() - new Date(entry.date).getTime());
      if(Date.now() - new Date(entry.date).getTime() > 1210000000) {
        this.entryService.deletePost(entry.id);
      }
      if(entry.fullname == form.value.fullname && entry.phonenumber == form.value.phonenumber) {
        continue;
      }
      for(let caseEntry of this.entries) {
        if(caseEntry.fullname == form.value.fullname && caseEntry.phonenumber == form.value.phonenumber && caseEntry.locationcode == entry.locationcode) {
          if(new Date(entry.date).getTime() - new Date(caseEntry.date).getTime() <= 10800000) {
            this.displayedRisks.push('High')
          } else if(new Date(entry.date).getTime() - new Date(caseEntry.date).getTime() <= 86400000) {
            this.displayedRisks.push('Moderate');
          } else if(new Date(entry.date).getTime() - new Date(caseEntry.date).getTime() <= 259200000) {
            this.displayedRisks.push('Low');
          }
          this.displayedEntries.push(entry);
        }
      }
    }
    this.listDisplayed = true;
    form.resetForm();
  }

  onClearList() {
    this.displayedEntries = [];
    this.displayedRisks = [];
    this.listDisplayed = false;
  }

}
