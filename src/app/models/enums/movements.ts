import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Movements {

    public static AUTOMATIC : String = "Automatic winding";
    public static HAND : String = "Hand winding";

    public static SEAGUL_1901 : String = "Seagul 1901";
    public static SEAGUL_1903 : String = "Seagul 1903";
    public static SEIKO_NH35A : String = "Seiko NH35A";
    public static SEIKO_NH38A : String = "Seiko NH38A";
    public static SEIKO_YN55A : String = "Seiko Epson YN55A";
        
    public static BPH_18000 : String = "18 000";
    public static BPH_21600 : String = "21 600";
    public static BPH_28800 : String = "28 800";
    public static BPH_36000 : String = "36 000";
    public static BPH_108000 : String = "108 000";
    public static BPH_360000 : String = "360 000";

}