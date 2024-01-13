import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { DataDestinoService, Destinos, misDestinos, destinoDetalle, destinoRemoto } from 'src/app/DataService/data-destino.service';
import { addIcons } from 'ionicons';
import { airplaneOutline, cameraOutline, trashOutline, searchCircle, addCircleOutline } from 'ionicons/icons';
import { Camera, Photo, CameraResultType } from '@capacitor/camera';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.component.html',
  styleUrls: ['./destinos.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, NgFor],

})
export class DestinosComponent  implements OnInit {

  destinos: Destinos[] = [];
  misDestinos: misDestinos[] = [];

  xidSeleccionado: string | undefined = ""; 
  modalLugaresAbierto: boolean = false; 
  toastMensaje: string = ""; 
  modalinput: any; 
  buscar: string = "";

  constructor(private servicio: DataDestinoService, private toastController: ToastController) { 
    addIcons({ airplaneOutline, cameraOutline, trashOutline, searchCircle, addCircleOutline }); 
  }
  
  ngOnInit() {
    this.ionViewWillEnter();
  }

  addnewPlace(xid: string) {
    const lugar = this.destinos.find((x) => x.xid === xid);

    this.servicio.agregaMisDestinos({
      xid: lugar?.xid,
      name: lugar?.name,
      country: lugar?.country,
      imageurl: lugar?.imageurl,
      precio: 0
    });
    //this.ionViewWillEnter();
    this.notificarGuardado();
  }

  abrirModalLugares(xid?: string) {
    this.modalLugaresAbierto = true;
    this.xidSeleccionado = xid;
  }

  cancel() {
    this.modalLugaresAbierto = false;
  }

  confirm() {
    this.servicio.actualizaMisDestinos(this.modalinput, this.xidSeleccionado);
    this.modalLugaresAbierto = false;
    //this.ionViewWillEnter();
  }

  async ionViewWillEnter() {
    this.misDestinos = this.servicio.traeMisDestinos();
    this.destinos = await this.servicio.getRegistro(this.buscar);
  }

  async buscarLugar(evento:any){
    this.buscar = evento.target.value;
    this.destinos = await this.servicio.getRegistro(this.buscar);
  }

  eliminarLugar(xid?: string) {
    this.servicio.borraMisDestinos(xid);
    this.notificarElimincion();
  }

  foto: Photo | null = null;
  async sacarFoto(id:string | undefined) {
    this.foto = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      saveToGallery: true,
      correctOrientation: true,
    });
    this.servicio.actualizaFotos(this.foto.webPath, id)
  }

  notificarGuardado(){
    const mensaje:string = "¡Su destino se ha guardado correctamente!"
    this.mostrarMensaje(mensaje)
  }

  async mostrarMensaje(mensaje:string){
    const toast = await this.toastController.create({message:mensaje, duration:5000, position: 'bottom'})
    await toast.present()
  }

  notificarElimincion(){
    const mensaje:string = "¡Su destino se ha eliminado correctamente!"
    this.mostrarMensaje(mensaje)
  }

}