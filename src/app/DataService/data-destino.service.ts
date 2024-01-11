import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataDestinoService {

  private _baseUrl = 'http://api.opentripmap.com/0.1/'

  constructor() { }

  async getAutosuggest(): Promise<ViajeRemoto[]>{
    const path = 'en/places/autosuggest?format=json&name=teatro&radius=300000&lat=-36.8173&lon=-73.0373&apikey=5ae2e3f221c38a28845f05b6f9b75e642de6b2ae386eaf2dcd9a68ca&limit=200'
    const url = `${this._baseUrl}${path}` 
    try {
      const res = await fetch(url)
      const data = await res.json()
      return data
    } catch(error){
      console.error(error)
      throw error
    }
  }

  async getListado():Promise<ViajeRemoto[]>{
    const res = await this.getAutosuggest();
      return res
    }
    
  async getXid(): Promise<id>{
    const path = 'en/places/xid/W570570131?apikey=5ae2e3f221c38a28845f05b6f9b75e642de6b2ae386eaf2dcd9a68ca'
    const url = `${this._baseUrl}${path}`
    try {
      const res = await fetch(url)
      const data = await res.json()
      return data
    } catch(error){
      console.error(error)
      throw error
    }
  }

  async getIdviaje():Promise<id> {
    const res = await this.getXid();
    return res
  }
} //fin de la clase servicio

export interface ViajeRemoto {
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

export interface id {
    kinds: string; 
    sources: {
      geometry: string;
      attributes: string []
    }
    bbox: {
      lat_max: string;
      lat_min: string;
      lon_max: string;
      lon_min: string;
    }
    point: {
      lon: string;
      lat: string;
    }
    osm: string;
    otm: string;
    xid: string;
    name: string;
    wikipedia: string;
    image: string;
    wikidata: string;
    rate: string;
    info: {
      descr: string;
      image: string;
      img_width: string;
      src: string;
      src_id: string;
      img_height: string;
    }
}

