import {Canvas} from '../globals'
import {Player} from '../world'
// Exports
export let SIZE = 50,
  OFFSET_X = 0 * SIZE,
  OFFSET_Y = 0 * SIZE;
export var Keys = {},
  Clicks = [],
Cursor = {X: 0, Y: 0}
// Fixate Camera
export function UpdateCamera() {
    OFFSET_Y = Player.Y * SIZE
    - 50 * Math.floor(Y_MAX / 100);
    OFFSET_X = Player.X * SIZE
    - 50 * Math.floor(X_MAX / 100);
};
// AdvanceTick
var Tick = 1, tTimeLast = 0;
export function AdvanceTick(current) {
  if(current > 115 + tTimeLast) {
    tTimeLast = current; Tick++;
    Dispatch(); return true;
  };
}
// DispatchInput
function Dispatch(){
  // PlayerCtl
  if(Keys["KeyW"])
    Player.MoveSafely(0, -1)
  if(Keys["KeyA"])
    Player.MoveSafely(-1, 0)
  if(Keys["KeyS"])
    Player.MoveSafely(0, 1)
  if(Keys["KeyD"])
    Player.MoveSafely(1, 0)
  UpdateCamera()
}
// Check Action
export let Dialog = undefined
let P_Dialog = document
  .getElementById('dialog')
// Insertion of Options
var LastTop = null, LastLeft = null
export function PromptOptions(options, click?) {
  if(Dialog) return;
  Dialog = <HTMLElement>
    P_Dialog.cloneNode(true);
  Dialog.removeAttribute('hidden');
  if(click) {
    LastTop = click.clientY + "px"
    LastLeft = Math.min(X_MAX - 150, click.clientX) + "px"
  } let Last = Dialog.children[0]
  Dialog.style.marginTop = LastTop
  Dialog.style.marginLeft = LastLeft
  for(let Name in options) {
    var li = document.createElement('li')
    li.onclick = () => {
      Dialog.remove()
      Dialog = undefined
      options[Name]()
    }; li.innerHTML = Name
    Last.onclick = () => {
      Dialog.remove()
      Dialog = undefined
    }; Dialog.insertBefore(li, Last)
  }
  Dialog.prepend();
  document.getElementById('main')
    .appendChild(Dialog);
}
function GetAction() {
  if (!Dialog) return;
}
// Reset Size Function
export function ResetSize() {
  const fn = (wh: string) => Number(getComputedStyle
    (Canvas).getPropertyValue(wh).slice(0, -2))
  Canvas.setAttribute('height', `${Y_MAX = fn('height')}`)
  Canvas.setAttribute('width', `${X_MAX = fn('width')}`)
}; export let Y_MAX = 0, X_MAX = 0
document.body.onresize = ResetSize;
