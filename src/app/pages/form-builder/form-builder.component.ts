import { ChangeDetectorRef, Component } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
  DragDropModule,
  CdkDragExit,
  CdkDragPlaceholder,
  copyArrayItem
} from '@angular/cdk/drag-drop'
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyConfigModule } from '../../core/modules/formly.module';//modulo que creamos para la configuración de formly

import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-builder',
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, FormlyConfigModule, DragDropModule, MatIconModule,
    CommonModule, CdkDragPlaceholder
  ],
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent {


  form = new FormGroup({});
  model : any = {};

  //Listado de elementos de formulario disponibles
  availableFields: FormlyFieldConfig[] = [
    { name: 'Text Input', type: 'input', props: { label: 'Text Input', placeholder: 'Enter text', icon: 'short_text' } },
    { name: 'Email Input', type: 'input', props: { label: 'Email Input', placeholder: 'Enter email', type: 'email', icon: 'email' } },
    { name: 'Checkbox', type: 'checkbox', props: { label: 'Checkbox', icon: 'check_box' } },
    { name: 'Select', type: 'select', props: { label: 'Select', options: [{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }], icon: 'arrow_drop_down' } },
  ];

  selectedFields: FormlyFieldConfig[] = [];

  fieldSecuencialNumber = 1;//leva el control del id de los fields


  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  onTargetDrop(event: CdkDragDrop<any>) {

    if (event.previousContainer === event.container) {//si se mueve dentro del mismo contenedor
      moveItemInArray(this.selectedFields, event.previousIndex, event.currentIndex);
    }else{

      // Create a copy of the item being dragged
      const itemToCopy = { ...event.previousContainer.data[event.previousIndex] };
      // Add the unique key property
      itemToCopy.key = `field_${this.fieldSecuencialNumber}`;

      // Increment the sequence number for the next item
      this.fieldSecuencialNumber++;

      // Add the item to the target array
      copyArrayItem(
        [itemToCopy], // Use the copied item with the new key
        event.container.data,
        0,
        event.currentIndex
      );

      console.log('Previous conatiner data:', event.previousContainer.data);
      console.log('Current conatiner data:', event.container.data);
      console.log('Previous item:', event.previousContainer.data[event.previousIndex]);
      console.log('Copied item:', event.container.data[event.currentIndex]);
      console.log('Target Index:', event.currentIndex);
      console.log('Previous Index:', event.previousIndex);
      console.log('Selected Fields:', this.selectedFields);
      console.log('Current conatiner data:', event.container.data);

      //actualizamos el model
      this.model={...this.model, [`field_${this.fieldSecuencialNumber}`]: ''};

      this.changeDetectorRef.detectChanges();//para prevenir error al actualizar model
    }

    console.log('Model:', this.model);
    //Este bloque mueve el elemnto de un lugar a otro
    /*
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }*/
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('Dropped', event);
  }


  onSubmit() {
    console.log(this.form.value);
  }

  removeField(index: number) {
    this.selectedFields.splice(index, 1); // Removes the item from the array
    delete this.model[`field_${index}`];

        // Refresh the model to reflect the current state of selectedFields
        this.model = {};
        this.selectedFields.forEach((field, idx) => {
            this.model[`field_${idx}`] = ''; // Initialize each field in the model
        });

  }


}
