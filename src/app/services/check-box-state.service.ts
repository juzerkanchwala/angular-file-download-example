import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { TableData } from "../models/table-data";


@Injectable({
    providedIn: 'root'
})
export class CheckBoxStateService {

    private checkedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    checked$ = this.checkedSubject.asObservable();

    private intermediateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    intermediate$ = this.intermediateSubject.asObservable();

    private selectedItemsSubject: BehaviorSubject<TableData[]> = new BehaviorSubject<TableData[]>([]);
    selectedItems$ = this.selectedItemsSubject.asObservable();

    checkedState(value: boolean) {
        this.checkedSubject.next(value);
    }

    intermediateState(value: boolean) {
        this.intermediateSubject.next(value);
    }

    selectedItemsState(data: TableData[]) {
        this.selectedItemsSubject.next(data);
    }
}