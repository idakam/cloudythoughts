class Cloud {
  constructor(img, startX, startY, context, text) {
    this.img = img;
    this.startX = startX;
    this.startY = startY;
    this.context = context;
    this.text = text;

    this.render = function () {
      this.context.drawImage(this.img, this.startX - 160, this.startY - 115);
      console.log(context);
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.fillText(this.text, startX, startY);
    };

    this.update = function (newText) {
      this.text = newText;
      this.render();
    };
  }
}

class Clouds {
  constructor() {
    this.allClouds = [];
  }
}

export { Cloud, Clouds };
