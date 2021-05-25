import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { EntryService } from "../entry.service";

@Component({
  selector: "app-add-entry",
  templateUrl: "./add-entry.component.html",
  styleUrls: ["./add-entry.component.css"]
})

export class AddEntryComponent {

   constructor(public entryService: EntryService) {};

  onAddEntry(form: NgForm) {
     this.entryService.addEntry(
       form.value.locationcode,
       form.value.fullname,
       form.value.phonenumber,
       form.value.date
       );
    form.resetForm();
  }

}
