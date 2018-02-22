
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'igt-home',
  templateUrl: 'components/home/home.component.html'
})

export class HomeComponent implements OnInit {

  myProducts = [
    {
      name: 'Yess',
      description: 'description',
      image: 'https://www.bbcgoodfood.com/sites/default/files/styles/carousel_small/public/recipe/recipe-image/2017/11/orange-marmalade-glazed-roast-duck.jpg?itok=yxM4LNJi'
    },
    {
      name: 'Yess',
      description: 'description',
      image: 'https://travelwirenews-lgqvurlx.netdna-ssl.com/wp-content/uploads/2017/12/JS136915719.jpg'
    },
    {
      name: 'Yess',
      description: 'description',
      image: 'http://travel.home.sndimg.com/content/dam/images/travel/fullset/2014/07/20/32/food-paradise-102-ss-001.rend.hgtvcom.966.544.suffix/1491584380240.jpeg'
    },
    {
      name: 'Yess',
      description: 'description',
      image: 'https://travelwirenews-lgqvurlx.netdna-ssl.com/wp-content/uploads/2017/12/JS136915719.jpg'
    },
    {
      name: 'Yess',
      description: 'description',
      image: 'https://cdn.cnn.com/cnnnext/dam/assets/170308101233-shrimp-stock-super-169.jpg'
    }
];

  constructor() { }

  ngOnInit() {
  }

  openSearch() {
    console.log('openSearch');
  }

}
