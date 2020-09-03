const MAX_QUALITY_VALUE = 50;
const BACKSTAGE_PASS_INCREASE_QUALITY_BY_TWO_THRESHOLD = 11;
const BACKSTAGE_PASS_INCREASE_QUALITY_BY_THREE_THRESHOLD = 6;

// Items with special rules
const AGED_BRIE = "Aged Brie";
const SULFURAS = "Sulfuras, Hand of Ragnaros";
const BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";

function Item(name, sell_in, quality) {
  // Name of the item
  this.name = name;
  // Number of days available to sell the item
  this.sell_in = sell_in;
  // The value of the item
  this.quality = quality;
}

var items = [];

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    if (items[i].name != AGED_BRIE && items[i].name != BACKSTAGE_PASS) {
      if (items[i].quality > 0) {
        if (items[i].name != SULFURAS) {
          items[i].quality = items[i].quality - 1;
        }
      }
    } else {
      if (items[i].quality < MAX_QUALITY_VALUE) {
        items[i].quality = items[i].quality + 1;
        if (items[i].name == BACKSTAGE_PASS) {
          if (
            items[i].sell_in < BACKSTAGE_PASS_INCREASE_QUALITY_BY_TWO_THRESHOLD
          ) {
            if (items[i].quality < MAX_QUALITY_VALUE) {
              items[i].quality = items[i].quality + 1;
            }
          }
          if (
            items[i].sell_in <
            BACKSTAGE_PASS_INCREASE_QUALITY_BY_THREE_THRESHOLD
          ) {
            if (items[i].quality < MAX_QUALITY_VALUE) {
              items[i].quality = items[i].quality + 1;
            }
          }
        }
      }
    }
    if (items[i].name != SULFURAS) {
      items[i].sell_in = items[i].sell_in - 1;
    }
    if (items[i].sell_in < 0) {
      if (items[i].name != AGED_BRIE) {
        if (items[i].name != BACKSTAGE_PASS) {
          if (items[i].quality > 0) {
            if (items[i].name != SULFURAS) {
              items[i].quality = items[i].quality - 1;
            }
          }
        } else {
          items[i].quality = items[i].quality - items[i].quality;
        }
      } else {
        if (items[i].quality < MAX_QUALITY_VALUE) {
          items[i].quality = items[i].quality + 1;
        }
      }
    }
  }
}
