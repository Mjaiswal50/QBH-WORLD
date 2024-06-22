import { Component, EventEmitter, Output } from '@angular/core';
import { FakeService } from '../fake.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  user = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: ''
  };

  constructor(private userService: FakeService) {
    this.userService.$setNotifier.subscribe((user:any)=>{
      if(user){
          this.user =user;
      }
    })
  }

  onSubmit() {
    if (this.user.id) {
      this.userService.editUser(this.user.id, this.user).subscribe(()=>{
        this.userService.$getNotifier.next('update')
      });
    } else {
      this.userService.createUser(this.user).subscribe(()=>{
        this.userService.$getNotifier.next('create')
      });
    }
    this.user = { id: 0, name: '', email: '', phone: '', address: '' };
  }
}
