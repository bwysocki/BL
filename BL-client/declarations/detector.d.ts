declare module Detector {
    export class FLARParam {
        constructor(w: number, h: number);
    }
    export class NyARRgbRaster_Canvas2D {
        constructor(canvasElement: HTMLCanvasElement);
    }
    export class FLARMultiIdMarkerDetector {
        constructor(param: FLARParam, markerId: number);
        setContinueMode: (flag: boolean) => void;
        detectMarkerLite: (raster: NyARRgbRaster_Canvas2D, treshhold: number) => number;
        getSquare: (id: number) => NyARSquare;
    }
    export class NyARSquare {
        getCenter2d: (square: any) => void;
        sqvertex: any[];
    }
}

import FLARParam = Detector.FLARParam;
import FLARMultiIdMarkerDetector = Detector.FLARMultiIdMarkerDetector;
import NyARRgbRaster_Canvas2D = Detector.NyARRgbRaster_Canvas2D;
import NyARSquare = Detector.NyARSquare;