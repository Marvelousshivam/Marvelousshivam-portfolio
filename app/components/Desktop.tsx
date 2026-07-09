import { APPS } from '../config/apps';

interface DesktopProps {
  toggleWindow: (id: string) => void
}

export default function Desktop({ toggleWindow }: DesktopProps) {
  const desktopApps = APPS.filter(app => app.showInDesktop);

  return (
    <div className="absolute right-4 sm:right-6 top-10 p-2 flex flex-col gap-6 sm:gap-8 z-0">
      {desktopApps.map((app) => {
        const Icon = app.icon;
        return (
          <button
            key={app.id}
            className="flex flex-col items-center group outline-none"
            onClick={() => toggleWindow(app.id)}
          >
            <div className="group-hover:scale-105 transition-transform duration-200">
              <Icon className="w-10 h-10 sm:w-14 sm:h-14 drop-shadow-md" />
            </div>
            <span className="mt-2 px-2 py-0.5 text-white text-[10px] sm:text-sm font-medium leading-tight text-center max-w-[70px] sm:max-w-[80px] break-words rounded bg-black/20 backdrop-blur-sm shadow-sm group-hover:bg-blue-500/80 transition-colors">
              {app.desktopLabel || app.title}
            </span>
          </button>
        );
      })}
    </div>
  )
}
