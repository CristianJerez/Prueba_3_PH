import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrecioModalPage } from './precio-modal.page';

describe('PrecioModalPage', () => {
  let component: PrecioModalPage;
  let fixture: ComponentFixture<PrecioModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PrecioModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
