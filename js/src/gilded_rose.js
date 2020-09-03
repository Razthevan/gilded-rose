const SULFURAS_QUALITY = 80;
const MAX_QUALITY_VALUE = 50;
const BACKSTAGE_PASS_INCREASE_QUALITY_BY_TWO_THRESHOLD = 11;
const BACKSTAGE_PASS_INCREASE_QUALITY_BY_THREE_THRESHOLD = 6;

// Items with special rules
const AGED_BRIE = "Aged Brie";
const SULFURAS = "Sulfuras, Hand of Ragnaros";
const CONJURED_MANA_CAKE = "Conjured Mana Cake";
const BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";

function Item(name, sell_in, quality) {
  // Name of the item
  this.name = name;
  // Number of days available to sell the item
  this.sell_in = sell_in;
  // The quality of the item
  this.quality = quality;
}

var items = [];

const update_quality = () =>
  items.map((item) => {
    // The quality of Sulfuras is always 80 and it's sell in property never changes
    if (item.name == SULFURAS) {
      item.quality = SULFURAS_QUALITY;
      return;
    }

    // Decrease the sell in property value for all other items
    item.sell_in = item.sell_in - 1;

    // Increase the value of the Aged Brie's quality by 1 but never over 50
    if (item.name == AGED_BRIE) {
      item.quality =
        item.quality < MAX_QUALITY_VALUE ? item.quality + 1 : item.quality;
      return;
    }

    if (item.name == BACKSTAGE_PASS) {
      item.quality = getBackstagePassUpdatedQuality(item.quality, item.sell_in);
      return;
    }

    if (item.name == CONJURED_MANA_CAKE) {
      item.quality = getConjuredItemsUpdatedQuality(item.quality, item.sell_in);
      return;
    }

    // Handle the quality property for regular items
    item.quality = getRegularItemUpdatedQuality(item.quality, item.sell_in);
  });

// Helpers

const getRegularItemUpdatedQuality = (quality, sellIn) => {
  // If the quality is already 0, do not modify it
  if (!quality) {
    return quality;
  }

  // If the sell in date has passed, decrease the value by 2 otherwise decrease it by 1
  return sellIn < 0 ? quality - 2 : quality - 1;
};

const getConjuredItemsUpdatedQuality = (quality, sellIn) => {
  if (!quality) {
    return quality;
  }

  // If the sell in date has passed, decrease the value by 4 otherwise decrease it by 2
  return sellIn < 0 ? quality - 4 : quality - 2;
};

const getBackstagePassUpdatedQuality = (quality, sellIn) => {
  // Drop the quality to  0 after the concert
  if (sellIn < 0) {
    return 0;
  }

  // Increase the quality of the Backstage pass by 3 when there are 5 days or less left until the concert
  if (sellIn < BACKSTAGE_PASS_INCREASE_QUALITY_BY_THREE_THRESHOLD) {
    let updatedQuality = quality + 3;
    return updatedQuality >= MAX_QUALITY_VALUE
      ? MAX_QUALITY_VALUE
      : updatedQuality;
  }

  // Increase the quality of the Backstage pass by 2 when there are 10 days or less left until the concert
  if (sellIn < BACKSTAGE_PASS_INCREASE_QUALITY_BY_TWO_THRESHOLD) {
    let updatedQuality = quality + 2;
    return updatedQuality >= MAX_QUALITY_VALUE
      ? MAX_QUALITY_VALUE
      : updatedQuality;
  }

  // Increase the quality of the Backstage pass by 1 when there are more than 10 days left until the concert
  return quality + 1;
};
