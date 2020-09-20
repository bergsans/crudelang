export const exampleCode = `
print("check the dev console!");
y = 10;
x = 100;
while(y < 500) {
  x = 100;
  y = y + 105;
  while(x < 600) {
    smallerRectX = x + 5;
    smallerRectY = y + 5;
    rectangle(x, y, 100, 100, "black");
    rectangle(smallerRectX, smallerRectY, 90, 90, "red");
    x = x + 105;
    print("x:", x, " ", "y:", y);
  }
}
if(3 > 2) {
  circle(360, 375, 30, "blue");
}
${'\n'.repeat(100)}
`;
