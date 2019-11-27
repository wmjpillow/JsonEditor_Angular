import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonEdiitorComponent } from './json-ediitor.component';

describe('JsonEdiitorComponent', () => {
  let component: JsonEdiitorComponent;
  let fixture: ComponentFixture<JsonEdiitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonEdiitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonEdiitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
