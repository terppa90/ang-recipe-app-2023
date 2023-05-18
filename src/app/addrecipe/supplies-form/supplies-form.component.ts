import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-supplies-form',
  templateUrl: './supplies-form.component.html',
  styleUrls: ['./supplies-form.component.css'],
})
export class SuppliesFormComponent {
  @Input()
  public childForm: UntypedFormGroup;
  // Taulukon index
  @Input()
  public arrayIndex: number;
  // Ainesosien määrä kokonaisuudessaan
  @Input()
  public totalSupplies: number;
  // Ainesosan poisto Eventti
  @Output()
  public deleteSupplyEvent: EventEmitter<number> = new EventEmitter<number>();
  // Käytetään get:iä että saadaan selkeämpää koodia templaattiin
  get nameField(): UntypedFormControl {
    return this.childForm?.get('name') as UntypedFormControl;
  }

  get quantityField(): UntypedFormControl {
    return this.childForm?.get('quantity') as UntypedFormControl;
  }

  constructor() {}
  // Reseptin ainesosan lisäysmetodi
  static addRecipeSupplyItem(): UntypedFormGroup {
    return new UntypedFormGroup({
      name: new UntypedFormControl('', Validators.required),
      quantity: new UntypedFormControl('', Validators.required),
    });
  }
  // Reseptin ainesosan poistometodi
  public deleteSupply(index: number): void {
    this.deleteSupplyEvent.next(index);
  }
}
