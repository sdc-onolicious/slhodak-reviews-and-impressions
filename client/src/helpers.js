const comparisons = {
  'Highest Rating': (reviewA, reviewB) => {
    const diff = reviewB.overall - reviewA.overall;
    if (diff !== 0) {
      return diff;
    }
    return comparisons.Newest(reviewA, reviewB);
  },
  'Lowest Rating': (reviewA, reviewB) => {
    const diff = reviewA.overall - reviewB.overall;
    if (diff !== 0) {
      return diff;
    }
    return comparisons.Newest(reviewA, reviewB);
  },
  Newest: (reviewA, reviewB) => {
    const dateB = new Date(reviewB.date);
    const dateA = new Date(reviewA.date);
    return dateB.getTime() - dateA.getTime();
  }
};

const Models = {
  ButtonLinkedList: class {
    constructor(page) {
      const newButton = new Models.ButtonListNode(page);
      this.head = newButton;
      this.tail = this.head;
    }

    addButtonToTail(page) {
      const newButton = new Models.ButtonListNode(page);
      newButton.previous = this.tail;
      this.tail.next = newButton;
      this.tail = newButton;
    }

    setButtonDisplays(inputButton = this.head, currentPage) {
      const button = inputButton;
      if (button === this.tail) {
        button.display = 'button';
        return;
      }
      if (button === this.head) {
        button.display = 'button';
      } else if (button.page === currentPage) {
        button.display = 'button';
      } else if (button.previous.page === currentPage) {
        button.display = 'button';
      } else if (button.next.page === currentPage) {
        button.display = 'button';
      } else if (button.previous.previous && button.previous.previous.page === currentPage && button.previous.previous === this.head) {
        button.display = 'button';
      } else if (button.next.next && button.next.next.page === currentPage && button.next.next === this.tail) {
        button.display = 'button';
      } else if (button.previous === this.head || button.next === this.tail) {
        button.display = 'ellipse';
      } else {
        button.display = null;
      }
      this.setButtonDisplays(button.next, currentPage);
    }

    getArray() {
      const array = [];
      let button = this.head;
      while (button) {
        array.push(button);
        button = button.next;
      }
      return array;
    }
  },
  ButtonListNode: class {
    constructor(page) {
      this.page = page;
      this.next = null;
      this.previous = null;
      this.display = null;
    }
  },
  FilterSet: class {
    constructor(tag) {
      this.storage = {};
      this.storage[tag] = tag;
    }

    add(tag) {
      if (!this.storage[tag]) {
        this.storage[tag] = tag;
      }
    }

    remove(tag) {
      if (this.storage[tag]) {
        delete this.storage[tag];
      }
    }
  }
};

export { comparisons, Models };
