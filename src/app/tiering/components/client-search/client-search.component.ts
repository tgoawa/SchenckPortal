import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.css']
})
export class ClientSearchComponent implements OnInit {

  private title: string = 'Client Search';
  constructor() { }

  ngOnInit() {
  }

}
