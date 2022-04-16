import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BlogPost } from '../blog-post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css']
})
export class PostsTableComponent implements OnInit {

  blogPosts: Array<BlogPost> = []; 
  sub : any = [];

  constructor(
    private _postService : PostService,
    private route : Router
  ) { }

  ngOnInit(): void {
    this.sub = this._postService.getAllPosts().subscribe(post => {
      this.blogPosts = post;
    })
  }

  rowClicked(e : any, id : string){
    this.route.navigate(['admin/post/', id]);
  }

  ngOnDestroy(){
    if(this.sub.length > 0) 
      this.sub.unsubscribe();
  }

}

