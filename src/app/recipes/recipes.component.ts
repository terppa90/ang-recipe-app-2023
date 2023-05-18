import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  constructor(private rs: RecipeService, private router: Router) {}

  ngOnInit() {
    this.getRecipes();
  }

  // slicella määritetään kuinka monta reseptiä näkyy Etusivulla. Nyt näkyy 6 kpl.
  getRecipes(): void {
    this.rs.getRecipes().subscribe((recipes) => (this.recipes = recipes));
  }

  // poistaa reseptin
  delete(recipe: Recipe): void {
    this.recipes = this.recipes.filter((h) => h !== recipe);
    this.rs.delRecipe(String(recipe.id)).subscribe();
    this.router.navigate(['/recipes']);
  }
}
