import { Injectable } from '@angular/core';
import { image } from 'ionicons/icons';

@Injectable({
  providedIn: 'root'
})
export class DataDestinoService {

  private _baseUrl = 'http://api.opentripmap.com/0.1/'
  destinos: Destinos[] = []
  misDestinos: misDestinos[] = []

  constructor() { }

  apiKey = '5ae2e3f221c38a28845f05b63f0f87ee913de61229023f5e39478810';
  name = "teatro";


  // crear funcion eliminar de mis destinos, modificar foto, añadir a mis destino, modificar precio
  async getAutosuggest(): Promise<destinoRemoto[]> {
    const path =
      'en/places/autosuggest?format=json&name=' +
      this.name +
      '&radius=300000&lat=-36.8173&lon=-73.0373&apikey=' +
      this.apiKey +
      '&limit=3'
    const url = `${this._baseUrl}${path}`
    try {
      const res = await fetch(url)
      const data = await res.json()
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async getRegistroDetalle(xid: string): Promise<Destinos> {
    const res = await this.getXid(xid);
    return {
      xid: res.xid,
      name: res.name,
      country: res.address.country,
      imageurl:
        'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2023/02/google-maps-2961754.jpg?tf=2048x',
    };
  }

  async getRegistro(buscar:string): Promise<Destinos[]> {
    this.destinos = []
    if (buscar && buscar.trim() !== ""){
      this.name = buscar;
    }
    const res = await this.getAutosuggest();
    res.forEach(async (element) => {
      this.destinos.push(await this.getRegistroDetalle(element.xid));
    })
    return this.destinos;
  }

  async getXid(xid: string): Promise<destinoDetalle> {
    const path = 'en/places/xid/' +
      xid + '?apikey=' +
      this.apiKey;
    const url = `${this._baseUrl}${path}`
    try {
      const res = await fetch(url)
      const data = await res.json()
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  
  agregaMisDestinos(midestino: misDestinos) {
    this.misDestinos.push(midestino);
  }

  traeMisDestinos() {
    return this.misDestinos;
  }

  actualizaMisDestinos(valor: number, xid: string | undefined) {
    this.misDestinos.forEach((objeto) => {
      if (objeto.xid === xid) {
        objeto.precio = valor;
      }
    })
  }
  
  actualizaFotos(image:string | undefined, xid: string | undefined) {
    this.misDestinos.forEach((objeto) => {
      if (objeto.xid === xid) {
        objeto.imageurl = image;
      }
    })
  }

  borraMisDestinos(xid?: string) {
    const index = this.misDestinos.findIndex((objeto) => objeto.xid === xid);
    if (index !== -1) {
      this.misDestinos.splice(index, 1);
    }
  }
}

//fin de la clase servicio

export interface Destinos {
  xid: string;
  name: string;
  country: string;
  imageurl: string;
}

export interface misDestinos {
  xid?: string;
  name?: string;
  country?: string;
  imageurl?: string;
  precio: number;
}

// APIs
export interface destinoRemoto {
  xid: string;
  name: string;
  highlighted_name: string;
  dist: string;
  rate: string;
  osm: string;
  wikidata: string;
  kinds: string;
  point: {
    lon: string;
    lat: string;
  }
}

export interface destinoDetalle {
  xid: string;
  name: string;
  address: {
    city: string;
    road: string;
    state: string;
    county: string;
    suburb: string;
    country: string;
    postcode: string;
    country_code: string;
    neighbourhood: string;
  };
  rate: string;
  osm: string;
  bbox: {
    lon_min: string;
    lon_max: string;
    lat_min: string;
    lat_max: string;
  };
  wikidata: string;
  kinds: string;
  url: string;
  sources: {
    geometry: string;
    attributes: string[];
  };
  otm: string;
  wikipedia: string;
  image: string;
  preview: {
    source: string;
    height: string;
    width: string;
  };
  wikipedia_extracts: {
    title: string;
  };
  point: {
    lon: string;
    lat: string;
  };
}
