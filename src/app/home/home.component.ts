import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import * as mobilenet from '@tensorflow-models/mobilenet';

import * as tf from '@tensorflow/tfjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  model: any;
  loading!: boolean;
  imgSrc: any;

  @ViewChild('img') img: any

  constructor() {
    tf.setBackend('cpu');
  }

  async ngOnInit() {
    this.loading = true;
    this.model = await mobilenet.load();
    this.loading = false;

    console.log(this.model.model.modelUrl)


  }


  predictions: any = []
  async fileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (res: any) => {
        this.imgSrc = res.target.result;

        setTimeout(async () => {
          const imageElement = this.img.nativeElement;

          if (this.model) {
            this.predictions = await this.model.classify(imageElement);
            console.log(this.predictions);
          } else {
            console.error('Model is undefined. Ensure it is loaded and initialized.');
          }
        });
      };
    }
  }

}
