import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../category-model';
import { Utility } from '../utility';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FirebaseService } from '../firebase.service';
import { SharedPref } from '../shared-pref';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  utility = new Utility();
  sharedPref = new SharedPref();
  title: string ='Category Details';
  categoryForm: FormControl;

  imageFile: File = null;
  
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  
  defaultImageUrl: string = 'https://material.angular.io/assets/img/examples/shiba2.jpg'

  category : CategoryModel= { categoryName:'', categoryImage: this.defaultImageUrl, categoryStatus: true };

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  getCategoryFile(event) {
    const file = event.target.files[0];
    this.imageFile = file;
    this.getServerFilePath();
  }

  getServerFilePath(){
    const filePath = this.sharedPref.TBL_CATEGORIES+'/';
    const ref = this.firebaseService.storage.ref(filePath);
    
    if(this.imageFile != null){
      const task = ref.put(this.imageFile);

       // observe percentage changes
      this.uploadPercent = task.percentageChanges();

      task.snapshotChanges().pipe(
        finalize(() => ref.getDownloadURL().subscribe(url => this.category.categoryImage = url))
      ).subscribe()
      
    }else{
      this.category.categoryImage = this.defaultImageUrl
    }
   
  }

  addCatogory(categoryForm: NgForm){
    this.category.categoryName = categoryForm.value.categoryName;
    this.utility.showDevLog(JSON.stringify(this.category));
    this.firebaseService.saveCategory(this.category);
  }

}
