import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { User } from '../user.model';
import { FakeService } from '../fake.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  users: User[] = [];

  constructor(private userService: FakeService, private router: Router) {
     this.userService.getAllUsers().subscribe(data=>{
       this.users = data
    });
    this.userService.$getNotifier.subscribe(res=>{
      this.userService.getAllUsers().subscribe(data => {
        this.users = data
      });
    })
  }

  editUser(user:any) {
    this.userService.$setNotifier.next(JSON.parse(JSON.stringify(user)))
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe();
    this.userService.getAllUsers().subscribe(data=>{
       this.users = data
    }); 
  }

  generatePDF() {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Name', 'Email', 'Phone Number', 'Address']],
      body: this.users.map(user => [user.name, user.email, user.phone, user.address])
    });
    const pdfData = doc.output('datauristring');
    localStorage.setItem('tablePdf', pdfData);
    this.router.navigate(['view-pdf']);
  }

  downloadPDF() {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Name', 'Email', 'Phone Number', 'Address']],
      body: this.users.map(user => [user.name, user.email, user.phone, user.address])
    });
    doc.save('table.pdf');
  }
}
