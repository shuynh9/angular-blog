import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../blog-post';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit {

  querySub : any;
  post: BlogPost;

  constructor(
    private _postService : PostService,
    private route : ActivatedRoute  
  ) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params =>{
      //TODO: Get post by Id params['id'] and store the result in this.post
      this._postService.getPostById(params['id']).subscribe(po =>{
        this.post = po;
      })
     })
  }

  ngOnDestroy(){
    if(this.querySub) this.querySub.unsubscribe();
  }

}
