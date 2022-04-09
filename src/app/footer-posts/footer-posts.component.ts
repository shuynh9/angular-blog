import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../blog-post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-footer-posts',
  templateUrl: './footer-posts.component.html',
  styleUrls: ['./footer-posts.component.css']
})
export class FooterPostsComponent implements OnInit {

  posts: Array<BlogPost>;

  constructor(private _postService : PostService) { 
    this.posts = new Array<BlogPost>();
  }

  ngOnInit(): void {
    this._postService.getPosts(1, '', '').subscribe((data) =>
      this.posts = data.slice(0,3)
    )
  }

}
