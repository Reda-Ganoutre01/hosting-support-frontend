import * as React from "react";
import { cn } from "@/lib/utils";

export const ChartContainer = React.forwardRef(({ config, className, children, ...props }, ref) => {
  const chartStyle = React.useMemo(() => {
    if (!config) return {};
    const style = {};
    Object.entries(config).forEach(([key, value]) => {
      if (value.color) {
        style[`--color-${key}`] = value.color;
      }
    });
    return style;
  }, [config]);

  return (
    <div ref={ref} className={cn("w-full", className)} style={chartStyle} {...props}>
      {children}
    </div>
  );
});
ChartContainer.displayName = "ChartContainer";

export function ChartTooltip({ cursor, content, defaultIndex }) {
  return null; // Recharts manages tooltip directly via content prop inside AreaChart
}

export function ChartTooltipContent({ active, payload, label, labelFormatter, indicator = "dot" }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-lg border bg-popover p-2 shadow-md text-xs text-popover-foreground">
      {label && (
        <div className="font-medium mb-1">
          {labelFormatter ? labelFormatter(label) : label}
        </div>
      )}
      <div className="flex flex-col gap-1">
        {payload.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {indicator === "dot" && (
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color || item.fill }}
              />
            )}
            <span className="text-muted-foreground capitalize">{item.name || item.dataKey}:</span>
            <span className="font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
