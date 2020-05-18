export class User {
  constructor(public  id: number,
              public  nom: string,
              public  prenom: string,
              public  cin: string,
              public  password: string,
              public  email: string,
              public  enabled: boolean,
              public  role: string){}

}
