import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onItemClicked func when an item is clicked and value is present', () => {
    const onItemClickedSpy = spyOn(
      component,
      'onItemClicked'
    ).and.callThrough();

    component.selectedItems = [
      {
        name: 'smss.exe',
        device: 'Stark',
        path: '\\System32\\smss.exe',
        status: 'scheduled',
      },
      {
        name: 'netsh.exe',
        device: 'Targaryen',
        path: '\\Windows\\System32\\netsh.exe',
        status: 'available',
      },
    ];
    const data = component.selectedItems[1];

    component.onItemClicked(data);

    expect(onItemClickedSpy).toHaveBeenCalledWith(data);
    expect(component.selectedItems).not.toContain(data);
  });

  it('should call onItemClicked func when an item is clicked and value is not present', () => {
    const onItemClickedSpy = spyOn(
      component,
      'onItemClicked'
    ).and.callThrough();
    component.selectedItems = [];
    const data = {
      name: 'netsh.exe',
      device: 'Targaryen',
      path: '\\Windows\\System32\\netsh.exe',
      status: 'available',
    };

    component.onItemClicked(data);

    expect(onItemClickedSpy).toHaveBeenCalledWith(data);

    expect(component.selectedItems.includes(data)).toBeTruthy;
  });

  it('should call updateCheckBoxState when select all is set', () => {
    const updateCheckBoxStateSpy = spyOn(
      component,
      'updateCheckBoxState'
    ).and.callThrough();

    component.selectedItems = [
      {
        name: 'smss.exe',
        device: 'Stark',
        path: '\\System32\\smss.exe',
        status: 'scheduled',
      },
      {
        name: 'netsh.exe',
        device: 'Targaryen',
        path: '\\Windows\\System32\\netsh.exe',
        status: 'available',
      },
    ];
    component.data = component.selectedItems;

    component.updateCheckBoxState(true);

    expect(updateCheckBoxStateSpy).toHaveBeenCalledWith(true);

    component.tableItem.forEach((i) => {
      expect(i.nativeElement.querySelector('input').checked).toBeTruthy();
    });
  });

  it('should call updateCheckBoxState when select all is unset', () => {
    const updateCheckBoxStateSpy = spyOn(
      component,
      'updateCheckBoxState'
    ).and.callThrough();

    component.selectedItems = [];
    component.data = component.selectedItems;
    component.updateCheckBoxState(false);

    expect(updateCheckBoxStateSpy).toHaveBeenCalledWith(false);

    component.tableItem.forEach((i) => {
      expect(i.nativeElement.querySelector('input').checked).toBeFalsy();
    });
  });

  it('should call updateClassName func when item is selected', () => {
    const updateClassNameSpy = spyOn(
      component,
      'updateClassName'
    ).and.callThrough();

    const elem = component.tableItem;
    component.updateClassName(true, elem[0]);
    fixture.detectChanges();

    expect(updateClassNameSpy).toHaveBeenCalledOnceWith(true, elem[0]);
  });

  it('should call updateClassName func when it is deselected', () => {
    const updateClassNameSpy = spyOn(
      component,
      'updateClassName'
    ).and.callThrough();

    const elem = component.tableItem;
    component.updateClassName(false, elem[0]);

    fixture.detectChanges();
    expect(updateClassNameSpy).toHaveBeenCalledOnceWith(false, elem[0]);
  });
});
