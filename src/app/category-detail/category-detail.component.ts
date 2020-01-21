import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../category-model';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  title: string ='Category Details';
  
  defaultImageUrl: string = 'https://material.angular.io/assets/img/examples/shiba2.jpg'

  category : CategoryModel= { categoryName:'', categoryImage: this.defaultImageUrl, categoryStatus: true };

  constructor() { }

  ngOnInit() {
  }

}
