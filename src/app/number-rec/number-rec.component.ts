import { Component, OnInit, ViewChild } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { loadLayersModel } from '@tensorflow/tfjs-layers';

@Component({
  selector: 'app-number-rec',
  templateUrl: './number-rec.component.html',
  styleUrls: ['./number-rec.component.css']
})
export class NumberRecComponent implements OnInit {

  model: tf.LayersModel;
  imgSrc: string;
  predictions: any = [];

  @ViewChild('img') img: any


  constructor() {
    tf.setBackend('webgl');
  }

  async ngOnInit() {
    // Load the pre-trained MNIST model
    this.model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mnist_v1/model.json');
  }

  async fileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = async (res: any) => {
        this.imgSrc = res.target.result;

        setTimeout(async () => {
          const imageElement = this.img.nativeElement;

          if (this.model) {
            // Preprocess the image and make predictions
            const predictions = await this.predictDigits(imageElement);
            console.log(predictions);
          } else {
            console.error('Model is undefined. Ensure it is loaded and initialized.');
          }
        });
      };
    }
  }

  async predictDigits(imageElement: HTMLImageElement) {
    // Preprocess the image to fit the input shape of the model
    const tensor = tf.browser.fromPixels(imageElement)
      .resizeNearestNeighbor([28, 28]) // Resize to MNIST input size
      .mean(2) // Convert to grayscale
      .toFloat()
      .div(255.0) // Normalize pixel values to [0, 1]
      .expandDims(0); // Add batch dimension

    // Make predictions
    const predictions = this.model.predict(tensor) as tf.Tensor;

    // Convert predictions tensor to array
    const predictionsArray = Array.from(predictions.dataSync());

    return predictionsArray;
  }
}
