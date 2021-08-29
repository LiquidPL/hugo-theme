import dayjs from "dayjs";
import tippy from "tippy.js";

import en from 'dayjs/locale/en';
import pl from 'dayjs/locale/pl';

import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

export default class TimeFormat {
  fields: HTMLElement[] = [];

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

    const publishDateFields = Array.from(document.querySelectorAll('.js--publish-date'));
    const lastModifiedFields = Array.from(document.querySelectorAll('.js--last-modified'));

    this.fields = publishDateFields.concat(lastModifiedFields)
      .filter((element) => element instanceof HTMLElement) as HTMLElement[];

    this.setDates();
  }

  private setDates() {
    for (const element of this.fields) {
      const timestamp = dayjs(element.dataset.timestamp);

      if (element.classList.contains('js--publish-date')) {
        this.setValue(element, timestamp.format('LLLL'));

        tippy(element, {
          content: timestamp.format('YYYY-MM-DD, HH:mm Z'),
        });
      } else if (element.classList.contains('js--last-modified')) {
        this.setValue(element, timestamp.fromNow());

        tippy(element, {
          content: timestamp.format('LLLL'),
        });
      }
    }
  }

  private setValue(element: HTMLElement, value: string) {
    const valueElement = element.querySelector('.js--date-value');

    if (valueElement === null) {
      return;
    }

    valueElement.textContent = value;
  }
}
