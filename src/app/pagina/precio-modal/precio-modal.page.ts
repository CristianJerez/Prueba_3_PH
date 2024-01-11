import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-precio-modal',
  templateUrl: './precio-modal.page.html',
  styleUrls: ['./precio-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PrecioModalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
