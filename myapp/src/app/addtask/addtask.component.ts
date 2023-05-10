import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  taskLevel: string = '';
  startedOn: string = '';
  completedOn: string = '';
  weightage: number = 0;
  milestone: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onsubmit() {
    const userData = {
      taskLevel: this.taskLevel || '',
      startedOn: this.startedOn || '',
      completedOn: this.completedOn || '',
      weightage: this.weightage || 0,
      milestone: this.milestone || 0
    };

    this.http.post('http://localhost:3000/addtask', userData).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
