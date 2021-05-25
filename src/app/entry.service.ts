import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Entry } from './entry.model';
import { Identifiers } from '@angular/compiler';

@Injectable({providedIn: 'root'})

export class EntryService {
  private entries: Entry[] = [];
  private entriesUpdated = new Subject<Entry[]>();
  constructor(private http: HttpClient) {};

  getEntries() {
    this.http
      .get<{message: string, entries: any[]}>(
        'http://localhost:3000/api/posts'
      )
      .pipe(map(postData => {
        return postData.entries.map(entry => {
          return {
            locationcode: entry.locationcode,
            fullname: entry.fullname,
            phonenumber: entry.phonenumber,
            date: entry.date,
            timein: entry.timein,
            timeout: entry.timeout,
            id: entry._id
          }
        });
      }))
      .subscribe(transformedEntries => {
      this.entries = transformedEntries;
      this.entriesUpdated.next([...this.entries]);
    });
  }

  getEntryUpdateListener() {
    return this.entriesUpdated.asObservable();
  }

  addEntry(locationcode: string, fullname: string, phonenumber: string, date: Date) {
    const entry: Entry = {
      id: null,
      locationcode: locationcode,
      fullname: fullname,
      phonenumber: phonenumber,
      date: date };

    this.http.post<{message: string}>('http://localhost:3000/api/posts', entry)
      .subscribe((responseData) => {
      console.log(responseData.message);
      this.entries.push(entry);
      this.entriesUpdated.next([...this.entries]);
    });
  }

  deletePost(entryId: string) {
    this.http.delete("http://localhost:3000/api/posts/" + entryId)
      .subscribe(() => {
        const updatedEntries = this.entries.filter(entry => entry.id !== entryId);
        this.entries = updatedEntries;
        this.entriesUpdated.next([...this.entries]);
      });
  }
}
