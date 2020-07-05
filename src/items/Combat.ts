import {Print} from '../defs/event'
import {Nothing, Equip, Stat} from '../items/Gear'
import * as Map from '../world'
export * from '../items/Stats'
export * from '../items/Gear'
// Types
export type Stats = {
  [k: number]: number
}
export type Equipment = {
  Name: string,
  Slot: Equip,
  Stats: Stats
}
type Gear = {
  [idx in Equip]: Equipment
}
// Classes
export class C_Base {
  respawnTime: number
  name: string; img: any
  solid: boolean; alpha: number
  constructor(name: string, image: string) {
    this.name = name; this.solid = true
    this.img = Map.ImgRefs[image]
    this.respawnTime = 60
    this.alpha = 1
  }
  EntityDeath() {
    this.alpha = 0.15
    this.solid = false
    setTimeout(() => {
      this.solid = true
      this.alpha = 1
    }, this.respawnTime * 1000)
  }
}
export class C_Entity extends C_Base {
  Gear: Gear; Stats: Stats; HP: number
  // Init Shitfest
  constructor(name: string, image: string) {
    super(name, image)
    // Empty Gear
    this.Gear = <Gear> {}
    for(var Key in Equip)
      this.Gear[Key] = Nothing
    // Empty Stats
    this.Stats = <Stats> {}
    for(var Key in Stat)
      this.Stats[Key] = 1
  }
  // Add Entity Stats
  SetStats(NewStats: Stats) {
    for(var Key in NewStats) {
        this.Stats[Key] = NewStats[Key]
    }
  }
  // Add Gear Stats
  AddGear(Item: Equipment) {
    this.Gear[Item.Slot] = Item
    for(let Key in Item.Stats) {
      this.Stats[Key] += Item.Stats[Key]
    }
  }
  // Roll Attack or Misc
  RollStat(WhichStat: Stat){
    return Math.floor(Math.random()
      * this.Stats[WhichStat] * 75)
  }
  // Sequence Combat
  SeqCombat(Other: C_Entity) {
    let dmg = Math.round(100 * this.Stats[Stat.STR]
      * AccuracyCoeff(this.Stats[Stat.DEX]))
    //dmg -= Other.RollStat(Stat.DEF)
    //dmg = Math.max(0, dmg)
    Print(this.name, "deals", dmg, "damage.")
    Other.HP -= dmg;
  }
  RefreshHP() {
    this.HP = 250 + 175
      * this.Stats[Stat.VIT]
  }
}
// Math Functions
function AccuracyCoeff(dex) {
  let Rand = 2 * Math.random()
  return Math.pow(Math.E, -Math.pow
      (Rand - 2, 2) / 2)
    / Math.sqrt(2*Math.PI)
    * (2 +dex/ 20);
}
