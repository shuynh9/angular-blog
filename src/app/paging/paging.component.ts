import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})

export class PagingComponent implements OnInit {
  @Input() page: any;
  @Output() newPage = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

  backPage() {
    if(this.page > 1) {
      this.newPage.emit(this.page - 1);
    }
  }

  nextPage(){
    this.newPage.emit(this.page + 1);
  }

}
