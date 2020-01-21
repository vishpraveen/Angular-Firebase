import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../category-model';
import { Utility } from '../utility';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FirebaseService } from '../firebase.service';
import { SharedPref } from '../shared-pref';
import { FormControl } from '@angular/forms';

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
    
  }

  getServerFilePath(){
    const filePath = this.sharedPref.TBL_CATEGORIES+'/';
    const ref = this.firebaseService.storage.ref(filePath);
    
    if(this.imageFile != null){
      const task = ref.put(this.imageFile);

      task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = ref.getDownloadURL())
      ).subscribe()
      
      this.setImageUrl();
    }else{
      this.category.categoryImage = this.defaultImageUrl
    }
   
  }

  setImageUrl(){
    this.downloadURL.subscribe(url => {
      if(url.length){
        this.category.categoryImage = url
        this.utility.showDevLog(`Category Image set: ${this.category.categoryImage}`);
      }
    })
  }

  addCatogory(){
    this.utility.showDevLog(JSON.stringify(this.categoryForm))
  }

}
