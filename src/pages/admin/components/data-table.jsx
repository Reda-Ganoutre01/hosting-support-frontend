import * as React from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
  IconLoader,
  IconPlus,
  IconTrendingUp
} from "@tabler/icons-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { z } from "zod";

import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ChartContainer } from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string()
});

function DragHandle({ id }) {
  const { attributes, listeners } = useSortable({ id });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent cursor-grab">
      <IconGripVertical className="text-muted-foreground h-3 w-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

function DraggableRow({ item, isSelected, onToggleSelect, visibleColumns }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: item.id
  });

  return (
    <TableRow
      data-state={isSelected && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition
      }}>
      <TableCell className="w-8">
        <DragHandle id={item.id} />
      </TableCell>
      <TableCell className="w-8">
        <div className="flex items-center justify-center">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onToggleSelect}
            aria-label="Select row"
          />
        </div>
      </TableCell>

      {visibleColumns.header && (
        <TableCell>
          <TableCellViewer item={item} />
        </TableCell>
      )}

      {visibleColumns.type && (
        <TableCell>
          <div className="w-32">
            <Badge variant="outline" className="text-muted-foreground px-1.5 font-normal">
              {item.type}
            </Badge>
          </div>
        </TableCell>
      )}

      {visibleColumns.status && (
        <TableCell>
          <Badge variant="outline" className="text-muted-foreground px-1.5 flex items-center gap-1 w-fit font-normal">
            {item.status === "Done" ? (
              <IconCircleCheckFilled className="fill-green-500 text-green-500 h-3.5 w-3.5" />
            ) : (
              <IconLoader className="h-3.5 w-3.5 animate-spin" />
            )}
            {item.status}
          </Badge>
        </TableCell>
      )}

      {visibleColumns.target && (
        <TableCell>
          <form onSubmit={(e) => e.preventDefault()}>
            <Label htmlFor={`${item.id}-target`} className="sr-only">
              Target
            </Label>
            <Input
              className="h-8 w-16 text-right border-transparent bg-transparent hover:bg-accent focus:border-input shadow-none"
              defaultValue={item.target}
              id={`${item.id}-target`}
            />
          </form>
        </TableCell>
      )}

      {visibleColumns.limit && (
        <TableCell>
          <form onSubmit={(e) => e.preventDefault()}>
            <Label htmlFor={`${item.id}-limit`} className="sr-only">
              Limit
            </Label>
            <Input
              className="h-8 w-16 text-right border-transparent bg-transparent hover:bg-accent focus:border-input shadow-none"
              defaultValue={item.limit}
              id={`${item.id}-limit`}
            />
          </form>
        </TableCell>
      )}

      {visibleColumns.reviewer && (
        <TableCell>
          {item.reviewer !== "Assign reviewer" ? (
            <span className="text-sm font-medium">{item.reviewer}</span>
          ) : (
            <>
              <Label htmlFor={`${item.id}-reviewer`} className="sr-only">
                Reviewer
              </Label>
              <Select>
                <SelectTrigger
                  className="w-36 text-xs"
                  size="sm"
                  id={`${item.id}-reviewer`}>
                  <SelectValue placeholder="Assign reviewer" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                  <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
        </TableCell>
      )}

      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-muted-foreground h-8 w-8 p-0"
              size="icon">
              <IconDotsVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export function DataTable({ data: initialData }) {
  const [data, setData] = React.useState(() => initialData || []);
  const [selectedIds, setSelectedIds] = React.useState({});
  const [pageSize, setPageSize] = React.useState(10);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [visibleColumns, setVisibleColumns] = React.useState({
    header: true,
    type: true,
    status: true,
    target: true,
    limit: true,
    reviewer: true
  });

  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const dataIds = React.useMemo(() => data?.map(({ id }) => id) || [], [data]);

  const totalPages = Math.ceil(data.length / pageSize) || 1;
  const paginatedData = React.useMemo(() => {
    const start = pageIndex * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, pageIndex, pageSize]);

  const allPageSelected = paginatedData.length > 0 && paginatedData.every((item) => selectedIds[item.id]);

  function toggleSelectAll() {
    const nextState = { ...selectedIds };
    if (allPageSelected) {
      paginatedData.forEach((item) => {
        delete nextState[item.id];
      });
    } else {
      paginatedData.forEach((item) => {
        nextState[item.id] = true;
      });
    }
    setSelectedIds(nextState);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((prevData) => {
        const oldIndex = prevData.findIndex((item) => item.id === active.id);
        const newIndex = prevData.findIndex((item) => item.id === over.id);
        return arrayMove(prevData, oldIndex, newIndex);
      });
    }
  }

  const selectedCount = Object.keys(selectedIds).length;

  return (
    <Tabs defaultValue="outline" className="w-full flex flex-col justify-start gap-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="outline">
          <SelectTrigger className="flex w-fit md:hidden" size="sm" id="view-selector">
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="outline">Outline</SelectItem>
            <SelectItem value="past-performance">Past Performance</SelectItem>
            <SelectItem value="key-personnel">Key Personnel</SelectItem>
            <SelectItem value="focus-documents">Focus Documents</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="hidden md:flex items-center gap-1">
          <TabsTrigger value="outline">All Instances</TabsTrigger>
          <TabsTrigger value="past-performance" className="flex items-center gap-1.5">
            Active Servers <Badge variant="secondary" className="px-1.5 py-0 text-xs">8</Badge>
          </TabsTrigger>
          <TabsTrigger value="key-personnel" className="flex items-center gap-1.5">
            Maintenance <Badge variant="secondary" className="px-1.5 py-0 text-xs">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="focus-documents">Pending Billing</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                <IconLayoutColumns className="h-4 w-4" />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <IconChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {Object.keys(visibleColumns).map((colKey) => (
                <DropdownMenuCheckboxItem
                  key={colKey}
                  className="capitalize"
                  checked={visibleColumns[colKey]}
                  onCheckedChange={(val) =>
                    setVisibleColumns((prev) => ({ ...prev, [colKey]: val }))
                  }>
                  {colKey}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" className="flex items-center gap-1.5">
            <IconPlus className="h-4 w-4" />
            <span className="hidden lg:inline">Deploy Server</span>
          </Button>
        </div>
      </div>
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border bg-card">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}>
            <Table>
              <TableHeader className="bg-muted/50 sticky top-0 z-10">
                <TableRow>
                  <TableHead className="w-8" />
                  <TableHead className="w-8">
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={allPageSelected}
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all"
                      />
                    </div>
                  </TableHead>
                  {visibleColumns.header && <TableHead>Domain / Hostname</TableHead>}
                  {visibleColumns.type && <TableHead>Plan Type</TableHead>}
                  {visibleColumns.status && <TableHead>Status</TableHead>}
                  {visibleColumns.target && <TableHead className="text-right">CPU Load</TableHead>}
                  {visibleColumns.limit && <TableHead className="text-right">Storage Limit</TableHead>}
                  {visibleColumns.reviewer && <TableHead>Assigned Tech</TableHead>}
                  <TableHead className="w-8" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length ? (
                  <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                    {paginatedData.map((item) => (
                      <DraggableRow
                        key={item.id}
                        item={item}
                        isSelected={!!selectedIds[item.id]}
                        onToggleSelect={(checked) =>
                          setSelectedIds((prev) => ({ ...prev, [item.id]: checked }))
                        }
                        visibleColumns={visibleColumns}
                      />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {selectedCount} of {data.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${pageSize}`}
                onValueChange={(value) => {
                  setPageSize(Number(value));
                  setPageIndex(0);
                }}>
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((size) => (
                    <SelectItem key={size} value={`${size}`}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {pageIndex + 1} of {totalPages}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex items-center justify-center"
                onClick={() => setPageIndex(0)}
                disabled={pageIndex === 0}>
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0 flex items-center justify-center"
                onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
                disabled={pageIndex === 0}>
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0 flex items-center justify-center"
                onClick={() => setPageIndex((p) => Math.min(totalPages - 1, p + 1))}
                disabled={pageIndex >= totalPages - 1}>
                <span className="sr-only">Go to next page</span>
                <IconChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex items-center justify-center"
                onClick={() => setPageIndex(totalPages - 1)}
                disabled={pageIndex >= totalPages - 1}>
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="past-performance" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed p-8 flex items-center justify-center text-muted-foreground">
          Past Performance Content Area
        </div>
      </TabsContent>
      <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed p-8 flex items-center justify-center text-muted-foreground">
          Key Personnel Content Area
        </div>
      </TabsContent>
      <TabsContent value="focus-documents" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed p-8 flex items-center justify-center text-muted-foreground">
          Focus Documents Content Area
        </div>
      </TabsContent>
    </Tabs>
  );
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 }
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#3b82f6"
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa"
  }
};

function TableCellViewer({ item }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <button className="text-foreground font-medium hover:underline text-left">
          {item.header}
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.header}</DrawerTitle>
          <DrawerDescription>Detailed bandwidth and server metrics</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 10
                  }}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="#60a5fa"
                    fillOpacity={0.6}
                    stroke="#60a5fa"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="#3b82f6"
                    fillOpacity={0.4}
                    stroke="#3b82f6"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex items-center gap-2 leading-none font-medium text-emerald-400">
                  Uptime 99.98% optimal <IconTrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground text-xs">
                  Real-time resource utilization and storage allocation for this hosting instance.
                </div>
              </div>
              <Separator />
            </>
          )}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="header">Domain / Hostname</Label>
              <Input id="header" defaultValue={item.header} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="type">Plan Type</Label>
                <Select defaultValue={item.type}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cPanel Enterprise">cPanel Enterprise</SelectItem>
                    <SelectItem value="cPanel Pro">cPanel Pro</SelectItem>
                    <SelectItem value="VPS Cloud 8GB">VPS Cloud 8GB</SelectItem>
                    <SelectItem value="VPS Cloud 16GB">VPS Cloud 16GB</SelectItem>
                    <SelectItem value="Dedicated Node">Dedicated Node</SelectItem>
                    <SelectItem value="Storage Node">Storage Node</SelectItem>
                    <SelectItem value="DNS Cluster">DNS Cluster</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="target">CPU Load</Label>
                <Input id="target" defaultValue={item.target} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="limit">Storage Limit</Label>
                <Input id="limit" defaultValue={item.limit} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="reviewer">Assigned Tech</Label>
              <Select defaultValue={item.reviewer}>
                <SelectTrigger id="reviewer" className="w-full">
                  <SelectValue placeholder="Select a tech" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                  <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
                  <SelectItem value="Assign reviewer">Unassigned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
