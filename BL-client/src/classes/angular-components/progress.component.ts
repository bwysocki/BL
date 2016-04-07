import {Component, Input, Output, EventEmitter, OnInit, ElementRef} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

declare const jQuery: JQueryStatic;

@Component({
    directives: [PROGRESSBAR_DIRECTIVES],
    selector: 'bl-progress',
    template: `<div class="slider"></div>`
})
export class Progress implements OnInit {

    @Input() private max: string;
    @Input() private min: string;
    @Input() private observable: Observable<number>;
    @Output() private valChange: EventEmitter<number> = new EventEmitter();

    constructor(private m_elementRef: ElementRef) {}

    public ngOnInit () {
        let sliderElemenet: jQuery = jQuery(this.m_elementRef.nativeElement).find('.slider');
        sliderElemenet.slider({
           max: ~~this.max,
           min: ~~this.min,
           range: false,
           slide: (event, ui) => {
              this.valChange.next(ui.value);
           },
           value: 0
        });
        
        this.observable.subscribe((val: number) => {
            sliderElemenet.slider('value', val);
        });
    }

}

