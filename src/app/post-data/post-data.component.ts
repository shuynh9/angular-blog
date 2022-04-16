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

  commentName : string;
  commentText : string;

  constructor(
    private _postService : PostService,
    private route : ActivatedRoute  
  ) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params =>{
      this._postService.getPostById(params['id']).subscribe(post =>{
        this.post = post;
      })
    })
  }

  submitComment(){
    this.post.comments.push({
      author: this.commentName,
      comment: this.commentText,
      date : new Date().toLocaleDateString()
    });

    this._postService.updatePostById(this.post._id, this.post).subscribe(post => {
      this.commentName = "";
      this.commentText = "";
    });
  }

  ngOnDestroy(){
    if(this.querySub) this.querySub.unsubscribe();
  }

}
