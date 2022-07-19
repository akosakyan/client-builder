import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-client-create-success-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './client-create-success-page.component.html',
  styleUrls: ['./client-create-success-page.component.scss']
})
export class ClientCreateSuccessPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
