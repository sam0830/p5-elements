import { Component, Prop, Method } from "@stencil/core";
@Component({
  tag: "p5-modal-controller",
})
export class P5ModalController {
  @Prop({ context: 'document' }) doc!: Document;

  @Method()
  public async create(options: ModalOptions) {
    const modal = this.doc.createElement('p5-modal');
    modal.classList.add('overlay-hidden');
    Object.assign(modal, options);
    this.doc.body.appendChild(modal);
    return modal.componentOnReady();
  }
}

export interface ModalOptions {
  component: HTMLElement;
  componentProps?: undefined | { [key: string]: any; };
  showBackdrop?: boolean;
}
