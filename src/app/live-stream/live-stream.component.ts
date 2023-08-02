import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-live-stream',
  templateUrl: './live-stream.component.html',
  styleUrls: ['./live-stream.component.css']
})
export class LiveStreamComponent implements OnInit {
  guestList?: string[];
  startDateValue: Date = new Date();
  endDateValue: Date = new Date();



  time: string[] = ["00:00", "00:15", "00:30", "00:45", "01:00", "01:15", "01:30", "1:45", "2:00", "02:15", "02:30", "2:45", "3:00",
    "03:15", "03:30", "3:45", "4:00", "04:15", "04:30", "4:45", "4:00", "04:15", "04:30", "4:45", "4:00", "04:15", "04:30", "4:45", "5:00",
    "05:15", "05:30", "5:45", "6:00", "06:15", "06:30", "6:45", "6:00", "06:15", "06:30", "6:45", "6:00", "06:15", "06:30", "6:45", "7:00"
    , "23:45"];

  liveStream = this.fb.group({
    eventTitle: ["", [Validators.required, Validators.maxLength(100)]],
    startDate: ["", Validators.required],
    startTime: ["", Validators.required],
    endDate: ["", Validators.required],
    endTime: ["", Validators.required],
    textArea: [""],
    textArea2: ["", [Validators.required, this.checkIfGuestEmailsAreValid]]
  });
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) {
  }



  ngOnInit(): void {
    this.liveStream.controls['textArea2'].valueChanges.subscribe((guestEmails) => {
      this.guestList = guestEmails?.split(',');
    });
  }

  get eventTitle() { return this.liveStream.get('eventTitle'); }
  get startDate() { return this.liveStream.get('startDate'); }
  get startTime() { return this.liveStream.get('startTime'); }
  get endDate() { return this.liveStream.get('endDate'); }
  get endTime() { return this.liveStream.get('endTime'); }
  get textArea2() { return this.liveStream.get('textArea2'); }

  onSubmit() {
    this._snackBar.open('Congrats, you have submitted the form!!', 'success', {
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }


  checkIfGuestEmailsAreValid(c: AbstractControl) {
    if (c.value !== '') {
      const emailString = c.value;
      const emails = emailString.split(',').map((e: string) => e.trim());
      const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      const anyInvalidEmail = emails.every((e: string) => e.match(emailRegex) !== null);
      if (!anyInvalidEmail) {
        return { checkIfGuestEmailsAreValid: false }
      }
    }
    return null;
  }

}
