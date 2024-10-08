import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

export interface LoginFormContent {
  email: string
  password:string
  stayConnected: boolean
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
      email: new FormControl('admin@mail.com', [
          Validators.required,
          Validators.minLength(3),
          Validators.email
        ]),
      password: new FormControl('admin', [
        Validators.required,
        Validators.minLength(4)]),
      stayConnected: new FormControl(false)
    })

  }
  // on verifie que le formulaire est valide, si c'est le cas on emit du a l'Output
  async onSubmitForm(): Promise <void>{
    if(this.form.valid){
      const {email, password, stayConnected } = this.form.value
      console.log(stayConnected)
      this.formSubmitted.emit({email,password, stayConnected})
      
    }

  }
}
