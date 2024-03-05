import { TestBed } from '@angular/core/testing';
import { CheckBoxStateService } from './check-box-state.service';

describe('CheckboxStateService', () => {
  let checkBoxStateService: CheckBoxStateService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckBoxStateService],
    });
    checkBoxStateService = TestBed.inject(CheckBoxStateService);
  });

  it('should be created', () => {
    expect(checkBoxStateService).toBeTruthy();
  });

  it('should set checked state', () => {
    let expectedResult = false;
    checkBoxStateService.checkedState(true);
    const checkedVal = checkBoxStateService.checked$.subscribe(
      (val) => (expectedResult = val)
    );

    expect(expectedResult).toBeTruthy();
    checkedVal.unsubscribe();
  });

  it('should set intermediate state', () => {
    let expectedResult = true;
    checkBoxStateService.intermediateState(false);
    const intermediateVal = checkBoxStateService.intermediate$.subscribe(
      (val) => (expectedResult = val)
    );

    expect(expectedResult).toBeFalsy();
    intermediateVal.unsubscribe();
  });

  it('should set selectedItems state', () => {
    let expectedResult = {};
    const data = [
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

    checkBoxStateService.selectedItemsState(data);
    const selectedItemsVal = checkBoxStateService.selectedItems$.subscribe(
      (val) => (expectedResult = val)
    );

    expect(expectedResult).toEqual(data);
    selectedItemsVal.unsubscribe();
  });
});
