import { Component, Prop, State} from "@stencil/core";
@Component({
  tag: "p5-select",
  styleUrl: "p5-select.scss",
  shadow: true
})
export class P5Select {
  @State() private title:string;
  @Prop() private placeholder:string;
  @Prop({ mutable: true }) value?: any | null;
  @State() private menuClosed:boolean = true;
  constructor() {

  }

  componentDidLoad() {
    this.title = this.placeholder;
  }

  hostData() {

  }

  menuToggle() {
    this.menuClosed = !this.menuClosed;
  }

  selectOption(el:any) {
    this.title = el.textContent;
    this.value = el.value;
    this.menuToggle();
  }

  render() {
    return (
      <div>
        <div class="select-outer">
          <div class="select-inner" onClick={()=>this.menuToggle()}>
            {this.title}
          </div>
        </div>
        <div class={`select-menu ${this.menuClosed?'inactive':'active'}`} onClick={(event)=>this.selectOption(event.target)}>
          <slot name="p5-select-option"/>
        </div>
      </div>
    );
  }
}
