import { Closure } from "./enums/closure";
import { Colours } from "./enums/colours";
import { Locales } from "./enums/locales";
import { Lume } from "./enums/lume";
import { Materials } from "./enums/materials";
import { Movements } from "./enums/movements";

export class Watch {
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
    review: string;
    price: string;
}

export class Movement {
    winding: Movements;
    manufacturer: Movements;
    bph: Movements;
}

export class Strap {
    material: Materials;
    buckle?: Materials
    clasp?: {
        material: Materials;
        closure: Closure
    }
}

export class Luminous {
    product: Lume
    colour: Lume;
}

export class Bezel {
    insertMaterial: string;
    clicks?: string;
    luminous?: Lume;
    colour: [Colours];
}

export class Warranty {
    duration: number;
    distributors: Locales
}

export class Link {
    displayName: string;
    url: string;
    affiliate?: string;
}