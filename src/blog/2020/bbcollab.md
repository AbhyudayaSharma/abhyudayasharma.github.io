We're having our classes on BlackBoard Collaborate Ultra. However, it has a
somewhat incomplete dark theme. White PDFs and PowerPoint presentations do not
look good when my other monitor is completely dark. So here is a stopgap
solution for making my life under the COVID-19 lock-down better.

## A dark theme for live sessions

When the session loads, press F12 and paste the following in the console to get a nice dark theme:

```js
document.styleSheets[0].insertRule('.side-panels,#appshare-video,.canvas_container_outer,.bb-emoji,.notifications{filter:invert(1)}');$('body').css('background-color','#101010');
 ```

This inverts the presentation screen, whiteboard, chat box, chat notifications
and other things to get a “pseudo-dark-theme”.

## An Enhanced recording viewer

Allows setting playback speed, inverting video for a dark theme and playing the video fullscreen.

Paste the following into the console **after** the video loads.

```js
(()=>{$("body").css("background-color","#101010"),document.styleSheets[0].insertRule(".side-panel,.bb-emoji{filter:invert(1)}");const e=document.createElement("button");e.innerText="Set playback rate";const t=e=>{e.style.backgroundColor="#000",e.style.color="#0f0",e.style.padding="10px 10px",e.style.margin="10px 10px",e.style.border="thin solid #0f0"};t(e),e.onclick=(()=>{const e=window.prompt("Please enter the playback speed:\nExamples: 0.5, 1.25, 1.5, 2.0","1.0");if(null==e)return;const t=Number.parseFloat(e);isNaN(t)?alert("Invalid playback speed"):t<=.25||t>=5?alert("Outside valid range"):document.querySelector("video").playbackRate=t});const n=document.createElement("button");n.innerText="Toggle Dark Theme",t(n),$("video").css("fiter","none"),n.onclick=(()=>{"none"===$("video").css("filter")?$("video").css("filter","invert(1)"):$("video").css("filter","none")});const o=document.createElement("button");t(o),o.innerText="Fullscreen",o.onclick=(()=>{const e=document.querySelector("video");e.requestFullscreen(),e.controls=!0}),$("body").prepend(e).prepend(n).prepend(o)})();
```

This is what it looks like:

![Screenshot](https://i.imgur.com/TBwpkr7.png)
