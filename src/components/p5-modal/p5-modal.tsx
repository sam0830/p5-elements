import { Component, Method, Element, Prop, Event, EventEmitter, Listen} from "@stencil/core";
@Component({
  tag: "p5-modal",
  styleUrl: "p5-modal.scss",
  shadow: true
})
export class P5Modal {
  private usersElement?: HTMLElement;
  presented:boolean = false;
  @Prop({ context: 'document' }) doc!: Document;
  @Prop() component:HTMLElement;
  @Prop() componentProps?: undefined | { [key: string]: any; };
  @Prop() showBackdrop:boolean=true;
  @Element() el:HTMLElement;

  /**
   * Emitted after the modal has dismissed.
   */
  @Event({ eventName: 'p5ModalDidDismiss' }) didDismiss!: EventEmitter;
  constructor() {

  }
  // 子要素にイベントを発生させる
  @Listen('p5ModalDidDismiss')
  protected lifecycle(modalEvent: CustomEvent) {
    const element = this.usersElement;
    const name = LIFECYCLE_MAP[modalEvent.type];
    if (element && name) {
      const ev = new CustomEvent(name, {
        bubbles: false,
        cancelable: false,
        detail: modalEvent.detail
      });
      element.dispatchEvent(ev);
    }
  }

  @Method() async present() {
    if (this.presented) {
      return;
    }
    this.presented = true;
    this.doc.body.style.overflow = "hidden";
    const container = this.el.shadowRoot.querySelector('.modal-content');

    // attachComponent
    const element:any = (typeof this.component === 'string')
    ? container.ownerDocument && container.ownerDocument.createElement(this.component)
    : this.component;

    const componentProps = {
      ...this.componentProps,
      modal: this.el
    };
    if (componentProps) {
      Object.assign(element, componentProps);
    }
    // element.dataset.params = JSON.stringify(componentProps);
    // console.log(element.dataset.params.prop1);
    this.el.classList.remove('overlay-hidden');
    container.appendChild(element);
    if(element.componentOnReady) {
      await element.componentOnReady();
    }
    this.usersElement = element;
  }

  @Method() public async dismiss(data?:any, role?:string) {
    if (!this.presented) {
      return false;
    }
    this.presented = false;
    this.doc.body.style.overflow = "visible";
    this.didDismiss.emit({data, role});
    this.el.remove();
  }

  @Method() public async onDidDismiss() {
    let resolve:(detail: any) => void;
    const promise = new Promise(r => resolve = r);
    const callback = (event:any)=>{
      resolve(event.detail);
    }
    const handler = (event: Event) =>{
      this.el.removeEventListener('p5ModalDidDismiss', handler);
      callback(event);
    }
    this.el.addEventListener('p5ModalDidDismiss', handler);
    return promise;
  }

  render() {
    return [
      <div class="backdrop" onClick={()=>this.dismiss({result:"adsds"})}></div>,
      <div class="modal-wrapper">
        <div class="modal-content">

        </div>
      </div>

    ];
  }
}

const LIFECYCLE_MAP: any = {
  'p5ModalDidPresent': 'p5ViewDidEnter',
  'p5ModalWillPresent': 'p5ViewWillEnter',
  'p5ModalWillDismiss': 'p5ViewWillLeave',
  'p5ModalDidDismiss': 'p5ViewDidLeave',
};
