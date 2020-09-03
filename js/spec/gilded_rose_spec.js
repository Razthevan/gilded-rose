const ANKH = "ANKH";

describe("Gilded Rose", () => {
  describe("Regular items", () => {
    it("should decrease the quality and sell in values by 1 daily", () => {
      items = [new Item(ANKH, 10, 10)];
      update_quality();
      expect(items[0].name).toEqual(ANKH);
      expect(items[0].sell_in).toEqual(9);
      expect(items[0].quality).toEqual(9);
    });
    it("should decrease the quality value by 2 once the sell in date has passed", () => {
      items = [new Item(ANKH, 0, 2)];
      update_quality();
      expect(items[0].name).toEqual(ANKH);
      expect(items[0].sell_in).toEqual(-1);
      expect(items[0].quality).toEqual(0);
    });
    it("should not drop the quality of an item below 0", () => {
      items = [new Item(ANKH, 0, 2)];
      update_quality();
      expect(items[0].name).toEqual(ANKH);
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
    it("should not update the sell in and quality properties for Sulfuras", () => {
      items = [new Item(SULFURAS, 2, 49)];
      update_quality();
      expect(items[0].name).toEqual(SULFURAS);
      expect(items[0].sell_in).toEqual(2);
      expect(items[0].quality).toEqual(49);
    });
  });

  describe("Backstage passes", () => {
    it("should increase the quality of the Backstage pass by 1 when there are more than 10 days left until the concert", () => {
      items = [new Item(BACKSTAGE_PASS, 11, 1)];
      update_quality();
      expect(items[0].name).toEqual(BACKSTAGE_PASS);
      expect(items[0].sell_in).toEqual(10);
      expect(items[0].quality).toEqual(2);
    });
    it("should increase the quality of the Backstage pass by 2 when there are  10 days or less left until the concert", () => {
      items = [new Item(BACKSTAGE_PASS, 10, 1)];
      update_quality();
      expect(items[0].sell_in).toEqual(9);
      expect(items[0].quality).toEqual(3);
    });
    it("should increase the quality of the Backstage pass by 3 when there are  5 days or less left until the concert", () => {
      items = [new Item(BACKSTAGE_PASS, 5, 1)];
      update_quality();
      expect(items[0].sell_in).toEqual(4);
      expect(items[0].quality).toEqual(4);
    });
    it("should not increase the quality of the Backstage pass above 50", () => {
      items = [new Item(BACKSTAGE_PASS, 1, 49)];
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
