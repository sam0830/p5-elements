import { Component, Prop, Event, EventEmitter } from "@stencil/core";

@Component({
    tag: "p5-toggle",
    styleUrl: "p5-toggle.scss",
    shadow: true
})
export class P5ToggleComponent {
    @Prop() checked: boolean;
    @Event() change: EventEmitter;

    toggleChanged(e) {
        console.log(e.target.checked);
        this.change.emit(e.target.checked);
    }
    render() {
        return (
            <div>
                <label class="switch">
                    <input type="checkbox" checked={this.checked} onChange={(e: UIEvent) =>this.toggleChanged(e)} />
                    <div class="slider"></div>

                    <svg viewBox="0,0,100,100" preserveAspectRatio="none">
                        <polygon points="2,100 95,100 100,0 0,0" fill="white"></polygon>
                        <polygon points="10,90 85,90 90,10 10,10" fill="black"></polygon>


                        <clipPath id="svgPath">
                            <polygon points="9,91 86,91 91,9 9,9" fill="black"></polygon>
                        </clipPath>
                    </svg>
                    <svg viewBox="0,0,100,100" preserveAspectRatio="none">
                        <g clip-path="url(#svgPath)">
                            <polygon class="back-slider" points="0,80 80,80 80,0 0,0" fill="white"></polygon>
                        </g>
                    </svg>
                </label>
            </div>
        );
    }
}
