const ELIXIR_OF_THE_MONGOOSE = "Elixir of the Mongoose";
const MANA_POTION = "Mana potion";

describe("Gilded Rose", () => {
  describe("Regular items", () => {
    it("should decrease the quality and sell in values by 1 daily", () => {
      items = [
        new Item(ELIXIR_OF_THE_MONGOOSE, 5, 7),
        new Item(MANA_POTION, 42, 42),
      ];
      update_quality();
      expect(items[0].name).toEqual(ELIXIR_OF_THE_MONGOOSE);
      expect(items[0].sell_in).toEqual(4);
      expect(items[0].quality).toEqual(6);
      expect(items[1].name).toEqual(MANA_POTION);
      expect(items[1].sell_in).toEqual(41);
      expect(items[1].quality).toEqual(41);
    });
    it("should decrease the quality value by 2 once the sell in date has passed", () => {
      items = [new Item(ELIXIR_OF_THE_MONGOOSE, 0, 2)];
      update_quality();
      expect(items[0].name).toEqual(ELIXIR_OF_THE_MONGOOSE);
      expect(items[0].sell_in).toEqual(-1);
      expect(items[0].quality).toEqual(0);
    });
    it("should not drop the quality of an item below 0", () => {
      items = [new Item(ELIXIR_OF_THE_MONGOOSE, 0, 2)];
      update_quality();
      expect(items[0].name).toEqual(ELIXIR_OF_THE_MONGOOSE);
      expect(items[0].sell_in).toEqual(-1);
      expect(items[0].quality).toEqual(0);
      update_quality();
      expect(items[0].sell_in).toEqual(-2);
      expect(items[0].quality).toEqual(0);
    });
  });
  describe("Aged Brie", () => {
    it("should increase the quality of Aged Brie as time goes by, but never exceeding 50", () => {
      items = [new Item(AGED_BRIE, 2, 49)];
      update_quality();
      expect(items[0].name).toEqual(AGED_BRIE);
      expect(items[0].sell_in).toEqual(1);
      expect(items[0].quality).toEqual(MAX_QUALITY_VALUE);
      update_quality();
      expect(items[0].sell_in).toEqual(0);
      expect(items[0].quality).toEqual(MAX_QUALITY_VALUE);
      update_quality();
    });
  });

  describe("Sulfuras, Hand of Ragnaros", () => {
    it("should not update the sell in value and always use 80 as the quality value for Sulfuras", () => {
      items = [new Item(SULFURAS, 2, 49)];
      update_quality();
      expect(items[0].name).toEqual(SULFURAS);
      expect(items[0].sell_in).toEqual(2);
      expect(items[0].quality).toEqual(SULFURAS_QUALITY);
    });
  });

  describe("Conjured mana cake", () => {
    it("should decrease the quality of the Conjured mana cake by 2 as long as the sell in date has not passed", () => {
      items = [new Item(CONJURED_MANA_CAKE, 2, 4)];
      update_quality();
      expect(items[0].name).toEqual(CONJURED_MANA_CAKE);
      expect(items[0].sell_in).toEqual(1);
      expect(items[0].quality).toEqual(2);
    });
    it("should decrease the quality of the Conjured mana cake by 4 if the sell in date has passed", () => {
      items = [new Item(CONJURED_MANA_CAKE, 0, 5)];
      update_quality();
      expect(items[0].name).toEqual(CONJURED_MANA_CAKE);
      expect(items[0].sell_in).toEqual(-1);
      expect(items[0].quality).toEqual(1);
    });
    it("should not decrease the quality of the Conjured mana cake below 0", () => {
      items = [new Item(CONJURED_MANA_CAKE, 1, 6)];
      update_quality();
      update_quality();
      update_quality();
      update_quality();
      expect(items[0].name).toEqual(CONJURED_MANA_CAKE);
      expect(items[0].sell_in).toEqual(-3);
      expect(items[0].quality).toEqual(0);
    });
  });

  describe("Backstage passes", () => {
    it("should increase the quality of the Backstage pass by 1 when there are more than 10 days left until the concert", () => {
      items = [new Item(BACKSTAGE_PASS, 12, 1)];
      update_quality();
      expect(items[0].name).toEqual(BACKSTAGE_PASS);
      expect(items[0].sell_in).toEqual(11);
      expect(items[0].quality).toEqual(2);
    });
    it("should increase the quality of the Backstage pass by 2 when there are  10 days or less left until the concert", () => {
      items = [new Item(BACKSTAGE_PASS, 11, 1)];
      update_quality();
      expect(items[0].sell_in).toEqual(10);
      expect(items[0].quality).toEqual(3);
    });
    it("should increase the quality of the Backstage pass by 3 when there are  5 days or less left until the concert", () => {
      items = [new Item(BACKSTAGE_PASS, 6, 1)];
      update_quality();
      expect(items[0].sell_in).toEqual(5);
      expect(items[0].quality).toEqual(4);
    });
    it("should not increase the quality of the Backstage pass above 50", () => {
      items = [new Item(BACKSTAGE_PASS, 2, 49)];
      update_quality();
      update_quality();
      expect(items[0].sell_in).toEqual(0);
      expect(items[0].quality).toEqual(MAX_QUALITY_VALUE);
    });
    it("should drop the quality of the Backstage pass to 0 after the concert", () => {
      items = [new Item(BACKSTAGE_PASS, 0, 1)];
      update_quality();
      expect(items[0].sell_in).toEqual(-1);
      expect(items[0].quality).toEqual(0);
    });
    it("should not drop the quality of the Backstage pass below 0", () => {
      items = [new Item(BACKSTAGE_PASS, 0, 1)];
      update_quality();
      update_quality();
      expect(items[0].sell_in).toEqual(-2);
      expect(items[0].quality).toEqual(0);
    });
  });
});
