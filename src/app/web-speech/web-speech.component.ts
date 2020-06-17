import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SpeechRecognizerService } from './shared/services/speech-recognizer.service';

import { SpeechNotification } from './shared/model/speech-notification';
import { SpeechError } from './shared/model/speech-error';
import { Router } from '@angular/router';

@Component({
  selector: 'wsa-web-speech',
  templateUrl: './web-speech.component.html',
  styleUrls: ['./web-speech.component.css']
})
export class WebSpeechComponent implements OnInit {

  public data = [
    { Id: 1, FirstName: 'Pratik', LastName: 'Patil', Weight: 70, Height: 5.8, Gender: 'Male', Status: 'Married', Job: 'Service', Education: 'MBA', Location: 'Thane' },
    { Id: 2, FirstName: 'Pavitra', LastName: 'Farde', Weight: 55, Height: 5.7, Gender: 'Female', Status: 'Married', Job: 'Service', Education: 'MCA', Location: 'Airoli' },
    { Id: 3, FirstName: 'Nikita', LastName: 'Churi', Weight: 50, Height: 5.9, Gender: 'Female', Status: 'Married', Job: 'Service', Education: 'PHD', Location: 'Vashi' },
    { Id: 4, FirstName: 'Vipul', LastName: 'Singh', Weight: 72, Height: 5.4, Gender: 'Male', Status: 'UnMarried', Job: 'Service', Education: 'MD', Location: 'Thane' },
    { Id: 5, FirstName: 'Taruja', LastName: 'Sharma', Weight: 60, Height: 5.2, Gender: 'Female', Status: 'Married', Job: 'Service', Education: 'MBA', Location: 'Powai' },
    { Id: 6, FirstName: 'Nitish', LastName: 'Mehata', Weight: 75, Height: 5.5, Gender: 'Male', Status: 'Married', Job: 'Business', Education: 'MS', Location: 'Pune' },
    { Id: 7, FirstName: 'Kirti', LastName: 'Borade', Weight: 78, Height: 5.6, Gender: 'Female', Status: 'UnMarried', Job: 'Service', Education: 'MCA', Location: 'Nashik' },
    { Id: 8, FirstName: 'Mithilesh', LastName: 'Pandey', Weight: 75, Height: 5.2, Gender: 'Male', Status: 'Married', Job: 'Service', Education: 'MD', Location: 'Thane' },
    { Id: 9, FirstName: 'Anannya', LastName: 'Gupta', Weight: 64, Height: 5.4, Gender: 'Female', Status: 'Married', Job: 'Business', Education: 'MCA', Location: 'Airoli' },
    { Id: 10, FirstName: 'Prathamesh', LastName: 'Kale', Weight: 72, Height: 5.3, Gender: 'Male', Status: 'UnMarried', Job: 'Service', Education: 'PHD', Location: 'Pune' },
  ];

  sortByArray = ['sort', 'Id', 'FirstName', 'LastName', 'Weight', 'Height', 'Gender', 'Status', 'Job', 'Education', 'Location'];
  searchText;

  previousIndex: number;

  finalTranscript = '';
  recognizing = false;
  notification: string;
  sortByFlag = false;
  orderData = false;
  clearTable: any;
  sortTable: any;
  finalCheckFlag = false;

  constructor(private changeDetector: ChangeDetectorRef,
    private speechRecognizer: SpeechRecognizerService, private router: Router) { }

  dtOptions: DataTables.Settings = {};
  ngOnInit() {
    this.initRecognition();
    this.notification = null;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

  startButton(event) {
    if (this.recognizing) {
      this.speechRecognizer.stop();
      this.finalTranscript = '';
      // $('#sortTable').val('');
      // this.clearTable.search('').draw();
      return;
    }

    this.speechRecognizer.start(event.timeStamp);
  }

  private initRecognition() {
    this.speechRecognizer.onStart()
      .subscribe(data => {
        this.recognizing = true;
        this.notification = 'I\'m listening...';
        this.detectChanges();
      });

    this.speechRecognizer.onEnd()
      .subscribe(data => {
        this.recognizing = false;
        this.detectChanges();
        this.notification = null;
        this.finalTranscript = '';
        this.sortByFlag = false;
        $('#sortTable').val('');
        if (this.clearTable) {
          this.clearTable.search('').draw();
        }
      });

    this.speechRecognizer.onResult()
      .subscribe((data: SpeechNotification) => {
        const message = data.content.trim();
        if (data.info === 'final_transcript' && message.length > 0) {
          this.finalTranscript = `${this.finalTranscript}${message}`;
          // console.log(this.finalTranscript);      
          this.detectChanges();
        }

        let sortByData: any;
        var self = this;
        sortByData = this.finalTranscript.split(' ');
        let clearArrayTable = $('#sortTable').DataTable();
        let finalCheck = self.finalTranscript.split('sort ');
        if (finalCheck.length > 1) {
          $("#sortTable thead tr th").each(function (index: any) {

            if (sortByData[0].toLowerCase() === 'sort') {
              self.finalCheckFlag = true;


              if (this.innerHTML.toLowerCase() === finalCheck[1].toLowerCase()) {
                clearArrayTable.order([index, 'asc']).draw();
                // self.recognizing = false;
              }

            }
          });
          this.speechRecognizer.stop();
        }


        if (!this.finalCheckFlag) {
          self.clearTable = $('#sortTable').DataTable();
          $('#sortTable').focus();
          $('#sortTable').on('focus', function () {
            self.clearTable.search(self.finalTranscript).draw();
          });

        }
      });

    this.speechRecognizer.onError()
      .subscribe(data => {
        switch (data.error) {
          case SpeechError.BLOCKED:
          case SpeechError.NOT_ALLOWED:
            this.notification = `Cannot run the demo.
            Your browser is not authorized to access your microphone. Verify that your browser has access to your microphone and try again.
            `;
            break;
          case SpeechError.NO_SPEECH:
            this.notification = `No speech has been detected. Please try again.`;
            break;
          case SpeechError.NO_MICROPHONE:
            this.notification = `Microphone is not available. Plese verify the connection of your microphone and try again.`;
            break;
          default:
            this.notification = null;
            break;
        }
        this.recognizing = false;
        this.detectChanges();
      });
  }

  detectChanges() {
    this.changeDetector.detectChanges();
  }
}
