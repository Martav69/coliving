import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

export interface LoginFormContent {
  pseudo: string
  password:string
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {


  @Input({required: false}) errMsg?:string

  @Output() formSubmitted: EventEmitter<LoginFormContent> = new EventEmitter<LoginFormContent>()

  form: FormGroup 

  ngOnInit(): void {
    
    this.form = new FormGroup({
      pseudo: new FormControl('john@mail.com', [
          Validators.required,
          Validators.minLength(3),
          Validators.email
        ]),
      password: new FormControl('changeme', [
        Validators.required,
        Validators.minLength(4)]),
    })

  }
  // on verifie que le formulaire est valide, si c'est le cas on emit du a l'Output
  async onSubmitForm(): Promise <void>{
    if(this.form.valid){
      const {pseudo, password } = this.form.value
      this.formSubmitted.emit({pseudo,password})
      
    }

  }
}
