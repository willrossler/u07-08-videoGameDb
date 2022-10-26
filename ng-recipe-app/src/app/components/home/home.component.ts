import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game ,ListGame} from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';
import { Sort } from './sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort?: Sort[]=[
    { id: 'name', name: 'Name'},
    { id: "released", name: 'Released'},
    { id: 'added', name: 'Added'},
    { id: "created", name: 'Created'},
    { id: "rating", name: 'Rating'},
    { id: "metacritic", name: 'Metacritic'}
  ];

  public games?: Array<Game>;
  public listgames?: Array<ListGame>;
  private routeSub?: Subscription;
  private gameSub?: Subscription;
  public selectedsort?: string;
  public sortfilter?: string;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('name', params['game-search']);
      } else {
        this.searchGames('metanamecrit');
      }
    });
    this.httpService.getFavoriteGames({id:localStorage.getItem('userId')}).subscribe((res:any) => {
    this.listgames=res;
    console.log(this.listgames);
    });
  }
  onSortChange() {
    console.log(this.selectedsort)
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if(this.selectedsort==null){
        this.sortfilter='metanamecrit'
      }else{
        this.sortfilter=this.selectedsort
      }
        this.searchGames(this.sortfilter);

    });
  }


  searchGames(sort: string, search?: string): void {
    this.gameSub = this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(this.games);
      });
  }

  openGameDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
