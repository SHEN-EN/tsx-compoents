import { defineComponent, Transition } from "vue";

export default defineComponent({
  setup() {
    const transitionBeforeEnter = (el: HTMLElement) => {
      el.style.transition = "all 0.3s ease-out";
      el.style.height = "0";
      el.style.overflow = "hidden";
    };
    const transitionEnter = (el: HTMLElement) => {
      if (el.scrollHeight !== 0) {
        el.style.height = `${el.scrollHeight}px`;
      } else {
        el.style.height = "";
      }
    };
    const transitionBeforeLeave = (el: HTMLElement) => {
      el.style.height = el.scrollHeight + "px";
      el.style.overflow = "hidden";
    };
    const transitionLeave = (el: HTMLElement) => {
      el.style.height = '0';
    };
    const transitionAfterLeave = (el: HTMLElement) => {
      el.style.height = '';
    }
    return {
      transitionBeforeEnter,
      transitionEnter,
      transitionBeforeLeave,
      transitionLeave,
      transitionAfterLeave,
    };
  },
  render() {
    const {
      $slots,
      transitionBeforeEnter,
      transitionEnter,
      transitionBeforeLeave,
      transitionLeave,
      transitionAfterLeave,
    } = this;
    return (
      <Transition
        onBeforeEnter={(el) => transitionBeforeEnter(el as HTMLElement)}
        onAfterEnter={(el) => transitionEnter(el as HTMLElement)}
        onBeforeLeave={(el) => transitionBeforeLeave(el as HTMLElement)}
        onLeave={(el) => transitionLeave(el as HTMLElement)}
        onAfterLeave={(el) => transitionAfterLeave(el as HTMLElement)}
      >
        {$slots.default?.()}
      </Transition>
    );
  },
});
