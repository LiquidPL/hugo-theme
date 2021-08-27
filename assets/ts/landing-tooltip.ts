import tippy, { Instance as TippyInstance } from "tippy.js";

interface Tooltip {
  htmlElement: HTMLElement;
  tippy: TippyInstance;
  value: string;
  timeoutHandle?: number;
}

interface Dataset {
  id: string;
  tooltip: string;
}

export default class LandingTooltip {
  tooltips: { [key: string]: Tooltip } = {};
  copiedMessage: string = '';

  constructor() {
    const json = document.querySelector('.js--i18n');

    if (json === null) {
      return;
    }

    this.copiedMessage = JSON.parse(json.textContent ?? '').copiedToClipboard;

    const targets = document.getElementsByClassName('js--landing-link-tooltip');

    if (targets.length === 0) {
      return;
    }

    for (const element of targets) {
      if (!(element instanceof HTMLElement)) {
        continue;
      }

      this.addTooltip(element);
    }
  }

  private addTooltip(element: HTMLElement) {
    const dataset = element.dataset as DOMStringMap|Dataset;

    if (dataset.id === undefined || dataset.tooltip === undefined) {
      return;
    }

    const tooltip = {
      htmlElement: element,
      tippy: tippy(element, {
        content: dataset.tooltip,
        hideOnClick: false,
      }),
      value: dataset.tooltip,
    } as Tooltip;

    tooltip.tippy.setProps({
      onHidden: () => this.revertTooltip(tooltip)
    });

    this.tooltips[dataset.id] = tooltip;

    element.addEventListener('click', this.onClick);
  }

  private onClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const dataset = target.dataset as DOMStringMap|Dataset;

    if (dataset.id === undefined) {
      return;
    }

    const tooltip = this.tooltips[dataset.id];

    navigator.clipboard.writeText(tooltip.value)
      .then(() => {
        tooltip.tippy.setContent(this.copiedMessage);

       tooltip.timeoutHandle = setTimeout(() => this.revertTooltip(tooltip), 5000);
      });
  }

  private revertTooltip(tooltip: Tooltip) {
    if (tooltip.timeoutHandle !== undefined) {
      clearTimeout(tooltip.timeoutHandle);
      delete tooltip.timeoutHandle;
    } else {
      return;
    }

    tooltip.tippy.setContent(tooltip.value);
  }
}
