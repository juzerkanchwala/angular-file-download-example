import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDownloadComponent } from './select-download.component';
import { TableDataService } from '../services/table-data.service';
import { CheckBoxStateService } from '../services/check-box-state.service';

describe('SelectDownloadComponent', () => {
  let component: SelectDownloadComponent;
  let fixture: ComponentFixture<SelectDownloadComponent>;
  let tableDataService: TableDataService;
  let checkBoxStateService: CheckBoxStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectDownloadComponent],
      providers: [
        TableDataService,
        CheckBoxStateService
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(SelectDownloadComponent);
    tableDataService = TestBed.inject(TableDataService);
    checkBoxStateService = TestBed.inject(CheckBoxStateService);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set data correctly',() => {
    expect(component.checked).toBeFalsy();
    expect(component.intermediate).toBeFalsy();

  });

  it('should give correct selected message when no item is selected', () => {
    const selectionMessage = document.querySelector('.select-checkbox').textContent;
    expect(selectionMessage).toBe('None Selected');
  });

  it('should call selected all function when checked is set to true', () => {
    const selectAllSpy = spyOn(component, 'onSelectAllClicked').and.callThrough();

    component.checked = true;
    component.onSelectAllClicked();
    
    expect(selectAllSpy).toHaveBeenCalled();
  });

  it('should call selected all function when checked is set to false', () => {
    const selectAllSpy = spyOn(component, 'onSelectAllClicked').and.callThrough();

    component.checked = false;
    component.data = [];
    component.onSelectAllClicked();
    
    expect(selectAllSpy).toHaveBeenCalled();
  });

  it('should call downloadData function', () => {
    const downloadDataSpy = spyOn(component, 'downloadData').and.callThrough();

    component.checked = false;
    component.downloadData();
    
    expect(downloadDataSpy).toHaveBeenCalled();
  });

  it('should call updateSelectAllState function when items are selected', () => {
    const updateSelectAllStateSpy = spyOn(component, 'updateSelectAllState').and.callThrough();
    component.data = [{name: 'smss.exe', device: 'Stark', path: '\\System32\\smss.exe', status: 'scheduled'},        
      {name: 'netsh.exe', device: 'Targaryen', path: '\\Windows\\System32\\netsh.exe', status: 'available'}];
  
    component.selectedItems = [{name: 'smss.exe', device: 'Stark', path: '\\System32\\smss.exe', status: 'scheduled'},        
      {name: 'netsh.exe', device: 'Targaryen', path: '\\Windows\\System32\\netsh.exe', status: 'available'}];
  
      component.updateSelectAllState();

      expect(updateSelectAllStateSpy).toHaveBeenCalled();
  });

  it('should call updateSelectAllState function when no items are selected', () => {
    const updateSelectAllStateSpy = spyOn(component, 'updateSelectAllState').and.callThrough();

    component.data = [{name: 'smss.exe', device: 'Stark', path: '\\System32\\smss.exe', status: 'scheduled'},        
      {name: 'netsh.exe', device: 'Targaryen', path: '\\Windows\\System32\\netsh.exe', status: 'available'}];
  
    component.selectedItems = [];

    component.updateSelectAllState();

    expect(updateSelectAllStateSpy).toHaveBeenCalled();
  });
});
