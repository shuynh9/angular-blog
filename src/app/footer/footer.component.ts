import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../blog-post'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() posts: Array<BlogPost>;

  constructor() {
    this.posts = new Array<BlogPost>();
  }

  ngOnInit(): void {
  }

}
