import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { MapquestService } from './mapquest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MapquestService]
})

export class AppComponent implements OnInit {
  dataItems: any;

  // Set the initial values
  searchbox1 = 'Boston, MA';
  searchbox2 = 'Cambridge, MA';

  // a subject to publish search terms
  private searchTerms: Subject<string>;

  constructor(private provider: MapquestService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
   this.searchTerms = new Subject<string>();

   // Initiate the default map
   this.provider
   .getMap(this.searchbox1, this.searchbox2)
   .subscribe(result => 
       {
         console.log(result);
         this.dataItems = result;
       });

  // Modify the map when the input changes
   this.searchTerms
     .debounceTime(2000)
     .distinctUntilChanged()
     .switchMap(term => {
        console.log("Calling Search for:", term);
       return this.provider.getMap(this.searchbox1, this.searchbox2);
     })
     .subscribe((result:any)=>
           {
             console.log(result);
             this.dataItems = result;
           });
  }
}
