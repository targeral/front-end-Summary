# 移动开发基础
## 关于像素
首先要知道这几个与像素有关的术语:
1. **屏幕的物理像素数**，是指屏幕的宽度所包含像素的数量。
2. **屏幕的像素密度（PPI）**，像素/英寸来衡量。
3. 这个英制单位有时也被称为 **每英寸点数(DPI)**
4. 像素密度都是用来衡量每英寸范围内设备屏幕所拥有的像素数。
5. 大多数的高密度屏幕还有一个额外的虚拟像素单位:**密度无关像素(DIP)**,有时候也被称为CSS像素。
6. DIP这是一个相对单位；一个物理像素等于任意数量的DIP。(这使得我们可以按照比例增大(和缩小)网站，这样就能为较小的屏幕提供更好的可用性)
7. 虚拟像素和物理像素的比率被称为 **设备像素比DPR**。
8. 没有密度无关像素的设备它的DPR为1，即一个像素对应一个物理像素。

## 关于viewport
[http://www.w3cplus.com/css/A-pixel-is-not-a-pixel-is-not-a-pixel.html](http://www.w3cplus.com/css/A-pixel-is-not-a-pixel-is-not-a-pixel.html) [http://www.myexception.cn/mobile/428756.html](http://www.myexception.cn/mobile/428756.html)
