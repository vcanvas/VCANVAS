import Vue from "*.vue";

class Draw {
  vm: Vue;
  el: HTMLCanvasElement;
  cWidth: number;
  cHeight: number;
  ctx: CanvasRenderingContext2D;
  constructor(vm: Vue, el: HTMLCanvasElement, cWidth: number, cHeight: number) {
    this.vm = vm;
    this.el = el;
    this.cWidth = cWidth;
    this.cHeight = cHeight;
    const ctxObj = this.el.getContext("2d");
    if (!ctxObj || !(ctxObj instanceof CanvasRenderingContext2D)) {
      throw new Error("获取canvas的上下文对象失败");
    }
    this.ctx = ctxObj;
  }
  drawLine(
    eX: number,
    eY: number,
    isShiftDown: Boolean,
    isCtrlDown: Boolean
  ): void {
    if (
      this.vm.$store.state._CANVAS_STATES.length >=
      this.vm.$store.state.CANVAS_BACK_COUNT
    ) {
      this.vm.$store.state._CANVAS_STATES.shift();
    }
    this.vm.$store.state._CANVAS_STATES.push(
      this.ctx.getImageData(0, 0, this.cWidth, this.cHeight)
    );
    let lineX: number = eX;
    let lineY: number = eY;
    if (isShiftDown) {
      if (isCtrlDown) {
        this.el.onmousemove = (e: MouseEvent) => {
          this.ctx.putImageData(
            this.vm.$store.state._CANVAS_STATES[
              this.vm.$store.state._CANVAS_STATES.length - 1
            ],
            0,
            0
          );
          let lineEndY = e.offsetY;

          this.ctx.beginPath();
          this.ctx.moveTo(eX, eY);
          this.ctx.lineTo(eX, lineEndY);

          this.ctx.lineCap = "round";
          this.ctx.lineWidth = this.vm.$store.state.outline_width;
          this.ctx.strokeStyle = this.vm.$store.state.outline_color;
          this.ctx.stroke();
          this.ctx.closePath();
          this.el.onmouseup = () => {
            this.el.onmousemove = null;
          };
        };
      } else {
        this.el.onmousemove = (e: MouseEvent) => {
          this.ctx.putImageData(
            this.vm.$store.state._CANVAS_STATES[
              this.vm.$store.state._CANVAS_STATES.length - 1
            ],
            0,
            0
          );
          let lineEndX = e.offsetX;
          this.ctx.beginPath();
          this.ctx.moveTo(eX, eY);
          this.ctx.lineTo(lineEndX, eY);
          this.ctx.lineCap = "round";
          this.ctx.lineWidth = this.vm.$store.state.cvsOutline;
          this.ctx.strokeStyle = this.vm.$store.state.cvsOutColor;
          this.ctx.stroke();
          this.ctx.closePath();
          this.el.onmouseup = () => {
            this.el.onmousemove = null;
          };
        };
      }
    } else {
      this.el.onmousemove = (e: MouseEvent) => {
        this.ctx.putImageData(
          this.vm.$store.state._CANVAS_STATES[
            this.vm.$store.state._CANVAS_STATES.length - 1
          ],
          0,
          0
        );
        let eX2 = e.offsetX,
          eY2 = e.offsetY;
        this.ctx.beginPath();
        this.ctx.lineCap = "round";
        this.ctx.moveTo(lineX, lineY);
        this.ctx.lineTo(eX2, eY2);
        this.ctx.lineWidth = this.vm.$store.state.outline_width;
        this.ctx.strokeStyle = this.vm.$store.state.outline_color;
        this.ctx.stroke();
        this.ctx.closePath();
        this.el.onmouseup = () => {
          this.el.onmousemove = null;
        };
      };
    }
  }
  drawCircle(eX: number, eY: number): void {
    if (
      this.vm.$store.state._CANVAS_STATES.length >=
      this.vm.$store.state.CANVAS_BACK_COUNT
    ) {
      this.vm.$store.state._CANVAS_STATES.shift();
    }
    this.vm.$store.state._CANVAS_STATES.push(
      this.ctx.getImageData(0, 0, this.cWidth, this.cHeight)
    );
    let startX: number = eX;
    let startY: number = eY;
    this.el.onmousemove = (e: MouseEvent) => {
      this.ctx.putImageData(
        this.vm.$store.state._CANVAS_STATES[
          this.vm.$store.state._CANVAS_STATES.length - 1
        ],
        0,
        0
      );
      let endX: number = e.offsetX,
        endY: number = e.offsetY;
      let radius = Math.sqrt(
        Math.abs(
          Math.pow(Math.abs(endX - eX), 2) - Math.pow(Math.abs(endY - eY), 2)
        )
      );
      this.ctx.beginPath();
      this.ctx.arc(startX, startY, radius, 0, Math.PI * 2);
      this.ctx.lineWidth = this.vm.$store.state.outline_width;
      this.ctx.strokeStyle = this.vm.$store.state.outline_color;
      if (this.vm.$store.state.fill_signal) {
        this.ctx.fillStyle = this.vm.$store.state.fill_color;
        this.ctx.fill();
      }
      this.ctx.stroke();
      this.ctx.closePath();
      this.el.onmouseup = () => {
        this.el.onmousemove = null;
      };
    };
  }
  drawRect(eX: number, eY: number): void {
    if (
      this.vm.$store.state._CANVAS_STATES.length >=
      this.vm.$store.state.CANVAS_BACK_COUNT
    ) {
      this.vm.$store.state._CANVAS_STATES.shift();
    }
    this.vm.$store.state._CANVAS_STATES.push(
      this.ctx.getImageData(0, 0, this.cWidth, this.cHeight)
    );
    let startX: number = eX;
    let startY: number = eY;
    this.el.onmousemove = (e: MouseEvent) => {
      this.ctx.putImageData(
        this.vm.$store.state._CANVAS_STATES[
          this.vm.$store.state._CANVAS_STATES.length - 1
        ],
        0,
        0
      );
      let endX: number = e.offsetX,
        endY: number = e.offsetY;
      this.ctx.beginPath();
      this.ctx.rect(startX, startY, endX - eX, endY - eY);
      this.ctx.lineWidth = this.vm.$store.state.outline_width;
      this.ctx.strokeStyle = this.vm.$store.state.outline_color;
      if (this.vm.$store.state.fill_signal) {
        this.ctx.fillStyle = this.vm.$store.state.fill_color;
        this.ctx.fill();
      }
      this.ctx.stroke();
      this.ctx.closePath();
      this.el.onmouseup = () => {
        this.el.onmousemove = null;
      };
    };
  }
  drawArc(eX: number, eY: number): void {
    if (
      this.vm.$store.state._CANVAS_STATES.length >=
      this.vm.$store.state.CANVAS_BACK_COUNT
    ) {
      this.vm.$store.state._CANVAS_STATES.shift();
    }
    this.vm.$store.state._CANVAS_STATES.push(
      this.ctx.getImageData(0, 0, this.cWidth, this.cHeight)
    );
    let startX: number = eX;
    let startY: number = eY;
    this.el.onmousemove = (e: MouseEvent) => {
      let moveBezierX = e.offsetX,
        moveBezierY = e.offsetY;
      this.ctx.putImageData(
        this.vm.$store.state._CANVAS_STATES[
          this.vm.$store.state._CANVAS_STATES.length - 1
        ],
        0,
        0
      );
      this.ctx.beginPath();
      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(moveBezierX, moveBezierY);
      this.ctx.lineWidth = this.vm.$store.state.outline_width;
      this.ctx.strokeStyle = this.vm.$store.state.outline_color;
      this.ctx.stroke();
      this.ctx.closePath();
      this.el.onmousedown = (e: MouseEvent) => {
        let ctrlX: number = e.offsetX,
          ctrlY: number = e.offsetY;
        this.ctx.beginPath();
        this.ctx.moveTo(eX, eY);
        this.ctx.lineTo(ctrlX, ctrlY);
        this.ctx.strokeStyle = this.vm.$store.state.outline_color;
        this.ctx.stroke();
        this.ctx.closePath();
        this.el.onmousemove = (e: MouseEvent) => {
          this.ctx.putImageData(
            this.vm.$store.state._CANVAS_STATES[
              this.vm.$store.state._CANVAS_STATES.length - 1
            ],
            0,
            0
          );
          let endX: number = e.offsetX,
            endY: number = e.offsetY;
          this.ctx.beginPath();
          this.ctx.moveTo(eX, eY);
          this.ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
          this.ctx.lineWidth = this.vm.$store.state.outline_width;
          this.ctx.strokeStyle = this.vm.$store.state.outline_color;
          this.ctx.stroke();
          this.ctx.closePath();
          this.el.onmousedown = () => {
            this.el.onmousemove = null;
          };
        };
      };
    };
  }
  drawPolygon(eX: number, eY: number): void {
    if (
      this.vm.$store.state._CANVAS_STATES.length >=
      this.vm.$store.state.CANVAS_BACK_COUNT
    ) {
      this.vm.$store.state._CANVAS_STATES.shift();
    }
    this.vm.$store.state._CANVAS_STATES.push(
      this.ctx.getImageData(0, 0, this.cWidth, this.cHeight)
    );
    let startX: number = eX;
    let startY: number = eY;
    let pol_edgeNumber = this.vm.$store.state.edge_number;
    let pol_angle = (Math.PI * 2) / pol_edgeNumber;
    this.el.onmousemove = (e: MouseEvent) => {
      this.ctx.save();
      this.ctx.putImageData(
        this.vm.$store.state._CANVAS_STATES[
          this.vm.$store.state._CANVAS_STATES.length - 1
        ],
        0,
        0
      );
      let endX: number = e.offsetX;
      let endY: number = e.offsetY;
      let pol_radius = Math.sqrt(
        Math.abs(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2))
      );
      this.ctx.translate(startX, startY);
      this.ctx.moveTo(0, -pol_radius);
      this.ctx.beginPath();
      for (let i = 0; i <= pol_edgeNumber; i++) {
        this.ctx.rotate(pol_angle);
        this.ctx.lineTo(0, -pol_radius);
      }
      this.ctx.strokeStyle = this.vm.$store.state.outline_color;
      this.ctx.lineWidth = this.vm.$store.state.outline_width;
      if (this.vm.$store.state.fill_signal) {
        this.ctx.fillStyle = this.vm.$store.state.fill_color;
        this.ctx.fill();
      }
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.restore();
      this.el.onmouseup = () => {
        this.el.onmousemove = null;
      };
    };
  }
  drawBrush(eX: number, eY: number): void {
    if (
      this.vm.$store.state._CANVAS_STATES.length >=
      this.vm.$store.state.CANVAS_BACK_COUNT
    ) {
      this.vm.$store.state._CANVAS_STATES.shift();
    }
    this.vm.$store.state._CANVAS_STATES.push(
      this.ctx.getImageData(0, 0, this.cWidth, this.cHeight)
    );
    let startX: number = eX;
    let startY: number = eY;
    this.el.onmousemove = (e: MouseEvent) => {
      let endX: number = e.offsetX;
      let endY: number = e.offsetY;
      this.ctx.beginPath();
      this.ctx.lineCap = "round";
      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(endX, endY);
      this.ctx.lineWidth = this.vm.$store.state.outline_width;
      this.ctx.strokeStyle = this.vm.$store.state.outline_color;
      this.ctx.stroke();
      this.ctx.closePath();
      startX = endX;
      startY = endY;
      this.el.onmouseup = () => {
        this.el.onmousemove = null;
      };
    };
  }
  drawEraser(eX: number, eY: number): void {
    if (
      this.vm.$store.state._CANVAS_STATES.length >=
      this.vm.$store.state.CANVAS_BACK_COUNT
    ) {
      this.vm.$store.state._CANVAS_STATES.shift();
    }
    this.vm.$store.state._CANVAS_STATES.push(
      this.ctx.getImageData(0, 0, this.cWidth, this.cHeight)
    );
    let startX: number = eX;
    let startY: number = eY;
    this.el.onmousemove = (e: MouseEvent) => {
      let endX: number = e.offsetX;
      let endY: number = e.offsetY;
      this.ctx.beginPath();
      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(endX, endY);
      this.ctx.lineWidth = this.vm.$store.state.outline_width;
      this.ctx.strokeStyle = "#FFFFFF";
      this.ctx.stroke();
      this.ctx.lineCap = "round";
      this.ctx.closePath();
      startX = endX;
      startY = endY;
      this.el.onmouseup = () => {
        this.el.onmousemove = null;
      };
    };
  }
  drawText(eX: number, e: MouseEvent): void {
    let ipt = document.createElement("input");
    ipt.style.cssText = `
      width:${this.el.width - eX}px;
      position:absolute;
      left:${eX + this.el.offsetLeft}px;
      top:${e.pageY}px;
      font-size:${this.vm.$store.state.font_size}px;
      color:${this.vm.$store.state.outline_color};
      text-align:justify;
      outline:none;
      border:none;
      z-index:9999;
      background:transparent;`;
    if (this.el.parentElement == null) {
      throw new Error("canvas的父元素不存在");
    }
    this.el.parentElement.appendChild(ipt);
  }
  revert() {
    document.onkeydown = (e: KeyboardEvent) => {
      if (e.ctrlKey === true) {
        document.onkeydown = (e: KeyboardEvent) => {
          if (e.keyCode === 90) {
            if (this.vm.$store.state._CANVAS_STATES.length > 0) {
              this.ctx.putImageData(
                this.vm.$store.state._CANVAS_STATES[
                  this.vm.$store.state._CANVAS_STATES.length - 1
                ],
                0,
                0
              );
              this.vm.$store.state._CANVAS_STATES.pop();
            }
          }
        };
      }
    };
  }
}
export default Draw;
