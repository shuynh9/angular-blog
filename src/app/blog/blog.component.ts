import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../blog-post';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
 
  blogPosts:Array<BlogPost> = new Array();

  page : number = 1;
  tag : string = '';
  category : string = '';
  querySub : any;

  constructor(
    private _postService : PostService,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(params => {
      if(params['tag']){
      this.tag = params['tag'];
      this.category = '';
      }else{
      this.tag = '';
      }
      if(params['category']){
      this.category = params['category'];
      this.tag = '';
      }else{
      this.category = '';
      }
      this.getPage(+params['page'] || 1);
     });
  }

  getPage(num: number) {
    this._postService.getPosts(num, this.tag, this.category).subscribe((data) => {
      if(data.length > 0) {
        this.blogPosts = data,
        this.page = num
      }
    });
  }

  ngOnDestroy(){
    if(this.querySub) this.querySub.unsubscribe();
  }
}

