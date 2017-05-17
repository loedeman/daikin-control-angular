import { Component } from '@angular/core';

@Component({
    selector: 'alert',
    template: `<div class="alert alert-danger sr-only" id="alert">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
    <p></p>
</div>`
})
export class AlertComponent {
    constructor() {
    }
}
