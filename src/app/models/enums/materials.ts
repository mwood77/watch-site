import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Materials {

  public static STEEL_316L: String = "Stainless Steel 316L";
  public static STEEL_316L_WITH_GOLD: String = "Stainless Steel 316L and DLC Gold";
  public static CERAMIC: String = "Ceramic";
  public static ALUMINIUM: String = "Aluminium";
  public static BRONZE_CUSN8: String = "Bronze";
  public static DLC: String = "DLC";
  public static TITANIUM: String = "Titanium";

}