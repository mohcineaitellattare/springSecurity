import {Injectable} from '@angular/core';
import {User} from '../model/user.model';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public connectedUser:User;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) {
  }
  public statue: string  ;
  public AuthenticatedUser: User ;
  public userToken: any;
  public isAuth:string;
  public url = 'http://localhost:3333/api/user/login/';

  public login(user:User) {
    this.http.post<any>(this.url, user).subscribe(
      data => {
        localStorage.setItem('currentUser', data);
        this.AuthenticatedUser = data.user;
        this.userToken = data.token;
      this.isAuth=data.token;
      this.statue="déconnexion";

        console.log(this.AuthenticatedUser);
        console.log(this.userToken);
        this.connectedUser=data.user;
        if (data.user.role == 'COMPTABLE'){
          this.router.navigate(["commande"])
        }
        if (data.user.role == 'DOYEN') {
          this.router.navigate(["besoinCommande"])
        }
        if (data.user.role == 'CHEF') {
          this.router.navigate(["besoinCommande"])
        }
        // this.router.navigate(["besoinCommande"])
      }
    );
  }
public clear(){
    this.router.navigate([""]);
    localStorage.clear();
    this.isAuth = null;
    this.statue="Se Connecter";
}
}
