import { Component, ElementRef, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef, EventEmitter, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {  } from '@angular/material/button';

import { fromEvent, Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  imports: [
    MatButtonModule,
    MatIconModule,
  ]
})
export class FileUploaderComponent implements OnInit {
  @Input() set imageSrc(imageSrc: string) {
    if (imageSrc) {
      this.renderImageFromSrc(imageSrc);
    }
  }

  @Input() buttonText: string = 'Upload File';

  @Output() imageFileChange = new EventEmitter<File | null>();

  allowedFormats: string[] = ['.jpg', '.jpeg', '.png'];

  selectedFile: File | null = null;

  errors: ImageUploadError[] = [];

  subscription = new Subscription();

  @ViewChild('fileInput', { static: true, read: ElementRef })
  fileInputRef!: ElementRef<HTMLInputElement>;

  @ViewChild('triggerButton', { static: true, read: ElementRef })
  triggerButtonRef!: ElementRef<HTMLInputElement>;

  @ViewChild('imageSlot', { static: true, read: ViewContainerRef })
  imageSlot!: ViewContainerRef;

  @ViewChild('imageTmp', { static: true, read: TemplateRef })
  imageTmpRef!: TemplateRef<{ context: ImageTemplateContext }>;

  constructor() {}

  ngOnInit() {
    const triggerBtn = this.triggerButtonRef.nativeElement;
    const fileInput = this.fileInputRef.nativeElement;

    this.subscription.add(
      fromEvent(triggerBtn, 'click').subscribe((event: Event) => {
        event.preventDefault();
        fileInput.click();
      })
    );

    this.subscription.add(
      fromEvent(fileInput, 'change').subscribe((event: Event) => {
        const file: File = (event.target as HTMLInputElement).files?.item(0) as File;

        const errors = this.validate(file);

        if (errors.length) {
          this.renderErrors(errors as ImageUploadError[]);
        } else {
          this.clearErrors();
          this.imageFileChange.emit(file);
          this.renderImageFromFile(file);
        }
      })
    );
  }

  onRemoveImage() {
    this.imageSlot.clear();
    this.imageFileChange.next(null);
  }

  validate(file: File): Array<ImageUploadError | null> | [] {
    return [
      this.validateSize(file),
      this.validateExt(file),
      this.validateProportions(file),
    ].filter((error) => error !== null);
  }

  renderErrors(errors: ImageUploadError[] | []) {
    // console.log(errors);
    this.errors = errors;
  }

  clearErrors() {
    this.errors = [];
  }

  renderImageFromSrc(imageSrc: string) {
    this.imageSlot.clear();
    this.imageSlot.createEmbeddedView(this.imageTmpRef, {
      context: {
        src: imageSrc,
        alt: 'oopppsss',
        height: 1000,
        width: 1000,
      },
    });
  }

  renderImageFromFile(file: File) {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSlot.clear();
        this.imageSlot.createEmbeddedView(this.imageTmpRef, {
          context: {
            src: e.target?.result as string,
            alt: 'oopppsss',
            height: 1000,
            width: 1000,
          },
        });
      };

      reader.readAsDataURL(file);
    } catch (e) {
      alert('Something went wrong with image rendering, maybe its ok :)');
    }
  }

  // validation fn
  validateSize(file: File): ImageUploadError | null {
    return null;
  }

  // validation fn
  validateExt(file: File): ImageUploadError | null {
    return null;
  }

  // validation fn
  validateProportions(file: File): ImageUploadError | null {
    return null;
  }
}

interface ImageUploadError {
  errorName: string;
  errorMsg: string;
}

interface ImageTemplateContext {
  src: string;
  alt: string;
  width: number | null;
  height: number | null;
}
