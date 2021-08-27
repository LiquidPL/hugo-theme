import dayjs from "dayjs";
import tippy from "tippy.js";

import en from 'dayjs/locale/en';
import pl from 'dayjs/locale/pl';

import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

export default class TimeFormat {
  lastModifiedFields: HTMLElement[] = [];

  constructor() {
    dayjs.extend(relativeTime);
    dayjs.extend(localizedFormat);

    switch(document.documentElement.lang) {
      case 'en':
        dayjs.locale(en);
        break;
      case 'pl':
        dayjs.locale(pl);
        break;
    }

    this.lastModifiedFields = Array.prototype.filter.call(
      document.getElementsByClassName('js--last-modified'),
      (element) => element instanceof HTMLElement
    ) as HTMLElement[];

    this.setLastModified();
  }

  private setLastModified() {
    for (const element of this.lastModifiedFields) {
      const timestamp = dayjs(element.dataset.lastModified);

      const lastModified = timestamp.fromNow();

      element.innerHTML += lastModified;

      tippy(element, {
        content: timestamp.format('LLLL'),
      });
    }
  }
}
