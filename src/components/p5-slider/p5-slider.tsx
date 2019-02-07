import { Component, Prop, Event, EventEmitter } from "@stencil/core";

@Component({
    tag: "p5-slider",
    styleUrl: "p5-slider.scss",
    shadow: true
})
export class P5Slider {
    @Event() change: EventEmitter;
    @Prop() min:number=0;
    @Prop() max:number=100;
    @Prop() step:number=20;

    sliderChanged(e) {
        this.change.emit(e.target.value);
        console.log(e.target.value);
    }

    render() {
        return (
            <div>
                <label class="p5-slider">
                    <input type="range" min={this.min} max={this.max} step={this.step} onChange={(e: UIEvent) =>this.sliderChanged(e)}/>

                    <svg class="p5-slider-frame" viewBox="0,0,100,100" preserveAspectRatio="none" fill="white">
                        <polygon points="2,100 99,100 100,0 0,0"></polygon>
                    </svg>
                    <svg class="p5-slider-frame" viewBox="0,0,100,100" preserveAspectRatio="none" fill="black">
                        <polygon points="7,90 95,90 95,10 5,10"></polygon>
                    </svg>
                </label>
            </div>
        );
    }
}
