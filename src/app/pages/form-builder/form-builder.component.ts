import { Component } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
  DragDropModule
} from '@angular/cdk/drag-drop'
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyConfigModule } from '../../core/modules/formly.module';//modulo que creamos para la configuración de formly

import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-builder',
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, FormlyConfigModule, DragDropModule, MatIconModule,
    CommonModule
  ],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss'
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

  fieldSecuencialNumber = 0;//leva el control del id de los fields

  drop(event: CdkDragDrop<any>) {
    this.fieldSecuencialNumber++;
    if (event.previousContainer !== event.container) {
      const itemToCopy = event.previousContainer.data[event.previousIndex];
      this.selectedFields.push({ ...itemToCopy, key: `field_${this.fieldSecuencialNumber}` }); //insertamos una copia del elemento seleccionado
      //actualizamos el model
      this.model={...this.model, [`field_${this.fieldSecuencialNumber}`]: ''};

    }else{
      moveItemInArray(this.selectedFields, event.previousIndex, event.currentIndex);
    }

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
