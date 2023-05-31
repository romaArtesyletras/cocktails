import { Component } from '@angular/core';
import { Drink } from 'src/app/core/models/drink';
import { CocktailService } from 'src/app/core/services/cocktail.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  inputSearch!: string

  findItCocktails!: Drink[]
  
  constructor(
    private cocktailService: CocktailService
  ){}

  findCocktail(name: string){
    this.cocktailService.getCocktailsName(name).subscribe({
      next: (res: any) => {
        this.findItCocktails = res.drinks
        console.log(this.findItCocktails)
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
}
