import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-images-aws',
  templateUrl: './images-aws.component.html',
  styleUrls: ['./images-aws.component.scss']
})
export class ImagesAwsComponent {
  selectedFile: File | null = null;
  originalImages: string[] = [];
  resizedImages: string[] = [];

  constructor(private http: HttpClient){}

  ngOnInit() {
    this.fetchImages();
  }

  fetchImages() {
    this.http.get<{originalImages: string[], resizedImages: string[] }>('http://finalcloudalb-333442050.us-east-1.elb.amazonaws.com/images')
      .subscribe({
        next: (response) => {
          this.originalImages = response.originalImages;
          this.resizedImages = response.resizedImages;
        },
        error: (error) => {
          console.error('Error fetching images: ', error);
        }
      });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      this.http.post('http://finalcloudalb-333442050.us-east-1.elb.amazonaws.com/upload-image', formData)
        .subscribe({
          next: () => {
            this.fetchImages();
          },
          error: (error) => {
            console.error('Error uploading image: ', error);
          }
        });
    }
  }
}
