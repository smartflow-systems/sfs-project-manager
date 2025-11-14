import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export interface TimeLog {
  id: string;
  date: string;
  task: string;
  duration: string;
  notes?: string;
}

interface TimeLogTableProps {
  logs: TimeLog[];
  onDelete?: (id: string) => void;
}

export function TimeLogTable({ logs, onDelete }: TimeLogTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                No time entries yet
              </TableCell>
            </TableRow>
          ) : (
            logs.map((log) => (
              <TableRow key={log.id} data-testid={`time-log-${log.id}`}>
                <TableCell className="font-mono text-sm">{log.date}</TableCell>
                <TableCell>{log.task}</TableCell>
                <TableCell className="font-mono">{log.duration}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{log.notes || "-"}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete?.(log.id)}
                    data-testid={`button-delete-${log.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
