import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from './blog-post';

// maximum results per page
const perPage = 6;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  getPosts(page: Number, tag: string, category: string) : Observable<BlogPost[]>{

    tag = tag.replace(/#/g,"");

    let url = `https://bti425-assignment04.herokuapp.com/api/posts?page=${page}&perPage=${perPage}`
    let tagNotNull = `&tag=${tag}`
    let categoryNotNull = `&category=${category}`
    
    return (
      tag != null && tag != undefined ? this.http.get<BlogPost[]>(url + tagNotNull) : category != null && category != undefined ? this.http.get<BlogPost[]>(url + categoryNotNull) : this.http.get<BlogPost[]>(url)
    )
  }

  getPostById(id : Number) : Observable<BlogPost>{
    return this.http.get<BlogPost>(`https://bti425-assignment04.herokuapp.com/api/posts/${id}`)
  }

  // need to fix this
  // return an array of "Categories" in the format: {cat: string, num:number} using the path /api/categories
  getCategories() : Observable<any>{
    return this.http.get<any>('https://bti425-assignment04.herokuapp.com/api/categories')
  }

  getTags() : Observable<string[]>{
    return this.http.get<string[]>('https://bti425-assignment04.herokuapp.com/api/tags')
  }

}
