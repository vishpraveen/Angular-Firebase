import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import {CategoryModel} from '../category-model';
import { Utility } from '../utility';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  utility = new Utility();
  categories: CategoryModel[];

  constructor(private firebaseService: FirebaseService) { }
  
  ngOnInit() {
    this.setCategoryList();
  }

  setCategoryList() {
    
    var category1: CategoryModel ={categoryName:'Category 1', categoryImage:'https://material.angular.io/assets/img/examples/shiba2.jpg', categoryStatus: true};
    var category2: CategoryModel ={categoryName:'Category 2', categoryImage:'https://material.angular.io/assets/img/examples/shiba2.jpg', categoryStatus: true};
    var category3: CategoryModel ={categoryName:'Category 3', categoryImage:'https://material.angular.io/assets/img/examples/shiba2.jpg', categoryStatus: true};
    var category4: CategoryModel ={categoryName:'Category 4', categoryImage:'https://material.angular.io/assets/img/examples/shiba2.jpg', categoryStatus: false};
    this.categories = [];
    this.categories.push(category1);
    this.categories.push(category2);
    this.categories.push(category3);
    this.categories.push(category4);
  }

  changeStatus(index: number, status: boolean): void {
    this.utility.showDevLog(`Clicked on position: ${index}`);
    var category = this.categories[index];
    this.utility.showDevLog(`Status before: ${category.categoryStatus}`);
    category.categoryStatus = !status;
    this.utility.showDevLog(`Status after: ${category.categoryStatus}`);
    this.categories[index] = category;
  }
}
