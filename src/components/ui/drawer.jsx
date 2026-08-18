import * as React from "react";
import { cn } from "@/lib/utils";

export function Drawer({ direction = "bottom", children }) {
  const [open, setOpen] = React.useState(false);
  return (
    <DrawerContext.Provider value={{ open, setOpen, direction }}>
      <div className="relative inline-block">
        {children}
      </div>
    </DrawerContext.Provider>
  );
}

const DrawerContext = React.createContext({
  open: false,
  setOpen: () => {},
  direction: "bottom",
});

export function useDrawer() {
  return React.useContext(DrawerContext);
}

export function DrawerTrigger({ children, asChild }) {
  const { open, setOpen } = useDrawer();
  const Component = asChild ? "div" : "button";
  return (
    <Component onClick={() => setOpen(true)} className="cursor-pointer">
      {children}
    </Component>
  );
}

export function DrawerContent({ children, className }) {
  const { open, setOpen, direction } = useDrawer();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="flex-1" onClick={() => setOpen(false)} />
      <div
        className={cn(
          "fixed bg-background p-6 shadow-2xl transition-transform border overflow-y-auto",
          direction === "bottom"
            ? "inset-x-0 bottom-0 max-h-[85vh] rounded-t-xl border-t"
            : "inset-y-0 right-0 w-full max-w-md border-l",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function DrawerHeader({ className, ...props }) {
  return <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />;
}

export function DrawerFooter({ className, ...props }) {
  return <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />;
}

export function DrawerTitle({ className, ...props }) {
  return <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />;
}

export function DrawerDescription({ className, ...props }) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function DrawerClose({ children, asChild }) {
  const { setOpen } = useDrawer();
  const Component = asChild ? "div" : "button";
  return (
    <Component onClick={() => setOpen(false)}>
      {children}
    </Component>
  );
}
