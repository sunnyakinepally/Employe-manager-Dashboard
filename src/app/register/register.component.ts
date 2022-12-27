import { Component, OnInit } from '@angular/core';
import { Validators,FormGroup,FormBuilder, ValidatorFn, AbstractControl, ValidationErrors, } from '@angular/forms';
import { UserService } from '../shared/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  addEmployee!: any;
  constructor( private fb:FormBuilder,private userservice:UserService) { }

  ngOnInit(): void {
    this.initLoginForm();

  }
  initLoginForm() {
    this.addEmployee = this.fb.group({
      first_name: ["", [Validators.required]],
      middle_name:["", [Validators.required]],
      last_name:["", [Validators.required]],
      Designation: ["", [Validators.required]],
      date_of_birth:["", [Validators.required]],
      mobile_number:['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      // Emp_mail: ["", [Validators.required]],
      // user_name: ["", [Validators.required]],
      password: ["", [Validators.required]],
      confirm_password: ["", [Validators.required]]
    }, { validators: passwordMatchingValidatior });
  }
  
  addEmployeedetails(){
    console.log(this.addEmployee.value)
   
    this.userservice.fetchregister(this.addEmployee.value).subscribe((res:any)=>{
      alert(res.message)
    })
    
  }

}
export const passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirm_password');
  return password?.value === confirmPassword?.value ? null : { notmatched: true };
};
