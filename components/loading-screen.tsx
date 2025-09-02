

export function LoadingScreen({ text = "Checking authentication..." }: { text?: string }) {
  return (
    <main className="min-h-screen bg-[#00040D] text-white flex items-center justify-center font-sans">
      <section className="loading-container">
        <div className="square"></div>
        <div className="infinite-scroll"></div>
        <div className="mt-6 text-lg font-semibold text-[#fead53]">{text}</div>
      </section>
      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .square {
          --widthSquare: 24px;
          width: var(--widthSquare);
          aspect-ratio: 1/1;
          background: #fead53;
          border: 3px solid #fead53;
          border-radius: 0.3rem;
          margin-bottom: 0.2rem;
          transform-origin: 100% 100%;
          animation: roll 2000ms cubic-bezier(0.5,0,0.5,1) infinite;
        }
        @keyframes roll {
          0% { transform: none; }
          25% { transform: translate(calc(var(--widthSquare) * -1)); }
          50% { transform: rotate(90deg) translateY(var(--widthSquare)); }
          75% { transform: rotate(180deg) translateY(var(--widthSquare)); }
          100% { transform: rotate(180deg) translate(var(--widthSquare), var(--widthSquare)); }
        }
        .infinite-scroll {
          --widthSquare: 24px;
          position: relative;
          width: calc(var(--widthSquare) * 3);
          height: 2px;
          overflow: hidden;
        }
        .infinite-scroll::before,
        .infinite-scroll::after {
          content: "";
          position: absolute;
          width: var(--widthSquare);
          height: 100%;
          background: #fead53;
        }
        .infinite-scroll::before {
          left: calc(50% - var(--widthSquare) / 2);
          animation: moveBefore 2000ms cubic-bezier(0.5,0,0.5,1) infinite;
        }
        .infinite-scroll::after {
          left: 100%;
          animation: moveAfter 2000ms cubic-bezier(0.5,0,0.5,1) infinite;
        }
        @keyframes moveBefore {
          0%   { left: calc(50% - var(--widthSquare) / 2);}
          25%  { left: 0;}
          50%  { left: 0;}
          75%  { left: 0;}
          100% { left: -30px;}
        }
        @keyframes moveAfter {
          0%   { left: 100%;}
          25%  { left: 100%;}
          50%  { left: calc(100% - var(--widthSquare));}
          75%  { left: calc(100% - var(--widthSquare));}
          100% { left: calc(50% - var(--widthSquare) / 2);}
        }
      `}</style>
    </main>
  )
}
