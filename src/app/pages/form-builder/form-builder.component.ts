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
import { FormlyConfigModule } from '../../core/modules/formly.module';//


@Component({
  selector: 'app-form-builder',
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, FormlyConfigModule, DragDropModule],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss'
})
export class FormBuilderComponent {


  



  form = new FormGroup({});
  model = { name: '', description: '' };
  availableFields: FormlyFieldConfig[] = [
    { name: 'Text Input', type: 'input', templateOptions: { label: 'Text Input', placeholder: 'Enter text' } },
    { name: 'Email Input', type: 'input', templateOptions: { label: 'Email Input', placeholder: 'Enter email', type: 'email' } },
    { name: 'Checkbox', type: 'checkbox', templateOptions: { label: 'Checkbox' } },
    { name: 'Select', type: 'select', templateOptions: { label: 'Select', options: [{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }] } },
  ];

  selectedFields: FormlyFieldConfig[] = [];


  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer !== event.container) {
      const itemToCopy = event.previousContainer.data[event.previousIndex];
      this.selectedFields.push({ ...itemToCopy }); //insertamos una copia del elemento seleccionado
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



}
