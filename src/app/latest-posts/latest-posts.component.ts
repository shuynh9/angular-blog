import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../blog-post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.css']
})
export class LatestPostsComponent implements OnInit {

  //@Input() 
  posts: Array<BlogPost>;

  constructor(private _postService : PostService) { 
    this.posts = new Array<BlogPost>();
  }

  ngOnInit(): void {
    this._postService.getPosts(1, '', '').subscribe((data) =>
      this.posts = data.slice(0.3)
    )
  }

}
