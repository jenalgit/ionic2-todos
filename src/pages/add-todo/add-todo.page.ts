import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Todo } from '../../core/models/todo.model';

import { TodosService } from '../../core/services/todos.service';

@Component({
  selector: 'page-add-todo',
  templateUrl: 'add-todo.page.html'
})
/**
 * Controller for AddTodoPage component
 * @name AddTodoPage
 * @author Erik Johnson <erik@erikaugust.com>
 */
export class AddTodoPage {

  public todo : FormGroup;

  constructor(private formBuilder: FormBuilder, private todosService: TodosService, public view: ViewController) {

    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });

  }

  /**
   * Creates new Todo, adds via service, and dismisses view
   * @name saveItem
   */
  public addTodo(): void {
    let newItem = new Todo(this.todo.value.title, this.todo.value.description);
    this.todosService.addTodo(newItem);

    this.view.dismiss();
  }

  /**
   * Dismisses view
   * @name close
   */
  public close(): void {
    this.view.dismiss();
  }

}
