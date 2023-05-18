import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { FormService } from '../form.service';

import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { SuppliesFormComponent } from './supplies-form/supplies-form.component';

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrls: ['./addrecipe.component.css'],
})
export class AddrecipeComponent implements OnInit {
  public myForm!: UntypedFormGroup;

  get suppliesArray(): UntypedFormArray {
    return this.myForm?.get('supplies') as UntypedFormArray;
  }

  constructor(
    private fb: UntypedFormBuilder,
    private formService: FormService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Käytetään get:iä että saadaan templaattiin selkeempää koodia

  get supplies() {
    return this.myForm.get('supplies') as UntypedFormArray;
  }

  addSupplies(): UntypedFormGroup {
    return new UntypedFormGroup({
      name: new UntypedFormControl(),
      quantity: new UntypedFormControl(),
    });
  }

  // "Generoidaan" uusi lomake
  ngOnInit(): void {
    this.generateMyForm();
  }

  public generateMyForm(): void {
    this.myForm = new UntypedFormGroup({
      id: new UntypedFormControl(''),
      name: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      author: new UntypedFormControl('', Validators.required),
      supplies: new UntypedFormArray([]),
      recipe: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
    });
  }

  // Lisätään uusi ainesosa/raaka-aine
  public addRecipeSupplyItem(): void {
    this.suppliesArray.push(SuppliesFormComponent.addRecipeSupplyItem());
  }
  // Poistetaan ainesosa/raaka-aine
  public deleteSupply(index: number): void {
    this.suppliesArray.removeAt(index);
  }

  public submitRecipeForm(): void {}

  // Lomakkeen lähetysmetodi
  // public submitRecipeForm(): void {
  //   console.log(this.myForm.value);
  //   SuppliesFormComponent.addRecipeSupplyItem();
  //   this.formService.FormAddRecipe(this.myForm.value).subscribe(
  //     (response) => {
  //       console.log('success', response), this.router.navigate(['/recipes']);
  //     },
  //     (error) => console.error('Error', error)
  //   );
  // }
}
