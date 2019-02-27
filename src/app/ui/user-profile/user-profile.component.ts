import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestDialogComponent } from '../dialog/add-quest-dialog/add-quest-dialog.component';
import { SeasonService } from '../../core/season.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  private player: User;
  private userServiceSub: any;
  private routeSub: any;
  private user: User;
  private userSub: any;
  private season: Season;
  private seasonSub: any;

  constructor(private auth: AuthService, 
    private route: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog,
    private seasonService: SeasonService) { }

  logout() {
    this.auth.signOut();
  }

  ngOnInit() {
    //get the logged-in user data
    this.userSub = this.auth.user.subscribe((user: User) => {
      this.user = user;

      //check if the logged-in user is a team lead 
      if(this.user.isLead) {
        //get the player id from the path
        this.routeSub = this.route.params.subscribe(param => {
          var playerId = param['playerId'];

          //this will tell us if the logged-in user is viewing his own data, or is viewing someone else's
          if(playerId) {
            //get the details of the player being viewed by the logged-in user
            this.userServiceSub = this.userService.getUser(playerId).subscribe((player: User) => {
              this.player = player;

              this.seasonSub = this.seasonService.getEnabledSeason().subscribe((season: Season) => {
                this.season = season;
              });
            });
          }
        });
      }
    });
  }

  openDialog() {
    this.dialog.open(AddQuestDialogComponent, {
      data: {
        user: this.player,
        season: this.season
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    if(this.user.isLead && this.player) {
      this.routeSub.unsubscribe();
      this.userServiceSub.unsubscribe();
    }
  }
}