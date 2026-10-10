import L from 'leaflet';

export interface HeatPoint {
  lat: number;
  lng: number;
  intensity: number; // 0.0 to 1.0
}

export interface HeatmapOptions {
  radius?: number;
  blur?: number;
  minOpacity?: number;
  gradient?: Record<number, string>;
}

// Tactical RoadGuard AI Color Ramp: Mint Green -> Cyan -> Amber -> Orange -> Crimson
const DEFAULT_GRADIENT: Record<number, string> = {
  0.15: '#00F59B', // Mint Aurora (Low Exposure)
  0.35: '#00E5FF', // Electric Cyan
  0.55: '#FFB800', // Amber Gold (Moderate Hazard)
  0.75: '#FF5E00', // Flame Orange
  1.00: '#FF2E5B'  // Coral Crimson (Critical Blackspot)
};

function createBrush(radius: number, blur: number): HTMLCanvasElement {
  const brushCanvas = document.createElement('canvas');
  const r = radius + blur;
  brushCanvas.width = r * 2;
  brushCanvas.height = r * 2;
  const ctx = brushCanvas.getContext('2d');
  if (!ctx) return brushCanvas;

  const gradient = ctx.createRadialGradient(r, r, Math.max(0, radius - blur), r, r, r);
  gradient.addColorStop(0, 'rgba(0,0,0,1)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, r * 2, r * 2);
  return brushCanvas;
}

function createPalette(gradientMap: Record<number, string>): Uint8ClampedArray {
  const paletteCanvas = document.createElement('canvas');
  paletteCanvas.width = 256;
  paletteCanvas.height = 1;
  const ctx = paletteCanvas.getContext('2d');
  if (!ctx) return new Uint8ClampedArray(256 * 4);

  const grad = ctx.createLinearGradient(0, 0, 256, 1);
  for (const stop in gradientMap) {
    grad.addColorStop(parseFloat(stop), gradientMap[stop]);
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 1);

  return ctx.getImageData(0, 0, 256, 1).data;
}

/**
 * LeafletHeatmapLayer
 * High-performance, zero-dependency HTML5 2D Canvas Heatmap Layer for Leaflet.
 * Accurately renders Kernel Density Estimation (KDE) thermal hotspots for road accidents and hazard points.
 */
export class LeafletHeatmapLayer extends L.Layer {
  protected _canvas: HTMLCanvasElement | null = null;
  protected _ctx: CanvasRenderingContext2D | null = null;
  private _points: HeatPoint[] = [];
  private _brush: HTMLCanvasElement;
  private _palette: Uint8ClampedArray;
  private _radius: number;
  private _blur: number;
  private _minOpacity: number;

  constructor(points: HeatPoint[] = [], options: HeatmapOptions = {}) {
    super();
    this._points = points;
    this._radius = options.radius ?? 28;
    this._blur = options.blur ?? 18;
    this._minOpacity = options.minOpacity ?? 0.06;
    this._brush = createBrush(this._radius, this._blur);
    this._palette = createPalette(options.gradient ?? DEFAULT_GRADIENT);
  }

  setPoints(points: HeatPoint[]): this {
    this._points = points;
    this.redraw();
    return this;
  }

  getPoints(): HeatPoint[] {
    return this._points;
  }

  onAdd(map: L.Map): this {
    this._map = map;
    if (!this._canvas) {
      this._canvas = L.DomUtil.create('canvas', 'leaflet-heatmap-layer') as HTMLCanvasElement;
      this._canvas.style.position = 'absolute';
      this._canvas.style.pointerEvents = 'none';
      this._canvas.style.zIndex = '350';
      this._ctx = this._canvas.getContext('2d', { willReadFrequently: true });
    }

    const pane = map.getPanes().overlayPane;
    pane.appendChild(this._canvas);

    map.on('moveend resize zoomend', this._reset, this);
    this._reset();
    return this;
  }

  onRemove(map: L.Map): this {
    if (this._canvas && this._canvas.parentNode) {
      this._canvas.parentNode.removeChild(this._canvas);
    }
    map.off('moveend resize zoomend', this._reset, this);
    this._map = null;
    return this;
  }

  private _reset(): void {
    if (!this._map || !this._canvas) return;
    const topLeft = this._map.containerPointToLayerPoint([0, 0]);
    L.DomUtil.setPosition(this._canvas, topLeft);

    const size = this._map.getSize();
    if (this._canvas.width !== size.x || this._canvas.height !== size.y) {
      this._canvas.width = size.x;
      this._canvas.height = size.y;
    }
    this.redraw();
  }

  redraw(): void {
    if (!this._map || !this._canvas || !this._ctx) return;
    const width = this._canvas.width;
    const height = this._canvas.height;
    if (width === 0 || height === 0) return;

    this._ctx.clearRect(0, 0, width, height);
    const r = this._radius + this._blur;

    // Pass 1: Accumulate alpha intensity
    for (let i = 0; i < this._points.length; i++) {
      const pt = this._points[i];
      const p = this._map.latLngToContainerPoint([pt.lat, pt.lng]);
      if (p.x < -r || p.x > width + r || p.y < -r || p.y > height + r) continue;

      const alpha = Math.min(1, Math.max(this._minOpacity, pt.intensity));
      this._ctx.globalAlpha = alpha;
      this._ctx.drawImage(this._brush, p.x - r, p.y - r);
    }

    // Pass 2: Colorize via gradient lookup
    try {
      const imgData = this._ctx.getImageData(0, 0, width, height);
      const pixels = imgData.data;
      const len = pixels.length;
      for (let i = 0; i < len; i += 4) {
        const a = pixels[i + 3];
        if (a > 0) {
          const offset = a * 4;
          pixels[i] = this._palette[offset];
          pixels[i + 1] = this._palette[offset + 1];
          pixels[i + 2] = this._palette[offset + 2];
          pixels[i + 3] = Math.min(235, Math.round(a * 0.94));
        }
      }
      this._ctx.putImageData(imgData, 0, 0);
    } catch (_) {
      // Ignore if context restricted
    }
  }
}
