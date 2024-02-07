import { Component, Input, inject, OnInit } from '@angular/core';
import { TableData } from '../models/table-data';
import { CheckBoxStateService } from '../services/check-box-state.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'select-download',
  standalone: true,
  imports: [],
  templateUrl: './select-download.component.html',
  styleUrl: './select-download.component.css'
})
export class SelectDownloadComponent implements OnInit {

  private checkBoxStateService: CheckBoxStateService = inject(CheckBoxStateService)

  selectedMessage: string = 'None Selected'

  selectedItems: TableData[] = [];

  intermediate = false;
  checked = false;

  @Input() data: TableData[] = [];

  private checkSubscription: Subscription;
  private intermediateSubscription: Subscription;
  private selectedItemsSubscription: Subscription;

  ngOnInit() {
    this.checkSubscription = this.checkBoxStateService.checked$.subscribe((value) => this.checked = value);

    this.intermediateSubscription = this.checkBoxStateService.intermediate$.subscribe((value) => this.intermediate = value);

    this.selectedItemsSubscription = this.checkBoxStateService.selectedItems$.subscribe((data) => {
      this.selectedItems = data;
      this.updateSelectAllState();
      this.selectedMessage = data.length > 0 ? 'Selected ' + data.length : 'None Selected';
    });
  }

  updateSelectAllState(): void {
    if(this.selectedItems.length > 0) {
      if (this.selectedItems.length === this.data.length) {
        this.checkBoxStateService.checkedState(true);
        this.checkBoxStateService.intermediateState(false);
      } else {
        this.checkBoxStateService.checkedState(false);
        this.checkBoxStateService.intermediateState(true);
      }      
    } else {
      this.checkBoxStateService.intermediateState(false);
      this.checkBoxStateService.checkedState(false);
    }
  }

  onSelectAllClicked(): void {
    if(this.checked) {
      this.checkBoxStateService.checkedState(false);
      this.checkBoxStateService.selectedItemsState([]);
    } else {
      this.checkBoxStateService.checkedState(true);
      this.checkBoxStateService.intermediateState(false);
      this.checkBoxStateService.selectedItemsState(this.data.slice());
    }
  }

  downloadData(): void {
    const output = {};

    this.selectedItems.filter((item) => item.status === 'available').forEach((value) => {
      output[value.device] = value.path;
    });

    alert(JSON.stringify(output, null, ' '));
  }

  ngOnDestory() {
    this.checkSubscription.unsubscribe();
    this.intermediateSubscription.unsubscribe();
    this.selectedItemsSubscription.unsubscribe();
  }

}
