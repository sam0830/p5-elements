import { Component, Prop, Element } from "@stencil/core";
// respect -> https://codepen.io/OrchidAugur/pen/qLaNjV
@Component({
    tag: "p5-card",
    styleUrl: "p5-card.scss",
    shadow: true
})
export class P5Card {
    @Element() el: HTMLElement;
    @Prop() borderColor: string = 'black';
    @Prop() outerColor: string = 'white';
    @Prop() innerColor: string = 'black';

    constructor() {

    }
    componentDidLoad() {
        this.el.shadowRoot.querySelector('div.card-border').classList.add(`color-${this.borderColor}`);
        this.el.shadowRoot.querySelector('div.card-outer').classList.add(`color-${this.outerColor}`);
        this.el.shadowRoot.querySelector('div.card-inner').classList.add(`color-${this.innerColor}`);
    }

    hostData() {
        return {
            class: { 'p5-color': this.borderColor },
        };
    }

    render() {
        return (
            <div class="p5-card">
                <div class="card-border">
                    <div class="card-outer">
                        <div class="card-inner">
                            <slot />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
