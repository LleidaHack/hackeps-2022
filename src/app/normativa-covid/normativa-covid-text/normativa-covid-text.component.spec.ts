import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormativaCovidTextComponent } from './normativa-covid-text.component';

describe('NormativaCovidTextComponent', () => {
  let component: NormativaCovidTextComponent;
  let fixture: ComponentFixture<NormativaCovidTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormativaCovidTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormativaCovidTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
