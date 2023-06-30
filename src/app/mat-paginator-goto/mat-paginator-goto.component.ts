import {
  Component,
  Input,
  Output,
  EventEmitter,
  Injectable
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

  pageSize: number = 1; // const 1
  pageIndex: number = 0;
  length: number = 0;
  goToPageNumber: number = 1;

  // @ViewChild(MatPaginator) paginator?: MatPaginator;
  @Input() disabled = false;
  @Input() hidePageSize = true;
  @Input() showFirstLastButtons = true;

  @Input("length") set lengthChanged(length: number) {
    this.length = length;
  }

  @Output() pageChanged = new EventEmitter<number>();

  constructor() { }

  onPageChanged(pageEvt: PageEvent) {
    this.pageIndex = pageEvt.pageIndex;
    this.goToPageNumber = this.pageIndex + 1;
    this.pageChanged.emit(pageEvt.pageIndex);
  }

  goToChange() {
    this.pageIndex = this.goToPageNumber - 1;
    this.pageChanged.emit(this.pageIndex);
  }

}

