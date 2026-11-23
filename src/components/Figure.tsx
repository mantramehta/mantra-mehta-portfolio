import { useRef } from "react";
import type { Shot } from "../data/projects";
import { Icon } from "./ui";

/** Screenshot/figure that opens full size in an accessible native <dialog>. */
export function Figure({
  shot,
  className = "",
  imgClassName = "",
  priority = false,
  light = false,
}: {
  shot: Shot;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Use a white mat for figures with white backgrounds (e.g. matplotlib plots). */
  light?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <figure className={className}>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-ink-700 ${
          light ? "bg-white" : "bg-ink-900"
        } transition-colors hover:border-ink-600`}
        aria-label={`View larger: ${shot.alt}`}
      >
        <img
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={`h-auto w-full transition-transform duration-500 group-hover:scale-[1.015] ${imgClassName}`}
        />
        <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-ink-950/75 text-fg opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Icon.Expand width={15} height={15} />
        </span>
      </button>
      <figcaption className="mt-2.5 text-[13px] leading-snug text-fg-subtle">{shot.caption}</figcaption>

      <dialog
        ref={dialogRef}
        aria-label={shot.caption}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
        className="m-auto max-h-[92vh] max-w-[94vw] overflow-visible bg-transparent p-0 text-fg"
      >
        <div className="relative">
          <img
            src={shot.src}
            alt={shot.alt}
            className={`max-h-[86vh] w-auto max-w-[94vw] rounded-lg ${light ? "bg-white" : ""}`}
          />
          <p className="mt-3 text-center text-sm text-fg-muted">{shot.caption}</p>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="absolute -top-3 -right-3 grid size-9 place-items-center rounded-full border border-ink-600 bg-ink-850 text-fg hover:bg-ink-700"
            aria-label="Close"
            autoFocus
          >
            <Icon.Close width={16} height={16} />
          </button>
        </div>
      </dialog>
    </figure>
  );
}
