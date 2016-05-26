# Response Design常用的媒体查询
## 显示器媒体查询是以屏幕大小为基础划分的

```css
/*640px*/
@media screen and (max-width:640px) {

}
/*800px*/
@media screen and (max-width : 800px) {

}
/*1024px*/
@media screen and (max-width : 1024px) {

}
```

## 智能手机媒体查询
### 适合于大部分主流智能手机
#### iPhone(2G-4s)

```css
/*Landscape Mode(横向模式)*/
@media screen and (max-device-width : 480px) {

}
/* Portrait Mode(纵向模式)*/
@media screen and (max-device-width : 320px) {

}
```

#### iPhone4

```css
@media only screen and (-webkit-min-device-pixel-ratio:1.5),
only screen and (min-device-pixel-ratio:1.5) {

}
```

#### iPhone5

```css
@media only screen
and (min-device-width : 320px)
and (max-device-width : 568px) {

}
```

#### iPhone6

```css
@media only screen and (min-device-width : 375px) and (max-device-width : 667px)
and (orientation : portrait) {
  /*iPhone 6 Portrait*/
}
@media only screen and (min-device-width: 375px) and (max-device-width: 667px)
 and (orientation : landscape) {
 /*iPhone 6 landscape*/
}
@media only screen and (min-device-width: 414px) and (max-device-width: 736px)
and (orientation : portrait) {
 /*iPhone 6+ Portrait*/
}
@media only screen and (min-device-width: 414px) and (max-device-width: 736px)
and (orientation : landscape) {
 /*iPhone 6+ landscape*/
}
@media only screen and (max-device-width: 640px),
 only screen and (max-device-width: 667px),
only screen and (max-width: 480px){
 /*iPhone 6 and iPhone 6+ portrait and landscape*/
}
@media only screen and (max-device-width: 640px),
only screen and (max-device-width: 667px),
only screen and (max-width: 480px) and (orientation : portrait){
 /*iPhone 6 and iPhone 6+ portrait*/
}
@media only screen and (max-device-width: 640px),
only screen and (max-device-width: 667px),
only screen and (max-width: 480px) and (orientation : landscape){
 /*iPhone 6 and iPhone 6+ landscape*/
}
```

#### HTC Evo，BlackBerry Torch，HTC Thunderbolt，HD2

```css
@media screen and (max-device-width: 480px)
{
}
```

### 平板媒体查询
#### iPad

```css
/* Landscape Mode */
@media (max-device-width : 1024px) and (orientation : landscape) {

}
/* Portrait Mode */
@media (max-device-width : 768px) and (orientation:portrait) {

}
```

#### iPad2

```css
/* Landscape Mode */
@media (max-device-width: 1024px) and (orientation: landscape)
{
}
/* Portrait Mode */
@media (max-device-width: 768px) and (orientation: portrait)
{
}
```

#### iPad3

```css
/* Landscape Mode */
@media (max-device-width: 1024px) and (orientation: landscape)
{
}
/* Portrait Mode */
@media (max-device-width: 768px) and (orientation: portrait)
{
}
```

#### iPad mini

```css
@media only screen
and (min-device-width : 768px)
and (max-device-width : 1024px)
and (-webkit-min-device-pixel-ratio: 1) {
 /* 样式写在这里 */
}
```

#### Samsung Galaxy Tab 10.1

```css
/* Landscape Mode */
@media (max-device-width: 1280px) and (orientation: landscape)
{
}
/* Portrait Mode */
@media (max-device-width: 800px) and (orientation: portrait)
{
}
```

#### Motorola Xoom

```css
/* Landscape Mode */
@media (max-device-width: 1280px) and (orientation: landscape)
{
}
/* Portrait Mode */
@media (max-device-width: 800px) and (orientation: portrait)
{
}
```

#### HTC Flyer

```css
/* Landscape Mode */
@media (max-device-width: 1024px) and (orientation: landscape)
{
}
/* Portrait Mode */
@media (max-device-width: 600px) and (orientation: portrait)
{
}
```

#### BlackBerry PlayBook

```css
/* Landscape Mode */
@media (max-device-width: 1024px) and (orientation: landscape)
{
}
/* Portrait Mode */
@media (max-device-width: 600px) and (orientation: portrait)
{
}
```

#### HP TouchPad

```css
/* Landscape Mode */
@media (max-device-width: 1024px) and (orientation: landscape)
{
}
/* Portrait Mode */
@media (max-device-width: 768px) and (orientation: portrait)
{
}
```

#### Lenovo Thinkpad Tablet

```css
/* Landscape Mode */
@media (max-device-width: 1280px) and (orientation: landscape)
{
}
/* Portrait Mode */
@media (max-device-width: 800px) and (orientation: portrait)
{
}
```

#### Sony Tablet S

```css
/* Landscape Mode */
@media (max-device-width: 1280px) and (orientation: landscape)
{
}
/* Portrait Mode */
@media (max-device-width: 800px) and (orientation: portrait)
{
}
```

#### T-Mobile G-Slate

```css
/* Landscape Mode */
@media (max-device-width: 1280px) and (orientation: landscape)
{
}
/* Portrait Mode */
@media (max-device-width: 768px) and (orientation: portrait)
{
}
```

#### ViewSonic ViewPad 10

```css
/* Landscape Mode */
@media (max-device-width: 1024px) and (orientation: landscape)
{
}
/* Portrait Mode */
@media (max-device-width: 600px) and (orientation: portrait)
{
}
```

#### Dell Streak 7

```css
/* Landscape Mode */
@media (max-device-width: 800px) and (orientation: landscape)
{
}
/* Portrait Mode */
@media (max-device-width: 480px) and (orientation: portrait)
{
}
```

#### ASUS Eee Pad Transformer

```css
/* Landscape Mode */
@media (max-device-width: 1080px) and (orientation: landscape)
{
}
/* Portrait Mode */
@media (max-device-width: 800px) and (orientation: portrait)
{
}
```

# 七个高度有效的媒体查询技巧
[http://www.w3cplus.com/css3/7-habits-of-highly-effective-media-queries.html](http://www.w3cplus.com/css3/7-habits-of-highly-effective-media-queries.html)

# 设计出色响应式网站的十个技巧
[http://www.ido321.com/1556.html](http://www.ido321.com/1556.html)

# CSS：7个你可能不认识的单位
[http://www.ido321.com/1301.html](http://www.ido321.com/1301.html)

# 关于控制viewport
[https://segmentfault.com/a/1190000002685485](https://segmentfault.com/a/1190000002685485)
