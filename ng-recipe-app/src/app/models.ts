import { DeclarationListEmitMode } from "@angular/compiler";

export interface Game {
  id: string;
  background_image: string;
  name: string;
  released: string;
  metacritic_url: string;
  website: string;
  description: string;
  metacritic: number;
  rating: number;
  genres: Array<Genre>;
  parent_platforms: Array<ParentPlatform>;
  publishers: Array<Publishers>;
  ratings: Array<Rating>;
  screenshots: Array<Screenshots>;
  trailers: Array<Trailer>;
}
export interface ListGame{
  id : number;
  user_id:number;
  title:string;
  img:string;
  game_id:number;
  created_at:any;
  updated_at:any;
}

export interface APIResponse<T> {
  results: Array<T>;
}

export interface FormGroup {
  name: string;
  value: any;
}

interface Genre {
  name: string;
}

interface ParentPlatform {
  platform: {
    name: string;
  };
}

interface Publishers {
  name: string;
}

interface Rating {
  id: number;
  count: number;
  title: string;
}

interface Screenshots {
  image: string;
}

interface Trailer {
  data: {
    max: string;
  };
}
