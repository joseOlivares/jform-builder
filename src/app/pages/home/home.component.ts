import { Component} from '@angular/core';
import { FormlyConfigModule } from '../../core/modules/formly.module';//modulo que creamos para la configuración de formly
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DragDropModule,CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-home',
  imports: [FormlyConfigModule, DragDropModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  tasks = [
    { id: 1, name: 'Design UI' },
    { id: 2, name: 'Setup Backend' },
    { id: 3, name: 'Test Features' },
  ];

  form = new FormGroup({});
  model = { name: '', description: '' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Task Name',
        placeholder: 'Enter task name',
        required: true,
      },
    },
    {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        label: 'Task Description',
        placeholder: 'Enter task description',
      },
    },
  ];

  onDrop(event: CdkDragDrop<any>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  onSubmit() {
    if (this.form.valid) {
      this.tasks.push({ id: this.tasks.length + 1, ...this.model });
      this.form.reset();
    }
  }

}
