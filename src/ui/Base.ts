import { StaticsWindow } from './Statics'
import { GroundWindow } from './Ground'
import { InventoryWindow } from './Inventory'
import { GearWindow } from './Equipment'
import { StatsWindow } from './Stats'
import {html, elem} from '../globals'
// Create Interface
let Toolbars = {
  "equip": ["icons/Equip.png", GearWindow],
  "skill": ["icons/Skills.png", StatsWindow],
  "inv": ["icons/Inventory.png", () => {InventoryWindow()}], //lolwut
  "ents": ["icons/EntityOpts.png", StaticsWindow],
  "opts": ["icons/Options.png", GroundWindow],
}, t_icons = html("t_icons")
// Create Interface
for(let Key in Toolbars) {
  let img = <HTMLImageElement> elem('img')
  img.onclick = Toolbars[Key][1]
  img.src = Toolbars[Key][0]
  t_icons.appendChild(img)
  img.id = "s_" + Key
}
// Global Vars
export let ActiveBrush = {
  Type: 0, Elem: null, Id: 0,
}, lastWindow = undefined
// Create Article Item
export function CreateArticle(TitleName: string,
  Bottom: string, Type: string) : HTMLElement {
  if(lastWindow) lastWindow.remove()
  let article = lastWindow =
    elem('article', html('toolbar'))
  let title = elem('div', article),
    list = elem(Bottom, article)
  title.innerHTML = TitleName
  article.id = `a_${Type}`
  list.id = `bt_${Type}`
  ActiveBrush.Type = 0
  return list
}
