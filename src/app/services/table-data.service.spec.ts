import { TestBed } from "@angular/core/testing";

import { TableDataService } from "./table-data.service";

describe('TableDataService', () => {
    let service: TableDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TableDataService]
        });
        service = TestBed.inject(TableDataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get table data', () => {
        const testData = [
            {name: 'smss.exe', device: 'Stark', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled'},        
            {name: 'netsh.exe', device: 'Targaryen', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available'},
            {name: 'uxtheme.dll', device: 'Lanniester', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available'},
            {name: 'cryptbase.dll', device: 'Martell', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', status: 'scheduled'},       
            {name: '7za.exe', device: 'Baratheon', path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', status: 'scheduled'}
        ];

        let result = [];
        const subscription = service.getTableData().subscribe(i => result = i);
        subscription.unsubscribe();
        expect(result).toEqual(testData);
        
    });

});