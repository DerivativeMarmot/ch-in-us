import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild, Injectable
} from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = `First page`;
  itemsPerPageLabel = `Items per page:`;
  lastPageLabel = `Last page`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Next page';
  previousPageLabel = 'Previous page';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return 'Page 1 of 1';
    }
    // const amountPages = Math.ceil(length / pageSize);
    return `Page ${page + 1} of ${length}`;
  }
}

@Component({
  selector: 'app-mat-paginator-goto',
  templateUrl: './mat-paginator-goto.component.html',
  styleUrls: ['./mat-paginator-goto.component.css'],
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
})
export class MatPaginatorGotoComponent {
  // pageNumber: number = 1;
  pageSize: number = 1; // const 1
  pageIndex: number = 0;
  length: number = 0;
  goToPageNumber: number = 1;
  // pageNumbers: number[] = [];

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @Input() disabled = false;
  @Input() hidePageSize = true;
  // @Input() pageSizeOptions: number[] = [];
  @Input() showFirstLastButtons = true;
  // @Output() page = new EventEmitter<PageEvent>();
  // @Input("pageIndex") set pageIndexChanged(pageIndex: number) {
  //   this.pageIndex = pageIndex;
  // }
  @Input("length") set lengthChanged(length: number) {
    this.length = length;
  }
  // @Input("pageSize") set pageSizeChanged(pageSize: number) {
  //   this.pageSize = 1;
  // }

  @Output() pageChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    // this.updateGoto();
  }

  // updateGoto() {
  //   this.goTo = (this.pageIndex || 0) + 1;
  //   this.pageNumbers = [];
  //   for (let i = 1; i <= Math.ceil(this.length / this.pageSize); i++) {
  //     this.pageNumbers.push(i);
  //   }
  // }

  onPageChanged(pageEvt: PageEvent) {
    // this.length = pageEvt.length;
    this.pageIndex = pageEvt.pageIndex;
    this.goToPageNumber = this.pageIndex + 1;
    // this.pageSize = 1;
    // this.updateGoto();
    // this.emitPageEvent(pageEvt);
    this.pageChanged.emit(pageEvt.pageIndex);
  }

  goToChange() {
    if (this.paginator != null) {
      this.pageIndex = this.goToPageNumber - 1;
      // const event: PageEvent = {
      //   length: this.length,
      //   pageIndex: this.goToPageNumber-1,
      //   pageSize: this.pageSize
      // };
      this.pageChanged.emit(this.pageIndex);
      // this.page.emit(event);
      // this.paginator.page.next(event);
      // this.emitPageEvent(event);
    }
  }

  // emitPageEvent(pageEvent: PageEvent) {
  //   this.page.next(pageEvent);
  // }
}

