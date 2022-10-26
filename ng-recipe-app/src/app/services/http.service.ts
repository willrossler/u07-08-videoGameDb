import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}
  token: any;
  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailersRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/movies`
    );
    const gameScreenshotsRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/screenshots`
    );

    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }

  registerUser(data: any) {
    return this.http.post(`${env.AUTH_URL}/api/register`, data);
  }

  loginUser(data: any) {
    return this.http.post(`${env.AUTH_URL}/api/login`, data);
  }
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${env.BASE_URL}/games`);
  }

  getRecipes() {
    return this.http.get(`${env.AUTH_URL}/recipeslist`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token.get(),
      }),
    });
  }
getFavoriteGames(data:any){
console.log(data)
  return this.http.post(`${env.AUTH_URL}/api/getFavor`, data);

}
  //todo () parameter OCH

  addRecipe() {
    return this.http.post(`${env.AUTH_URL}/recipesdetail`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token.get(),
      }),
    });
  }
  insertRecipe(data: any) {
    console.log(data)
    return this.http.post(`${env.AUTH_URL}/api/recipesdetail`, data);
  }
  //todo () parameter
  deleteRecipe() {
    return this.http.delete<any>(`${env.AUTH_URL}/reciperemove/`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token.get(),
      }),
    });
  }
}
