import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BlogPost } from '../blog-post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  blogPost : BlogPost;
  tags : string;

  constructor(
    private _postService : PostService,
    private _activeRoute : ActivatedRoute,
    private route : Router    
  ) { }

  ngOnInit(): void {
    let id = this._activeRoute.snapshot.params['id'];
    this._postService.getPostById(id).subscribe(post => {
      this.blogPost = post;
      this.tags = this.blogPost.tags.toString();
    })
  }

  formSubmit(form : NgForm){
    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim()); // convert string to an array and remove whitespace

    this.blogPost.title = form.value.title;
    this.blogPost.featuredImage = form.value.featuredImage;
    this.blogPost.post = form.value.post;
    this.blogPost.category = form.value.category;

    this._postService.updatePostById(this.blogPost._id, this.blogPost).subscribe(() => {
      this.route.navigate(['/admin']);
    })
  }

  deletePost(){
    this._postService.deletePostById(this.blogPost._id).subscribe(() => {
      this.route.navigate(['/admin']);
    })
  }

}
