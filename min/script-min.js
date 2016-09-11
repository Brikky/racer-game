window.onload=function(){function e(e){return(elem=document.getElementById(e)).parentNode.removeChild(elem)}function t(){Y.fillStyle=A.color,Y.fillRect(A.xStart,A.yStart,A.width,A.height)}function n(e){Y.fillStyle=e.color,Y.fillRect(e.x,e.y,e.width,e.height)}function o(e){for(var t=0;t<e.length;t++)n(e[t])}function d(e){for(var t=0;t<e.length;t++)Y.drawImage(e[t].name,e[t].x,e[t].y,e[t].width,e[t].height)}function r(){W=!W,W?H.push(P):H[H.length-1]==P&&H.pop()}function i(){Y.drawImage(te,P.x,P.y,17,12)}function a(e){var t=e.x>=0||e.dx>0,n=e.x<=R.width-e.width||e.dx<0;return t&&n}function c(e){var t=e.y>=0||e.dy>0,n=e.y<=R.height-e.height||e.dy<0;return n&&t}function h(e,t){return!(e.x+e.width<t.x||t.x+t.width<e.x||e.y+e.height<t.y||t.y+t.height<e.y)}function l(){re=!re}function y(){re&&N.play();for(var e=0;e<q.length;e++)0==q[e].y&&(q[e].y=140),q[e].y-=1}function g(e,t){for(var n=0;n<t.length;n++)if(h(e,t[n]))return!0}function u(){U.textContent="You've been destroyed!",J.remove(),R.remove(),V.appendChild(he),V.appendChild(K),ce.play(),N=0}function s(){return h(F,B)||h(P,B)}function m(){J.textContent="",U.textContent="You destroyed the Death Star!",R.remove(),ie.play(),V.appendChild(G),V.appendChild(K),G.play(),N=0}function w(e){e=e||window.event,e.preventDefault&&e.preventDefault(),e.returnValue=!1}function f(e){return _[e.keyCode]?(w(e),!1):void 0}function x(){window.addEventListener&&window.addEventListener("DOMMouseScroll",w,!1),document.onkeydown=f}function v(){window.removeEventListener&&window.removeEventListener("DOMMouseScroll",w,!1),document.onkeydown=null}function p(){x(),window.scrollTo(0,document.body.scrollHeight)}function k(){t(),a(F)&&(F.x+=F.dx/60*oe),c(F)&&(F.y+=F.dy/60*oe),W&&(i(),a(P)&&(P.x+=P.dx/60*oe),c(P)&&(P.y+=P.dy/60*oe),h(F,P)&&u(),g(F,z)&&(U.textContent="Player one destroyed!",Q=!0,F.x=400,F.y=-100),g(P,z)&&(U.textContent="Player two destroyed!",Z=!0,P.x=2e3,P.y=-100),Q&&Z&&u()),y(),o(H),Y.drawImage(ee,F.x,F.y,17,12),Y.drawImage(ae,75,145,10,5),Y.drawImage(ae,150,145,10,5),Y.drawImage(ae,225,145,10,5),Y.drawImage(j,275,65,25,25),!W&&g(F,z)&&u(),s()&&m(),requestAnimationFrame(k)}var b={height:5,width:2,x:79,y:100,color:"#39ff14"},E={height:5,width:2,x:154,y:140,color:"#39ff14"},I={height:5,width:2,x:229,y:100,color:"#39ff14"},C={height:5,width:2,x:79,y:30,color:"#39ff14"},L={height:5,width:2,x:154,y:60,color:"#39ff14"},S={height:5,width:2,x:229,y:30,color:"#39ff14"},B={height:25,width:25,x:280,y:65,color:"rgba(0,0,0,0)"},A={xStart:0,yStart:0,height:150,width:300,color:"#000000"},D={height:5,width:10,x:75,y:145,color:"rgba(0,0,0,0)"},M={height:5,width:10,x:150,y:145,color:"rgba(0,0,0,0)"},O={height:5,width:10,x:225,y:145,color:"rgba(0,0,0,0)"},F={height:10,width:15,x:10,y:40,color:"rgba(0,0,0,0)",dx:0,dy:0},P={height:10,width:15,x:10,y:100,color:"rgba(0,0,0,0)",dx:0,dy:0},T=0,q=[b,E,I,C,L,S],N=new Audio("sounds/blaster-firing.mp3");N.loop=!1;var R=document.getElementById("spaceField"),V=document.getElementById("container"),Y=R.getContext("2d"),j=new Image;j.src="images/death-star.png";var G=document.createElement("VIDEO");G.src="video/death star explosion.mp4";var H=[F,B,D,M,O,b,E,I,C,L,S],U=document.getElementById("page-header"),z=[D,M,O,b,E,I,C,L,S],J=document.getElementById("instructions"),K=document.createElement("BUTTON");K.textContent="Play Again";var Q=!1,W=!1,X=document.getElementById("player-toggle"),Z=!1,_={37:1,38:1,39:1,40:1,65:1,87:1,68:1,83:1},ee=new Image;ee.src="images/ship.png";var te=new Image;te.src="images/ship2.png";var ne=[D,M,O],oe=100,de=document.getElementById("sound-toggle"),re=!0,ie=new Audio("sounds/theme.mp3"),ae=new Image;ae.src="images/tie-fighter.png",ie.loop=!1;var ce=new Audio("sounds/vaderbreathing.mp3");ce.loop=!0;var he=document.createElement("IMG");he.setAttribute("src","/images/vader.jpg"),R.addEventListener("click",p),K.addEventListener("click",window.location.reload.bind(window.location)),de.addEventListener("click",l),X.addEventListener("click",r),document.addEventListener("keydown",function(e){if(T!=e.keyCode)switch(T=e.keyCode,e.keyCode){case 37:F.dx+=-1;break;case 38:F.dy+=-1;break;case 39:F.dx+=1;break;case 40:F.dy+=1;break;case 65:P.dx+=-1;break;case 87:P.dy+=-1;break;case 68:P.dx+=1;break;case 83:P.dy+=1}}),document.addEventListener("keyup",function(e){switch(e.keyCode){case 37:case 39:F.dx=0;break;case 38:case 40:F.dy=0;break;case 65:case 68:P.dx=0;break;case 87:case 83:P.dy=0}T=0}),requestAnimationFrame(k)};