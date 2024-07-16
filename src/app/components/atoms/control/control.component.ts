import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputComponent, SelectComponent } from '@components/atoms';
import { ControlDto } from '@types';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [InputComponent, SelectComponent],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
})
export class ControlComponent implements OnInit {
  @Input({ required: true }) dto!: ControlDto;

  data = new FormControl('');
  indicator = new FormControl('');

  ngOnInit(): void {
    this.data.setValue(this.dto.data);
    this.indicator.setValue(this.dto.indicator);
  }
}
