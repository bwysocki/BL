import {Component, Input, Output, EventEmitter, OnInit, ElementRef} from 'angular2/core';
import {PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

declare const jQuery: JQueryStatic;

@Component({
    directives: [PROGRESSBAR_DIRECTIVES],
    selector: 'fps-progress',
    template: `<div class="slider"></div>`
})
export class FpsProgress implements OnInit {

    @Input() private fps: number;
    @Output() private fpsChange: EventEmitter<number> = new EventEmitter();

    constructor(private m_elementRef: ElementRef) {}

    public ngOnInit () {
        jQuery(this.m_elementRef.nativeElement).find('.slider').slider({
           max: 70,
           min: 5,
           range: false,
           slide: (event, ui) => {
              this.fps = ui.value;
              this.fpsChange.next(this.fps);
           },
           value: this.fps
        });
    }

}

