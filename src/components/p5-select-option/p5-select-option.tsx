import { Component, Prop } from "@stencil/core";
@Component({
  tag: "p5-select-option",
  styleUrl: "p5-select-option.scss",
  shadow: true
})
export class P5SelectOption {
  @Prop() value:string;
  constructor() {

  }

  hostData() {
    return {
      'role': 'option',
      'slot': 'p5-select-option',
    };
  }

  render() {
    return (
      <div>
        <slot/>
      </div>
    );
  }
}
