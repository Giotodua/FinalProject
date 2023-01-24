import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { FiltersComponent } from 'src/app/shared/components/filters/filters.component';
import { CategoryService } from 'src/app/shared/shared-services/category/category.service';
import { Category } from 'src/model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoryListComponent implements OnInit {
  public categories: Category[] = [];

  @ViewChild('menuTrigger')
  menuTrigger!: MatMenuTrigger;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private CategoryServices: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {}

  getCategories() {
    this.CategoryServices.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  openDialog() {
    const dialogRef = this.dialog.open(FiltersComponent, {
      restoreFocus: false,
      data: {
        id: this.activatedRoute.snapshot.params['Id'],
      },
    });
    dialogRef.afterClosed();
  }
}
