import { Closure } from "./enums/closure";
import { Colours } from "./enums/colours";
import { Locales } from "./enums/locales";
import { Lume } from "./enums/lume";
import { Materials } from "./enums/materials";
import { Movements } from "./enums/movements";

export interface Watch {
    manufacturer: string;
    model: string;
    style: string;
    homage: string;
    sizeWidth: number;
    sizeLength?: number;
    thickness?: number;
    lugWitdh: number;
    movement: Movement;
    dial: [Colours];
    lume?: Lume;
    bezel?: Bezel;
    strap: Strap;
    warranty?: Warranty;
    link: Link;
}

export interface Movement {
    winding: Movements;
    manufacturer: Movements;
    bph: Movements;
}

export interface Strap {
    material: Materials;
    buckle?: Materials
    clasp?: {
        material: Materials;
        closure: Closure
    }
}

export interface Luminous {
    product: Lume
    colour: Lume;
}

export interface Bezel {a
    insertMaterial: string;
    clicks?: string;
    luminous?: Lume;
    colour: [Colours];
}

export interface Warranty {
    duration: number;
    distributors: Locales
}

export interface Link {
    displayName: string;
    url: string;
    affiliate?: string;
}