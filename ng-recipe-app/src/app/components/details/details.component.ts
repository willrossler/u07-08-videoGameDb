import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  public detailForm!:FormGroup;
  gameId!: string;
  game!: Game;
  routeSub: Subscription = new Subscription();
  gameSub: Subscription = new Subscription();
  data: any;
  myGames?: string[];
  test?: string;
  message: any;
  allGames?: any[];
  label: any;
  img: any;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private router: Router

  ) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {

    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {

      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });
    this.detailForm = this.formBuilder.group({
      game_id: [''],
      img: [''],
      title:[''],
      user_id:['']
    });   

  }

  getGameDetails(id: string): void {
    this.gameSub = this.httpService
      .getGameDetails(id)
      .subscribe((gameResp: Game) => {
        this.game = gameResp;
        this.img=this.game.background_image
      });
  }

  submit() {
    this.detailForm = this.formBuilder.group({
      game_id: [this.gameId],
      img: [this.img],
      title:[this.game.name],
      user_id:[localStorage.getItem('userId')]
    });
    this.httpService.insertRecipe(this.detailForm.value).subscribe((res:any) => {
      alert(res.message)
      console.log(res)
      this.router.navigate(['/']);

    });
  }
}
