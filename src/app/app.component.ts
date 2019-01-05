import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isCollapsed = true; // 主菜单当前状态
  subMenuState = {};  // 子菜单打开状态
  debounceTime = 10;
  menuWidthCss = '80px'; // 主菜单宽度
  mouseOnMenu = false; // 鼠标是否在主菜单
  collapseChangeObserver: Observer<string>;

  ngOnInit(): void {
    this.subMenuState['subMenu1'] = false;
    this.subMenuState['subMenu2'] = false;

    if (!this.collapseChangeObserver) {
      Observable.create(observer => { this.collapseChangeObserver = observer; })
        .pipe(debounceTime(this.debounceTime)) // wait 300ms after the last event before emitting last event
        .pipe(distinctUntilChanged()) // only emit if value is different from previous value
        .subscribe((value) => {
          console.log('接收到value =' + value);
          console.log('allSubMenuClosed = ' + this.allSubMenuClosed());
          console.log('mouseOnMenu =' + this.mouseOnMenu);

          // 有子菜单打开 或 鼠标在主菜单上，展开主菜单
          if (!this.allSubMenuClosed() || this.mouseOnMenu) {
            this.unCollapsed();
          } else {
            this.collapsed();
          }
        });
    }
  }

  openChange(open) {
    if (!open) { // 关闭子菜单时需要触发检查
      this.collapseChangeObserver.next('submenu closed');
    }
  }

  mouseOver(): void {
    this.mouseOnMenu = true;
    this.collapseChangeObserver.next('mouseOnMenu');
  }

  mouseOut(): void {
    this.mouseOnMenu = false;
    this.collapseChangeObserver.next('mouseOut');
  }

  private allSubMenuClosed() {
    for (const key in this.subMenuState) {
      if (this.subMenuState[key]) {
        return false;
      }
    }
    return true;
  }

  private collapsed() {
    this.isCollapsed = true;
    this.menuWidthCss = '80px';
  }

  private unCollapsed() {
    this.isCollapsed = false;
    this.menuWidthCss = '240px';
  }
}
