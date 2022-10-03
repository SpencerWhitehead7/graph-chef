import type { RecipeSerialized } from "../../../shared"

const recipe: RecipeSerialized = {
  id: 1,
  title: "Lee Bailey's Flourless Chocolate Cake",
  desc: "A delicious and true CALassic",
  size: "1 8 inch cake pan",
  tags: ["dessert", "cake"],
  data: {
    nodes: [
      {
        id: 1,
        action: "",
        output: "butter",
      },
      {
        id: 2,
        action: "",
        output: "cocoa powder",
      },
      {
        id: 3,
        action: "preheat oven to 350F and butter and powder the pan",
        output: "prepared pan",
      },
      {
        id: 4,
        action: "",
        output: "5 oz bittersweet or semisweet chocolate",
      },
      {
        id: 5,
        action: "",
        output: "3 oz unsweetened chocolate",
      },
      {
        id: 6,
        action: "",
        output: "1/2 c butter",
      },
      {
        id: 7,
        action: "melt chocolates and butter together in microwave or double boiler",
        output: "chocolate mixture",
      },
      {
        id: 8,
        action: "",
        output: "5 large egg yolks",
      },
      {
        id: 9,
        action: "",
        output: "2/3 c sugar",
      },
      {
        id: 10,
        action: "beat yolks and sugar until thick and lemon yellow in large bowl",
        output: "yolk mixture",
      },
      {
        id: 11,
        action: "",
        output: "1/2 tsp vanilla extract",
      },
      {
        id: 12,
        action: "stir vanilla extract into yolk mixture",
        output: "yolk mixture",
      },
      {
        id: 13,
        action: "gently fold in chocolate mixture",
        output: "yolk mixture",
      },
      {
        id: 14,
        action: "",
        output: "5 large egg whites",
      },
      {
        id: 15,
        action: "",
        output: "pinch of salt",
      },
      {
        id: 16,
        action: "beat whites and salt until stiff",
        output: "beaten whites",
      },
      {
        id: 17,
        action:
          "gently fold in 1/3 of egg whites, then other 2/3, until no streaks remain. Do not overmix",
        output: "batter",
      },
      {
        id: 18,
        action: "pour batter into pan and bake for 35-45 minutes",
        output: "cake",
      },
      {
        id: 19,
        action: "let cool in pan for 10 min, then remove and keep cooling",
        output: "cooled cake",
      },
      {
        id: 20,
        action: "",
        output: "3 oz semisweet chocolate",
      },
      {
        id: 21,
        action: "",
        output: "3 tbsp butter",
      },
      {
        id: 22,
        action: "melt chocolate and butter together in microwave or double boiler",
        output: "base glaze",
      },
      {
        id: 23,
        action: "",
        output: "1 tsp brandy/bourbon",
      },
      {
        id: 24,
        action: "stir brandy into base glaze",
        output: "glaze",
      },
      {
        id: 25,
        action: "spread glaze over cake, cool in fridge until set and serve",
        output: "completed cake",
      },
    ],
    edges: [
      { i: 1, o: 3 },
      { i: 2, o: 3 },
      { i: 4, o: 7 },
      { i: 5, o: 7 },
      { i: 6, o: 7 },
      { i: 8, o: 10 },
      { i: 9, o: 10 },
      { i: 10, o: 12 },
      { i: 11, o: 12 },
      { i: 7, o: 13 },
      { i: 12, o: 13 },
      { i: 14, o: 16 },
      { i: 15, o: 16 },
      { i: 13, o: 17 },
      { i: 16, o: 17 },
      { i: 3, o: 18 },
      { i: 17, o: 18 },
      { i: 18, o: 19 },
      { i: 20, o: 22 },
      { i: 21, o: 22 },
      { i: 22, o: 24 },
      { i: 23, o: 24 },
      { i: 19, o: 25 },
      { i: 24, o: 25 },
    ],
    positions: {
      3: { x: -450, y: 630 },
      7: { x: -225, y: 180 },
      10: { x: 225, y: 0 },
      12: { x: 225, y: 180 },
      13: { x: 0, y: 480 },
      16: { x: 450, y: 480 },
      17: { x: 225, y: 630 },
      18: { x: -135, y: 810 },
      19: { x: -135, y: 990 },
      22: { x: 270, y: 810 },
      24: { x: 270, y: 990 },
      25: { x: 90, y: 1260 },
    },
  },
}

export default recipe
