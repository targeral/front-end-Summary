# webRTC
## 概述
WebRTC是"网络实时通信"(Web Real Time Communication)的缩写。他最初视为了解决浏览器上视频通话而提出的，即两个浏览器之间
进行视频和音频的通信，*不经过服务器*。后来发展到除了音频和视频，还可以传输文字和其他数据。

Google是WebRTC的主要支持者和开发者，它最初在Gmail上推出了视频聊天，后来在2011年推出了Hangouts，语序在浏览器中打电话。它推动了WebRTC标准的确立。

WebRTC主要让浏览器具备了三个功能:

* 获取音频和视频
* 进行音频和视频通信
* 进行任意数据的通信

*WebRTC共分为三个API,分别对应上面三个功能*。

* MediaStream(又称为getUserMedia)
* RTCPeerConnection
* RTCDataChannel

## getUserMedia方法
``getUserMedia``方法在``navigator``对象上。通过调用``navigator.getUserMedia``方法，用于 **在浏览器中获取音频(通过麦克风)和视频(通过摄像头)**

下面代码用于检查浏览器是否支持``getUserMedia``方法。

```js
navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia;

if(navigator.getUserMedia) {
    //支持
}else {
    //不支持
}
```

*Chrome 21, Opera 18和Firefox 17，支持该方法。目前，IE还不支持，上面代码中的msGetUserMedia，只是为了确保将来的兼容。*

``getUserMedia``方法接受三个参数,分别为一个对象，两个回调函数(成功和失败)

```js
navigator.getUserMedia({
    video : true,
    audio : true
}, onSuccess, onError);
```

### getUserMedia的第一个参数
getUserMedia的第一个参数是一个对象，表示*要获取哪些多媒体设备，上面的代码表示获取摄像头和麦克风*。

### getUserMedia的第二个参数
getUserMedia的第二个参数onSuccess是一个回调函数，*在获取多媒体设备成功时调用*。

### getUserMedia的第三个参数
getUserMedia的第三个参数onError也是一个回调函数，*在取多媒体设备失败时调用*。

### 例子
下面是一个例子:

```js
var constraints  = {video : true};

function onSuccess(stream) {
    var video = document.querySelector("video");
    video.src = window.URL.createObjectURL(stream);
}

function onError(error) {
    console.log("navigator.getUserMedia error: ", error);
}

navigator.getUserMedia(constraints, onSuccess, onError);
```

分析上面的代码：

1. 如果网页调用了``getUserMedia``方法，浏览器就会询问用户，是否同意浏览器调用麦克风或摄像头。
2. 如果用户同意了，就会调用onSuccess回调函数;如果用户拒绝了，就会调用onError回调函数。
3. onSuccess回调函数的参数是一个*数据流对象stream*.
4. *stream对象*有两个方法，分别为``stream.getAudioTracks``和``stream.getVideoTracks``,分别返回一个数组,其成员是数据流
包含的音轨和视轨。使用的声音源和摄影头的数量，决定音轨和视轨的数量。*比如，如果只使用一个摄像头获取视频，且不获取音频，那么视轨的数量为1，音轨的数量为0*。
5. 每个音轨和视轨，有一个kind属性，表示种类（video或者audio），和一个label属性（比如FaceTime HD Camera (Built-in)）。
6. ``URL.createObjectURL``方法是将媒体数据流转换为一个二进制对象的URL(Blob URL),该URL可以作为video元素的src属性的值。
7. 在Chrome和Opera中使用``URL.createObjectURL``方法。在Firefox中，媒体数据流可以直接作为src属性的值。
8. onError回调函数接受一个Error对象作为参数。Error对象的code属性有如下取值，说明错误的类型。
    * PERMISSION_DENIED：用户拒绝提供信息。
    * NOT_SUPPORTED_ERROR：浏览器不支持硬件设备。
    * MANDATORY_UNSATISFIED_ERROR：无法发现指定的硬件设备。

### 应用
1. 获取摄像头的主要用途之一，是让用户使用摄影头为自己拍照。配合canvas去使用。
2. 通过浏览器捕获声音，需要借助Web Audio API。

```js
window.AudioContext = window.AudioContext || 
                      window.webkitAudioContext;

var context = new AudioContext();

function onSuccess(stream) {
    var audioInput = context.createMediaStreamSource(stream);
    audioInput.connect(context.destination);
}

navigator.getUserMedia({audio : true}, onSuccess);
```

### 捕获的限定条件
getUserMedia方法的第一个参数，除了指定捕获对象之外，还可以指定一些限制条件，比如限定只能录制高清（或者VGA标准）的视频。

```js
var hdConstraints = {
  video: {
    mandatory: {
      minWidth: 1280,
      minHeight: 720
    }
  }
};

navigator.getUserMedia(hdConstraints, onSuccess, onError);

var vgaConstraints = {
  video: {
    mandatory: {
      maxWidth: 640,
      maxHeight: 360
    }
  }
};

navigator.getUserMedia(vgaConstraints, onSuccess, onError);
```

### MediaStreamTrack.getSources
如果本机有多个摄像头/麦克风，这时就需要使用MediaStreamTrack.getSources方法指定，到底使用哪一个摄像头/麦克风。

```js
MediaStreamTrack.getSources(function(sourceInfos) {
  var audioSource = null;
  var videoSource = null;

  for (var i = 0; i != sourceInfos.length; ++i) {
    var sourceInfo = sourceInfos[i];
    if (sourceInfo.kind === 'audio') {
      console.log(sourceInfo.id, sourceInfo.label || 'microphone');

      audioSource = sourceInfo.id;
    } else if (sourceInfo.kind === 'video') {
      console.log(sourceInfo.id, sourceInfo.label || 'camera');

      videoSource = sourceInfo.id;
    } else {
      console.log('Some other kind of source: ', sourceInfo);
    }
  }

  sourceSelected(audioSource, videoSource);
});

function sourceSelected(audioSource, videoSource) {
  var constraints = {
    audio: {
      optional: [{sourceId: audioSource}]
    },
    video: {
      optional: [{sourceId: videoSource}]
    }
  };

  navigator.getUserMedia(constraints, onSuccess, onError);
}

```

上面代码表示，MediaStreamTrack.getSources方法的回调函数，可以得到一个本机的摄像头和麦克风的列表，然后指定使用最后一个摄像头和麦克风。