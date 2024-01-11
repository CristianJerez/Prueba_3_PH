import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataDestinoService, ViajeRemoto } from '../DataService/data-destino.service';
import { addIcons } from 'ionicons';
import { airplaneOutline, cameraOutline, trashOutline} from 'ionicons/icons'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, FormsModule ],
})
export class HomePage implements OnInit{

  viajes:ViajeRemoto[] = []
  
  constructor(    
    private dataRepository: DataDestinoService) {addIcons({airplaneOutline, cameraOutline, trashOutline})}

  async ngOnInit() {
    this.viajes = await this.dataRepository.getListado()
  }

  cambiarPrecio(){

  }

  sacarFoto(){

  }

  eliminaDestino(){

  }

}


