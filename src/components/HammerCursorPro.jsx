import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import hammerImg from '../assets/cursor/hammer.png';

const CLICKABLE_SELECTOR =
  'a, button, input, textarea, select, .btn, .service-card, .gallery-item, .slider-arrow, .top-slider-dots button';

const rand = (min, max) => Math.random() * (max - min) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const SHARD_SHAPES = [
  'polygon(50% 0%, 100% 30%, 86% 100%, 10% 84%, 0% 28%)',
  'polygon(22% 0%, 100% 16%, 78% 100%, 0% 72%)',
  'polygon(0% 20%, 68% 0%, 100% 58%, 32% 100%)',
  'polygon(50% 0%, 100% 46%, 72% 100%, 0% 70%, 12% 14%)',
  'polygon(0% 38%, 34% 0%, 100% 14%, 84% 100%, 14% 82%)',
];

function pointsToPath(points) {
  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');
}

function makePath(angleDeg, length, segments, jitter, start = { x: 0, y: 0 }) {
  const angle = (angleDeg * Math.PI) / 180;
  const points = [start];

  for (let i = 1; i <= segments; i += 1) {
    const t = i / segments;
    const dist = length * t;
    const wobble = rand(-jitter, jitter) * t;
    const px = Math.cos(angle + Math.PI / 2) * wobble;
    const py = Math.sin(angle + Math.PI / 2) * wobble;

    points.push({
      x: start.x + Math.cos(angle) * dist + px,
      y: start.y + Math.sin(angle) * dist + py,
    });
  }

  return points;
}

function createImpact3D(x, y) {
  const id = `${Date.now()}-${Math.random()}`;
  const crackCount = 8 + Math.floor(Math.random() * 3);
  const cracks = [];

  for (let i = 0; i < crackCount; i += 1) {
    const baseAngle = (360 / crackCount) * i + rand(-10, 10);
    const mainPoints = makePath(baseAngle, rand(58, 130), 5, 8);

    cracks.push({
      id: `${id}-main-${i}`,
      d: pointsToPath(mainPoints),
      width: rand(1.1, 2.2),
      delay: i * 12,
      branch: false,
    });

    const branchCount = 1 + Math.floor(Math.random() * 2);

    for (let j = 0; j < branchCount; j += 1) {
      const anchorIndex = 2 + Math.floor(Math.random() * Math.max(1, mainPoints.length - 3));
      const anchor = mainPoints[Math.min(anchorIndex, mainPoints.length - 1)];
      const dir = Math.random() > 0.5 ? 1 : -1;
      const branchAngle = baseAngle + dir * rand(18, 42);
      const branchPoints = makePath(branchAngle, rand(18, 40), 3, 5, anchor);

      cracks.push({
        id: `${id}-branch-${i}-${j}`,
        d: pointsToPath(branchPoints),
        width: rand(0.9, 1.4),
        delay: i * 12 + rand(40, 90),
        branch: true,
      });
    }
  }

  const shards = Array.from({ length: 16 }, (_, i) => {
    const angle = rand(0, Math.PI * 2);
    const startRadius = rand(4, 13);
    const travel = rand(46, 126);

    return {
      id: `${id}-shard-${i}`,
      sx: Math.cos(angle) * startRadius,
      sy: Math.sin(angle) * startRadius,
      dx: Math.cos(angle) * travel,
      dy: Math.sin(angle) * rand(34, 98),
      dz: rand(30, 180),
      rx: rand(-90, 90),
      ry: rand(-90, 90),
      rot: rand(-260, 260),
      size: rand(8, 20),
      delay: rand(0, 55),
      clip: pick(SHARD_SHAPES),
    };
  });

  return { id, x, y, cracks, shards };
}

export default function HammerCursorPro() {
  const cursorRef = useRef(null);
  const shakeTimerRef = useRef(null);
  const hideTimerRef = useRef(null);

  const [enabled, setEnabled] = useState(true);
  const [clicking, setClicking] = useState(false);
  const [hoveringClickable, setHoveringClickable] = useState(false);
  const [visible, setVisible] = useState(false);
  const [impacts, setImpacts] = useState([]);

  useEffect(() => {
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateEnabled = () => {
      setEnabled(!mqReduce.matches);
    };

    updateEnabled();
    mqReduce.addEventListener?.('change', updateEnabled);

    return () => {
      mqReduce.removeEventListener?.('change', updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    let raf;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let x = mx;
    let y = my;
    let prevX = mx;
    let angle = 16;

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      setVisible(true);

      const target = e.target instanceof Element ? e.target : null;
      setHoveringClickable(Boolean(target?.closest(CLICKABLE_SELECTOR)));
    };

    const animate = () => {
      x += (mx - x) * 0.22;
      y += (my - y) * 0.22;

      const dx = x - prevX;
      const targetAngle = 16 + Math.max(-12, Math.min(12, dx * 0.45));
      angle += (targetAngle - angle) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        cursorRef.current.style.setProperty('--rot', `${angle}deg`);
      }

      prevX = x;
      raf = requestAnimationFrame(animate);
    };

    const pointerDown = (e) => {
      const cx = e.clientX;
      const cy = e.clientY;

      mx = cx;
      my = cy;
      x = cx;
      y = cy;
      prevX = cx;

      setVisible(true);

      const target = e.target instanceof Element ? e.target : null;
      setHoveringClickable(Boolean(target?.closest(CLICKABLE_SELECTOR)));

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      }

      setClicking(true);

      const impact = createImpact3D(cx, cy);
      setImpacts((prev) => [...prev.slice(-1), impact]);

      document.documentElement.classList.remove('impact-shake');
      void document.documentElement.offsetWidth;
      document.documentElement.classList.add('impact-shake');

      window.clearTimeout(shakeTimerRef.current);
      shakeTimerRef.current = window.setTimeout(() => {
        document.documentElement.classList.remove('impact-shake');
      }, 180);

      window.setTimeout(() => setClicking(false), 130);

      // Hide slightly after touch release on mobile
      window.clearTimeout(hideTimerRef.current);
      if (e.pointerType === 'touch') {
        hideTimerRef.current = window.setTimeout(() => {
          setVisible(false);
        }, 250);
      }

      window.setTimeout(() => {
        setImpacts((prev) => prev.filter((item) => item.id !== impact.id));
      }, 1100);
    };

    const pointerUp = (e) => {
      setClicking(false);

      if (e.pointerType === 'touch') {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = window.setTimeout(() => {
          setVisible(false);
        }, 250);
      }
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerdown', pointerDown, true);
    document.addEventListener('pointerup', pointerUp, true);
    document.addEventListener('pointercancel', pointerUp, true);

    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerdown', pointerDown, true);
      document.removeEventListener('pointerup', pointerUp, true);
      document.removeEventListener('pointercancel', pointerUp, true);
      cancelAnimationFrame(raf);
      window.clearTimeout(shakeTimerRef.current);
      window.clearTimeout(hideTimerRef.current);
      document.documentElement.classList.remove('impact-shake');
    };
  }, [enabled]);

  if (!enabled || typeof document === 'undefined') return null;

  return createPortal(
    <>
      <div
        ref={cursorRef}
        className={`hammer-cursor ${visible ? 'is-visible' : ''} ${
          clicking ? 'is-clicking' : ''
        } ${hoveringClickable ? 'is-hovering' : ''}`}
      >
        <img src={hammerImg} alt="" className="hammer-img" draggable={false} />
      </div>

      {impacts.map((impact) => (
        <div
          key={impact.id}
          className="tile-impact-stage"
          style={{ left: impact.x, top: impact.y }}
          aria-hidden="true"
        >
          <span className="tile-impact-shadow" />
          <span className="tile-impact-flash" />
          <span className="tile-impact-dust" />
          <span className="tile-impact-crater" />

          <svg className="tile-cracks-svg" viewBox="-180 -180 360 360">
            {impact.cracks.map((crack) => (
              <g key={crack.id}>
                <path
                  d={crack.d}
                  pathLength="1"
                  className={`crack-path crack-shadow ${crack.branch ? 'branch' : ''}`}
                  style={{
                    '--delay': `${crack.delay}ms`,
                    '--stroke': `${crack.width + 1.2}px`,
                  }}
                />
                <path
                  d={crack.d}
                  pathLength="1"
                  className={`crack-path crack-main ${crack.branch ? 'branch' : ''}`}
                  style={{
                    '--delay': `${crack.delay}ms`,
                    '--stroke': `${crack.width}px`,
                  }}
                />
                <path
                  d={crack.d}
                  pathLength="1"
                  className={`crack-path crack-highlight ${crack.branch ? 'branch' : ''}`}
                  style={{
                    '--delay': `${crack.delay}ms`,
                    '--stroke': `${Math.max(0.7, crack.width - 0.35)}px`,
                  }}
                />
              </g>
            ))}
          </svg>

          {impact.shards.map((shard) => (
            <span
              key={shard.id}
              className="tile-shard"
              style={{
                '--sx': `${shard.sx}px`,
                '--sy': `${shard.sy}px`,
                '--dx': `${shard.dx}px`,
                '--dy': `${shard.dy}px`,
                '--dz': `${shard.dz}px`,
                '--rx': `${shard.rx}deg`,
                '--ry': `${shard.ry}deg`,
                '--r': `${shard.rot}deg`,
                '--size': `${shard.size}px`,
                '--delay': `${shard.delay}ms`,
                '--clip': shard.clip,
              }}
            />
          ))}
        </div>
      ))}
    </>,
    document.body
  );
}