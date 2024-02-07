import { Component, OnInit, inject, ViewChildren, QueryList, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { SelectDownloadComponent } from '../select-download/select-download.component';
import { TableData } from '../models/table-data';
import { TableDataService } from '../services/table-data.service';
import { CommonModule } from '@angular/common';
import { CheckBoxStateService } from '../services/check-box-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [SelectDownloadComponent, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit, AfterViewInit {

  private tableDataService: TableDataService = inject(TableDataService);

  private checkBoxStateService: CheckBoxStateService = inject(CheckBoxStateService);

  data: TableData[] = [];
  tableHeader = [];

  selectedItems: TableData[] = [];

  @ViewChildren('tableItem') tableItem: QueryList<ElementRef> = new QueryList<ElementRef>();

  private tableDataSubscription: Subscription;
  private selectedItemsSubscription: Subscription;
  private checkedSubscription: Subscription;

  ngOnInit() {
    // get table data from table data service
    this.tableDataSubscription = this.tableDataService.getTableData().subscribe((tableData) => {
          this.data = tableData;
    });

    // get columns for table headers
    this.tableHeader = Object.keys(this.data[0]);

    this.selectedItemsSubscription = this.checkBoxStateService.selectedItems$.subscribe((data) => this.selectedItems = data);
  }

  ngAfterViewInit() {
    this.checkedSubscription = this.checkBoxStateService.checked$.subscribe((value) => this.updateCheckBoxState(value));
  }

  /**
   * function called when item in the table is selected 
   * and deselected
   */
  onItemClicked(value: TableData): void {
    if(this.selectedItems.includes(value)) {
      this.selectedItems.splice(this.selectedItems.indexOf(value), 1);      
    } else {
      this.selectedItems.push(value);
    }

    const index = this.data.indexOf(value);
    const filteredItem = this.tableItem.filter((item) =>
            parseInt(item.nativeElement.querySelector('input').value) === index);

    filteredItem.map(item => {
      item.nativeElement.querySelector('input').checked = !item.nativeElement.querySelector('input').checked;
      const inputElemState = item.nativeElement.querySelector('input').checked;
      this.updateClassName(inputElemState, item);
    });

    this.checkBoxStateService.selectedItemsState(this.selectedItems);
  }

  /**
   * function to update the check boxes in the table when the 
   * check box from select download component is checked and unchecked
   */
  updateCheckBoxState(value: boolean): void {
    if(this.selectedItems.length === this.data.length) {
      this.tableItem.forEach((item) => {
        item.nativeElement.querySelector('input').checked = value;
        this.updateClassName(value, item);      
      });
    }
  }

  /**
   * function to add and remove class name on input element
   */
  updateClassName(value: boolean, item: ElementRef): void {
    if (value) {
      item?.nativeElement?.classList.add('selected');
    } else {
      item?.nativeElement?.classList.remove('selected');
    }
  }

  ngOnDestroy() {
    this.tableDataSubscription.unsubscribe();
    this.selectedItemsSubscription.unsubscribe();
    this.checkedSubscription.unsubscribe();
  }
}
