import { Component } from '@angular/core';

@Component({
    selector: 'power-button',
    template: `<div class="col-sm-offset-10 col-sm-2 pull-right">
    <a class="btn btn-default" onclick='power_onclick();'><i class="fa fa-power-off" style="font-size:1.6em;color:black;"></i><b style="font-size:1.5em;" id="power"> OFF</b></a>
</div>
`
})
export class PowerButtonComponent {
    constructor() {
    }
}
