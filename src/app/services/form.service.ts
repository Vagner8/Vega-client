import { Injectable } from '@angular/core';
import { FormArray, FormRecord } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  toAdd = new FormArray<FormRecord>([]);
  toEdit = new FormArray<FormRecord>([]);
}
