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

  showIngredients!: boolean;
  
  constructor(
    private cocktailService: CocktailService
  ){}

  findCocktail(name: string, e:any){
    if (/^Key[A-Z]$/.test(e.code)) { // just letters
      this.cocktailService.getCocktailsName(name).subscribe({
        next: (res: any) => {
          this.findItCocktails = res.drinks
          this.findItCocktails.map((c) => {
              c.animatedClass = 'bounce-in-top';
          })
          console.log(this.findItCocktails)
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    } else if (name == "") {
      this.findItCocktails = []
    }
  }

  async toggleIngredients(idDrink:string, index: number) {
    await this.getIngredients()
    this.findItCocktails[index].showIngredients = !this.findItCocktails[index].showIngredients;

    // console.log("findItCocktails > ",this.findItCocktails);
  }

  async getIngredients() {
    var ingredientsSeparated = this.findItCocktails.map((c:any) => {
      let ingredients:any = [];
      
      for (let e = 0; e < 15; e++) {
        const ingredientIndex = e + 1;
        if((c['strMeasure' + ingredientIndex]) && c['strIngredient' + ingredientIndex]) {
          ingredients.push(c['strMeasure' + ingredientIndex] + 'of ' + c['strIngredient' + ingredientIndex]);
        }
      }
      c.ingredients = ingredients

      return ingredients;
    })
    
    return ingredientsSeparated
  }
}
