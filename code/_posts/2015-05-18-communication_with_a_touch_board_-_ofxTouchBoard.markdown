---
layout: post
title:  "Communication with a Touch Board - ofxTouchBoard"
date:   2015-05-15 13:00:00
categories: openframeworks
header-img: "ofxTouchBoard/header.png"
tags: [openFrameworks]
notes: 'Code available on GitHub: <a href="https://github.com/elaye/ofxTouchBoard" target="_blank">ofxTouchBoard <i class="fa fa-github"></i></a>'
lead: "ofxTouchBoard - Addon for communicating with a Touch Board"
---

ofxTouchBoard is an openFrameworks addon for receiving data from the [Bare Conductive][bare-conductive]{:target="_blank"}'s Touch Board.
You need to upload the [DataStream][data-stream]{:target="_blank"} program on your Touch Board for the addon to work.

The addon usage is pretty simple. You first setup the port to which your Touch Board is connected (or don't and the addon will ask you at runtime, showing you a list of the devices available).
Then you call an <code>update</code> method at each frame and that's all. The addon gives you access to a vector containing the data sent by the Touch Board for each electrode.


The addon has the following features:
<ul>
	<li>You can register to touch and release events</li>
	<li>You can use either the Touch Board touch and release thresholds or use the addon thresholds (useful if you want to control the thresholds live)</li>
	<li>You can use multiple Touch Boards at the same time</li>
	<li>Works on Raspberry Pi (v1 and v2)</li>
</ul>	

[bare-conductive]: http://www.bareconductive.com/
[data-stream]: https://github.com/BareConductive/mpr121/tree/public/MPR121/Examples/DataStream