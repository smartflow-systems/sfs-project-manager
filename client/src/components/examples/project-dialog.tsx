import { ProjectDialog } from '../project-dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ProjectDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Create Project</Button>
      <ProjectDialog
        open={open}
        onOpenChange={setOpen}
        onSave={(project) => console.log('Project created:', project)}
      />
    </div>
  );
}
