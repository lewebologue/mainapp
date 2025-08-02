/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup } from '@angular/forms';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent<any>;
  let fixture: ComponentFixture<TableComponent<any>>;

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

  it('should set editMode and editModeID on edit', () => {
    const data = [{ id: '1', name: 'Test' }];
    component.dataSource = new MatTableDataSource(data);
    component.displayedColumns = ['name'];
    component.formGroup = new FormGroup({});
    component.onEdit('1');
    expect(component.editMode).toBeTrue();
    expect(component.editModeID).toBe('1');
    expect(component.formGroup.get('id')?.value).toBe('1');
    expect(component.formGroup.get('name')?.value).toBe('Test');
  });

  it('should emit deleteButtonClick on delete', () => {
    spyOn(component.deleteButtonClick, 'emit');
    component.onDelete('123');
    expect(component.deleteButtonClick.emit).toHaveBeenCalledWith('123');
  });

  it('should emit editButtonClick and reset editMode on valid', () => {
    component.formGroup = new FormGroup({});
    spyOn(component.editButtonClick, 'emit');
    component.editMode = true;
    component.editModeID = '1';
    component.onValid();
    expect(component.editButtonClick.emit).toHaveBeenCalledWith(
      component.formGroup,
    );
    expect(component.editMode).toBeFalse();
    expect(component.editModeID).toBeNull();
  });

  it('should reset editMode and editModeID on close', () => {
    component.editMode = true;
    component.editModeID = '1';
    component.onClose();
    expect(component.editMode).toBeFalse();
    expect(component.editModeID).toBeNull();
  });

  it('should call addCakeToOrder and log', () => {
    spyOn(console, 'log');
    component.addCakeToOrder('cake1');
    // eslint-disable-next-line no-console
    expect(console.log).toHaveBeenCalledWith(['cake1']);
  });

  it('should update paginator in ngAfterViewInit', () => {
    component.dataSource = new MatTableDataSource([] as any[]);
    const paginatorMock = { pageSize: 10 } as any;
    component.paginator = paginatorMock;
    component.displayedColumns = ['name'];
    component.ngAfterViewInit();
    expect(component.dataSource.paginator).toBe(paginatorMock);
    expect(component.formGroup.contains('name')).toBeTrue();
  });

  it('should update paginator in ngOnChanges', () => {
    component.dataSource = new MatTableDataSource([] as any[]);
    const paginatorMock = { pageSize: 10 } as any;
    component.paginator = paginatorMock;
    component.ngOnChanges({
      dataSource: {
        currentValue: component.dataSource,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(component.dataSource.paginator).toBe(paginatorMock);
  });
});
