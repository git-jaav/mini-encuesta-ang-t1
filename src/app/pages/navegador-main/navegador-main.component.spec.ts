
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavegadorMainComponent } from './navegador-main.component';

describe('NavegadorMainComponent', () => {
  let component: NavegadorMainComponent;
  let fixture: ComponentFixture<NavegadorMainComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [NavegadorMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavegadorMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
