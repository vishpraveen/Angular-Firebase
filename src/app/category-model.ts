export class CategoryModel {
    categoryName: string='';
    categoryImage: string = 'https://material.angular.io/assets/img/examples/shiba2.jpg';
    categoryStatus: boolean = true;

    constructor(categoryName: string, categoryImage: string, categoryStatus: boolean){
        this.categoryName = categoryName;
        this.categoryImage = categoryImage;
        this.categoryStatus = categoryStatus;
    }
}
