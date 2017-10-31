import {Component, OnInit} from '@angular/core';
import {GalleryService} from 'ng-gallery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Редактор фотоловушки ';
  public input2Moment: any;
  items = ['Castor fiber', 'Обыкновенный бобр'];

  images = [
    {
      src: 'assets/images/PICT0027.jpg',
      thumbnail: 'assets/images/PICT0027.jpg',
      text: 'Jun 10 2017 23:47:52, Spromise_S128',
      tags: ['Castor fiber', 'Обыкновенный бобр']
    },
    {
      src: 'assets/images/PICT0029.jpg',
      thumbnail: 'assets/images/PICT0029.jpg',
      text: 'Jun 11 2017 12:14:53, Spromise_S128',
      tags: []
    },
    {
      src: 'assets/images/PICT0039.jpg',
      thumbnail: 'assets/images/PICT0039.jpg',
      text: 'Jun 10 2017 23:47:52, Spromise_S128',
      tags: []
    },
    {
      src: 'assets/images/PICT0043.jpg',
      thumbnail: 'assets/images/PICT0043.jpg',
      text: 'Jun 13 2017  1:30:43, Spromise_S128',
      tags: ['Castor fiber', 'Обыкновенный бобр']
    },
    {
      src: 'assets/images/PICT0045.jpg',
      thumbnail: 'assets/images/PICT0045.jpg',
      text: 'Jun 13 2017  8:28:05, Spromise_S128',
      tags: []
    },
    {
      src: 'assets/images/PICT0047.jpg',
      thumbnail: 'assets/images/PICT0047.jpg',
      text: 'Jun 13 2017 12:29:32, Spromise_S128',
      tags: []
    },
    {
      src: 'assets/images/PICT0051.jpg',
      thumbnail: 'assets/images/PICT0051.jpg',
      text: 'Jun 13 2017 16:25:54, Spromise_S128',
      tags: []
    },
    {
      src: 'assets/images/PICT0053.jpg',
      thumbnail: 'assets/images/PICT0053.jpg',
      text: 'Jun 13 2017 18:10:38, Spromise_S128',
      tags: ['Castor fiber', 'Обыкновенный бобр']
    }
  ];

  onDateTimeChange(event) {

  }

  constructor(private gallery: GalleryService) {
  }

  ngOnInit() {
    this.gallery.load(this.images);
  }

  onImageClick(event) {
    console.log(event);
  }
}
