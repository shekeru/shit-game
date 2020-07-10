import * as Item from '../items/Item'
import * as Inv from '../items/Inventory'
import {C_Entity} from '../items/Combat'
import {Player, ImgRefs} from '../world'
import {Print} from '../globals'

// The 1 everything monster
export class Chicken extends C_Entity {
  constructor() {
    super("Chicken", "chicken.png");
  }
  // Right Click Options
  Context(){
    return {
      ["Attack " + this.name]:
        () => Player.StartCombat(this),
      ["Examine " + this.name]:
        this.Examine
    }
  }
  Examine(){
    Print("A cute looking hen");
  }
  EntityDeath(){
    Inv.AddItem(Item.Feather, 5)
    Inv.AddItem(Item.LeatherLegs, 1)
    super.EntityDeath()
  }

}
